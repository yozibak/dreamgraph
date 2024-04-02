import { DomainStore } from '../domain'
import { Chat } from './chat'
import { Entrance } from './entrance'

export const getView = ({username}: DomainStore)=> {
  if (!username) return <Entrance />
  return <Chat />
}

