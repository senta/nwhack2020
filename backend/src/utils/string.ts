export function createId (): string {
   // TODO: avoide collisions
  return Math.random()
        .toString(36)
        .substring(2)
}
