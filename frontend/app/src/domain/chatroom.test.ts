import { act, renderHook } from '@testing-library/react'
import { useChatRoom } from './chatroom'
import * as chatroom from './chatroom'

describe(`${useChatRoom.name}`, () => {
  it(`should let the user set the chat room id if user is the host`, () => {
    const { result } = renderHook(() => useChatRoom())
    act(() => {
      result.current.enterChatRoom('yozibak')
    })
    expect(result.current.username).toBe('yozibak')
    expect(result.current.roomID).toBe('yozibak-chat-room')
  })
  it(`should let the user enter the chat room if provided`, () => {
    jest.spyOn(chatroom, 'getInvitedRoom').mockReturnValue('yozibak-chat-room')
    const { result } = renderHook(() => useChatRoom())
    expect(result.current.roomID).toBe('yozibak-chat-room')
    act(() => {
      result.current.enterChatRoom('another-user')
    })
    expect(result.current.username).toBe('another-user')
    expect(result.current.roomID).toBe('yozibak-chat-room')
  })
})
