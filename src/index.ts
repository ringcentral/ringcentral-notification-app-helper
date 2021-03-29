
/**
 * A module to help with communication with with RingCentral app in RingCentral notification app with UI.
 */

export interface Listener {
  (this: Window, ev: MessageEvent): any
}

export interface Data {
  [key : string]: any
}

export interface CanSubmit {
  canSubmit: Boolean
}

export class RingCentralNotificationIntegrationHelper {
  handler: Listener

  constructor () {
    this.handler = () => null
  }

  static MESSAGE_CHANNEL: Data = {
    oauth: 'INTEGRATION_OAUTH_CHANNEL',
    submitted: 'INTEGRATION_SUBMIT_CHANNEL'
  }

  getFrameName () {
    const arr = window.location.href.match(/frameName=([\w-_\d]+)/)
    /* istanbul ignore next */
    return arr ? arr[1] : ''
  }

  on (eventName: string, handler: Function) {
    this.handle(RingCentralNotificationIntegrationHelper.MESSAGE_CHANNEL.submitted, handler)
  }

  send (msg: CanSubmit) {
    this.notify(RingCentralNotificationIntegrationHelper.MESSAGE_CHANNEL.oauth, {
      status: msg.canSubmit
    })
  }

  openWindow (url: string) {
    return window.open(url, this.getFrameName())
  }

  handle (channel: string, handler: Function) {
    this.handler = this.createHandler(channel, handler)
    window.addEventListener('message', this.handler)
  }

  createHandler (channelName: string, handler: Function): Listener {
    return async (e) => {
      if (!e || !e.data) {
        return false
      }
      const {
        channel,
        type
      } = e.data
      if (channel !== channelName || type !== 'handle') {
        return false
      }
      const res = await handler(e)
      this.notify(channel, {
        type: 'event',
        channel,
        payload: res
      })
    }
  }

  notify (channel: string, data: Data) {
    window.parent.postMessage({
      type: 'event',
      channel,
      payload: data
    }, '*')
  }

  dispose () {
    window.removeEventListener('message', this.handler)
  }
}
