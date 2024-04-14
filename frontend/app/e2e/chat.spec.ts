import { test, expect } from '@playwright/test'

test('test', async ({ browser }) => {
  // host
  const hostContext = await browser.newContext()
  const hostPage = await hostContext.newPage()
  await hostPage.goto('http://localhost:3000/')
  await expect(hostPage.locator('#root')).toContainText('chat room')
  await expect(hostPage.locator('#root')).toContainText("Welcome! Let's host a chat room")

  await hostPage.getByPlaceholder('enter your username').click()
  await hostPage.getByPlaceholder('enter your username').fill('host')
  await hostPage.getByRole('button', { name: 'send' }).click()
  await expect(hostPage.locator('#root')).toContainText('chat room host-chat-room')

  // guest
  const guestContext = await browser.newContext()
  const guestPage = await guestContext.newPage()
  await guestPage.goto('http://localhost:3000?roomID=host-chat-room')
  await expect(guestPage.locator('#root')).toContainText("Welcome to host-chat-room, enter your username to start")
  await guestPage.getByPlaceholder('enter your username').click()
  await guestPage.getByPlaceholder('enter your username').fill('guest')
  await guestPage.getByRole('button', { name: 'send' }).click()
  await expect(guestPage.locator('#root')).toContainText('chat room host-chat-room')

  // message
  await hostPage.getByPlaceholder("what's up?").click()
  await hostPage.getByPlaceholder("what's up?").fill('hello')
  await hostPage.getByRole('button', { name: 'send' }).click()
  await expect(hostPage.locator('#root')).toContainText('host: hello')
  await expect(guestPage.locator('#root')).toContainText('host: hello')
})
