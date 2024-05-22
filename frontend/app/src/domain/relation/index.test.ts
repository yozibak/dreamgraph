import { doesMakeLoop } from ".";
import { StaticProjectData } from "../../types";

const projects = [
  {
    projectId: 'pj-1',
    unlocks: ['pj-2'],
  },
  {
    projectId: 'pj-2',
    unlocks: [],
  },
  {
    projectId: 'pj-3',
    unlocks: ['pj-4'],
  },
  {
    projectId: 'pj-4',
    unlocks: ['pj-5', 'pj-6'],
  },
  {
    projectId: 'pj-5',
    unlocks: ['pj-1'], // loop when pj-1 traverses up here
  },
  {
    projectId: 'pj-6',
    unlocks: [],
  },
] as unknown as StaticProjectData[]

describe(`${doesMakeLoop.name}`, () => {
  const getPj = (id: string) => projects.find((p) => p.projectId === id)!
  it(`should return false when edge makes loop`, () => {
    const root = getPj('pj-1')
    const target = getPj('pj-3')
    expect(doesMakeLoop(root, target, getPj)).toBe(true)
  })
  it(`should return true when edge doesn't make loop`, () => {
    const root = getPj('pj-1')
    const target = getPj('pj-6')
    expect(doesMakeLoop(root, target, getPj)).toBe(false)
  })
})