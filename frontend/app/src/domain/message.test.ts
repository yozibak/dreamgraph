import { act, renderHook } from '@testing-library/react'
import { useMessage } from './message'
import * as network from '../network'

afterEach(() => {
  jest.restoreAllMocks()
})

describe(`${useMessage.name}`, () => {
  let spySendMessage: jest.SpyInstance
  let spySubscription: jest.SpyInstance
  beforeEach(() => {
    spySendMessage = jest.spyOn(network, 'sendMessageToApi').mockImplementation()
    spySubscription = jest.spyOn(network, 'startSubscription').mockReturnValue({
      unsubscribe: jest.fn(),
    } as unknown as ReturnType<typeof network.startSubscription>)
  })
  it(`should start subscription after setting the room to listen to`, () => {
    const { rerender } = renderHook((roomID?: string) => useMessage(roomID))
    expect(spySubscription).not.toHaveBeenCalled()
    rerender('yozibak-chat-room')
    expect(spySubscription).toHaveBeenCalledWith('yozibak-chat-room', expect.any(Function))
  })
  it(`should send messages to the room`, () => {
    const { result } = renderHook(() => useMessage('yozibak-chat-room', 'username'))
    act(() => {
      result.current.sendMessage('hello')
    })
    expect(spySendMessage).toHaveBeenCalledWith('hello', 'yozibak-chat-room', 'username')
  })
})
