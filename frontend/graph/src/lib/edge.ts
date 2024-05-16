import { EdgeItem } from "./types";

export const includeEdgeId = <E extends EdgeItem>(edge: E):E & {id: string} => ({
  ...edge,
  id: generateEdgeId(edge),
})

export const generateEdgeId = (edge: EdgeItem) => `${edge.from}-${edge.to}`
