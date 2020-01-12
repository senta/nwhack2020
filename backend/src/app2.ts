import http from "http";
import express from "express";
import bodyParser from "body-parser";
import socketio from "socket.io";
import pino from "pino";

import { createId } from "./utils/string";

// ----------------------------------------------------
// Setup
const rest = express();
rest.use(bodyParser.json());
rest.use(express.static("public"));
rest.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const server = http.createServer(rest);
const io = socketio(server);

const logger = pino({ level: "debug" });

// ----------------------------------------------------
// Modeling
const players = new Map<string, Player>();
const games = new Map<string, Game>();
const playerGame = new Map<Player["id"], Game>();

interface Player {
  id: string;
  name: string;
  pingDelay: number[];
  progress: number;
  lastLine: number;
  state: {
    multiply: number;
    transfer: boolean;
    add: number;
    remove: number;
    ko: boolean;
  };
  readied: boolean;
}

function createPlayer(id: string, name = ""): Player {
  if (players.has(id)) {
    const player = players.get(id)!;
    player.name = name;
  }

  const player: Player = {
    id,
    name,
    pingDelay: [],
    progress: 0,
    lastLine: 0,
    state: {
      multiply: 1,
      transfer: false,
      add: 0,
      remove: 0,
      ko: false
    },
    readied: false
  };

  players.set(id, player);

  return player;
}

type AttackAction = "multiply" | "transfer" | "add" | "remove";

// ----------------------------------------------------
// REST API
// no validation, no authorization. *I have no time.*
rest.put("api/player/:id/profile", (req, res) => {
  const { socket_id, name } = req.body;
  const player = players.get(socket_id)!;
  player.name = name;

  res.json({
    status: 200,
    body: null
  });
});

rest.post("/api/room/", (req, res) => {
  const { socket_id, lines } = req.body;
  let player = players.get(socket_id);
  if (!player) {
    throw new Error(`player not exists`);
  }

  const game = Game.create(io.sockets, player, parseInt(lines, 10));

  res.json({
    status: 200,
    body: {
      room: game.id
    }
  });
});

rest.post("/api/room/:id/join", (req, res) => {
  const { socket_id } = req.body;
  const player = players.get(socket_id);
  if (!player) {
    throw new Error(`player not exists`);
  }

  const game = games.get(req.params.id);
  if (!game) {
    throw new Error(`game not exists`);
  }

  game.join(player);

  res.json({
    status: 200,
    body: null
  });
});

rest.post("/api/room/:id/leave", (req, res) => {
  const { socket_id } = req.body;
  let player = players.get(socket_id);
  if (!player) {
    throw new Error(`player not exists`);
  }

  let game = games.get(req.params.id);
  if (!game) {
    throw new Error(`game not exists`);
  }

  game.leave(player);

  res.json({
    status: 200,
    body: null
  });
});

// ----------------------------------------------------
// Socket.IO
io.on("connect", socket => {
  const player = createPlayer(socket.id, socket.id);

  socket.on("disconnect", () => {
    const game = playerGame.get(player.id);
    if (game) {
      game.leave(player);
    }

    players.delete(player.id);
  });

  socket.on("PLAYER_PING", ({ time }) => {
    logger.info(`player:${player.id}: ping`);

    const d = new Date()
    player.pingDelay.push(d.getTime() - time);
    if (player.pingDelay.length > 5) {
      player.pingDelay.splice(0, player.pingDelay.length - 5);
    }
  });

  socket.on("PLAYER_READY", () => {
    const game = playerGame.get(player.id);
    if (!game) {
      throw new Error("no game!!");
    }
    game.ready(player);
  });

  socket.on("PLAYER_START", () => {
    // notify if all players are readied
    const game = playerGame.get(player.id);
    if (!game) {
      throw new Error("no game!!");
    }
    if (game.owner !== player) {
      throw new Error("not allowed");
    }

    game.start();
  });

  socket.on("PLAYER_FINISH_LINE", data => {
    const game = playerGame.get(player.id);
    if (!game) {
      throw new Error("no game!!");
    }
    game.progress(player);
  });

  socket.on("PLAYER_ATTACK", data => {
    const game = playerGame.get(player.id);
    if (!game) {
      throw new Error("no game!!");
    }
    const { action } = data;
    game.makeAction(player, action);
  });
});

server.listen(8080, "0.0.0.0", () => {
  console.log(`Server is running on http://127.0.0.1:8080/`);
});

class Game {
  public id: string;
  public players: Player[] = [];
  public state: "waiting" | "playing" | "finished" = "waiting";
  public started: number = -1;

  public static create(
    sockets: socketio.Namespace,
    owner: Player,
    lines: number
  ): Game {
    const game = new Game(sockets, owner, lines);
    games.set(game.id, game);

    return game;
  }

  constructor(
    public sockets: socketio.Namespace,
    public owner: Player,
    public lines: number
  ) {
    this.id = createId();
    logger.info(`game:${this.id}: created by ${owner.id}`);
    this.join(owner);
    owner.readied = true;
  }

  public join(player: Player): void {
    player.readied = false;
    this.players.push(player);
    this.sockets.connected[player.id].join(this.id);

    this.sockets.to(this.id).emit("GAME_PLAYER_JOINED", {
      players: this.players
    });

    playerGame.set(player.id, this);

    logger.info(`game:${this.id}: ${player.id} joined`);
  }

  public leave(player: Player): void {
    player.readied = false;
    const index = this.players.findIndex(x => x === player);
    if (index === -1) {
      return;
    }
    this.players.splice(index, 1);
    if (this.sockets.connected[player.id]) {
      this.sockets.connected[player.id].leave(this.id);
    }

    this.sockets.to(this.id).emit("GAME_PLAYER_LEFT", {
      players: this.players
    });

    playerGame.delete(player.id);

    logger.info(`game:${this.id}: ${player.id} left`);
  }

  public ready(player: Player): void {
    player.readied = true;
    logger.info(`game:${this.id}: ${player.id} is ready to play`);

    if (!this.players.every(x => x.readied)) {
      return;
    }

    logger.info(`game:${this.id}: game is ready!`);
    this.sockets.to(this.id).emit("GAME_READY");
  }

  public start(): void {
    for (const x of this.players) {
      console.log(x.id, x.readied);
    }
    if (!this.players.every(x => x.readied)) {
      logger.info(`game:${this.id}: someone tried to start`);
      return;
    }

    logger.info(`game:${this.id}: will be started`);

    const d = new Date()
    const start = d.getTime() + 3000;
    this.started = start;

    const multipliers = new Array(10).fill(null).map((_, i) => i);
    multipliers.sort(() => Math.random() - 0.5);

    for (const player of this.players) {
      const conn = io.sockets.connected[player.id];
      const delay =
        player.pingDelay.reduce((a, b) => a + b) / player.pingDelay.length;

      logger.info(`game:${this.id}: notify game start to ${player.id}`);
      conn.emit("GAME_START", {
        time: start + delay,
        multipliers: [...multipliers],
        players: this.players
      });
    }

    this.startTimer();
  }

  public progress(player: Player) {
    player.progress += 1;
    logger.info(`game:${this.id}: ${player.id} made progress`);
    this.handleStateChanged();
  }

  public makeAction(player: Player, action: AttackAction) {
    let target: Player;
    let conn: socketio.Socket;

    logger.info(`game:${this.id}: ${player.id} made an action ${action}`);

    switch (action) {
      case "add":
        target = this.pickAttackTarget(player);
        target.state.add += 0.5;

        logger.info(`game:${this.id}: ${player.id} targeted ${target.id}`);
        conn = io.sockets.connected[target.id];
        conn.emit("PLAYER_ATTACKED", {
          action,
          from: player.id
        });
        break;

      case "multiply":
        target = this.pickAttackTarget(player);
        target.state.multiply = Math.floor(Math.random() * 8) + 1;

        logger.info(`game:${this.id}: ${player.id} targeted ${target.id}`);
        conn = io.sockets.connected[target.id];
        conn.emit("PLAYER_ATTACKED", {
          action,
          from: player.id
        });
        break;

      case "remove":
        player.state.remove += 1;
        break;

      case "transfer":
        player.state.transfer = true;
        break;
    }

    this.handleStateChanged();
  }

  public pickAttackTarget(attacker: Player) {
    const candidates: Player[] = this.players.filter(x => x !== attacker);

    const index = Math.floor(Math.random() * candidates.length);
    let target = candidates[index];

    if (target.state.transfer === true) {
      target.state.transfer = false;
      target = this.pickAttackTarget(target);
    }

    return target;
  }

  private timeOver(player: Player): void {
    player.state.ko = true;

    logger.info(`game:${this.id}: time over. ${player.id} is out`);

    const conn = io.sockets.connected[player.id];
    conn.emit("PLAYER_TIMEOVER");
    this.handleStateChanged();
  }

  private win(player: Player) {
    logger.info(`game:${this.id}: ${player.id} won!`);

    this.sockets.to(this.id).emit("GAME_END", {
      winner: player
    });
    this.sockets.to(this.id).emit("PLAYER_STATE_SYNC", {
      players: this.players
    });
  }

  private startTimer(): void {
    setTimeout(this.handleTimout.bind(this), 1000 * 15);
  }

  private handleStateChanged(): void {
    const survivors = this.players.filter(x => !x.state.ko);
    if (survivors.length === 1) {
      this.win(survivors[0]);
      return;
    }

    const lines = this.lines;
    const winner = survivors.find(x => {
      console.log(x);
      console.log(x.id, lines + x.state.add - x.state.remove - x.progress);
      return lines + x.state.add - x.state.remove - x.progress < 1;
    });
    if (winner) {
      this.win(winner);
      return;
    }

    logger.info(`game:${this.id}: state changed`);
    logger.info({
      players: this.players
    });
    this.sockets.to(this.id).emit("PLAYER_STATE_SYNC", {
      players: this.players
    });
  }

  private handleTimout(): void {
    if (this.state !== "playing") {
      logger.info(`game:${this.id}: time ticked. not playing.`);
      return;
    }
    logger.info(`game:${this.id}: time ticked.`);

    const lines = this.lines;
    const survivors = this.players.filter(x => !x.state.ko);
    survivors.sort((a, b) => {
      const ax = lines + a.state.add - a.state.remove - a.progress;
      const bx = lines + b.state.add - b.state.remove - b.progress;
      return bx - ax;
    });

    logger.info(`game:${this.id}: survivors: ${survivors.length}`);
    logger.info(`game:${this.id}: worst: ${survivors[0].id}`);

    this.timeOver(survivors[0]);
    setTimeout(this.handleTimout.bind(this), 1000 * 15);
  }
}
