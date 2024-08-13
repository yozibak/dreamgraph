import { calcProjectValue, doesMakeLoop, ProjectEntity } from './project'

const createProject = ({ importance }: Pick<ProjectEntity, 'importance'>): ProjectEntity => {
  return {
    id: Math.floor(Math.random() * 10000).toString(),
    title: '',
    unlocks: [],
    importance,
    status: 'normal',
  }
}

test(`${calcProjectValue.name}`, () => {
  const pj1: ProjectEntity = createProject({
    importance: 1,
  })
  const pj2: ProjectEntity = createProject({
    importance: 2,
  })
  const pj3: ProjectEntity = createProject({
    importance: 3,
  })
  const pj4: ProjectEntity = createProject({
    importance: 4,
  })
  const pj5: ProjectEntity = createProject({
    importance: 5,
  })
  const pj6: ProjectEntity = createProject({
    importance: 5,
  })
  pj1.unlocks.push(pj2, pj3)
  pj3.unlocks.push(pj4)
  pj5.unlocks.push(pj1)

  expect(calcProjectValue(pj1)).toBe(
    pj1.importance + pj2.importance + pj3.importance + pj4.importance
  )
  expect(calcProjectValue(pj2)).toBe(pj2.importance)
  expect(calcProjectValue(pj3)).toBe(pj3.importance + pj4.importance)
  expect(calcProjectValue(pj4)).toBe(pj4.importance)
  expect(calcProjectValue(pj5)).toBe(pj5.importance + calcProjectValue(pj1))
  expect(calcProjectValue(pj6)).toBe(pj6.importance)
})

test(`${doesMakeLoop.name}`, () => {
  const [pj1, pj2, pj3] = [...new Array(3)].map(() => createProject({ importance: 3 }))
  pj1.unlocks.push(pj2, pj3)
  pj3.unlocks.push(pj1)
  expect(doesMakeLoop(pj2)).toBe(false)
  expect(doesMakeLoop(pj3)).toBe(true)
  expect(doesMakeLoop(pj1)).toBe(true)
})
