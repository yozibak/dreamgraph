import { ProjectData } from "./types";

export const removeUnlockProject = (pj: ProjectData, removePjId: string):ProjectData => {
  pj.unlocks = pj.unlocks.slice().filter(pid => pid !== removePjId)
  return pj
}
