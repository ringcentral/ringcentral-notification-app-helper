/* eslint-env jest */
import { RingCentralNotificationIntegrationHelper } from '../src/index.ts'

let ev

function wait (ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms)
  })
}

beforeAll(async done => {
  jest.setTimeout(6400000)
  ev = new RingCentralNotificationIntegrationHelper()
  done()
})

afterAll(async done => {
  await ev.dispose()
  done()
})

jest.setTimeout(64000)

describe('RingCentralNotificationIntegrationHelper', () => {
  test('open window', async () => {
    window.open = (url) => {
      console.log('open url', url)
      return window
    }
    const x = ev.openWindow('about: blank')
    expect(!!x.close).toBe(true)
  })
  test('on submit', async () => {
    window.parent = window
    let x = 0
    ev.on('submit', (e) => {
      console.log('eee', e)
      if (!e || !e.data || !e.data.payload) {
        x = false
      } else {
        x = e.data.payload
      }
      return {
        status: true
      }
    })
    window.postMessage({
      type: 'handle',
      channel: RingCentralNotificationIntegrationHelper.MESSAGE_CHANNEL.submitted,
      payload: 1
    }, '*')
    await wait(100)
    expect(x).toBe(1)
    await wait(100)
    window.postMessage({
      type: 'handle1',
      channel: RingCentralNotificationIntegrationHelper.MESSAGE_CHANNEL.submitted,
      payload: 1
    }, '*')
    await wait(100)
    expect(x).toBe(1)
    await wait(100)
    window.postMessage(null, '*')
    await wait(100)
    expect(x).toBe(1)
    await wait(100)
    window.postMessage({
      type: 'handle',
      channel: RingCentralNotificationIntegrationHelper.MESSAGE_CHANNEL.submitted,
      payload: 2
    }, '*')
    await wait(100)
    expect(x).toBe(2)
  })
  test('send to rc app', async () => {
    window.parent = window
    let x = 0
    window.addEventListener('message', (e) => {
      if (e && e.data && e.data.payload && typeof e.data.payload.status !== 'undefined') {
        x = e.data.payload.status
      }
    })
    ev.send({
      canSubmit: true
    })
    await wait(300)
    expect(x).toBe(true)
  })
  test('createHandler', () => {

  })
})
