# ringcentral-notification-integration-helper

[![Build Status](https://img.shields.io/endpoint.svg?url=https%3A%2F%2Factions-badge.atrox.dev%2Fatrox%2Fsync-dotenv%2Fbadge)](https://github.com/ringcentral/ringcentral-notification-integration-helper/actions)
[![Coverage Status](https://coveralls.io/repos/github/ringcentral/ringcentral-notification-integration-helper/badge.svg?branch=release)](https://coveralls.io/github/ringcentral/ringcentral-notification-integration-helper?branch=release)

A module to help with communication with with RingCentral app in RingCentral notification app with UI.

## APIs and uses

```bash
npm i ringcentral-notification-integration-helper -D
```

```js
import { RingCentralNotificationIntegrationHelper } from 'ringcentral-notification-integration-helper'
// or
// const { RingCentralNotificationIntegrationHelper } = require('ringcentral-notification-integration-helper')

const app = new RingCentralNotificationIntegrationHelper()

// Notify RingCentral app that the integration can submit or not
// so RingCentral app can enable or disable submit button in RingCentral app UI
app.send({
  canSubmit: true // or false if can not submit
})

// Receive message from RingCentral app that
// user already click submit button so integration can proceed to submit.
app.on('submit', async function someSubmitFunction (e) {
  console.log(e.data.payload)
  // do something like submit
  const submitSuccess = await doSubmit()
  return {
    status: !!submitSuccess // true means submit success, RingCentral app will close integration window
  }
})

// Open window with proper params so user can do authorization
// in opened window by RingCentral, window.open would not work,
// check src/index.ts for detail
app.openWindow(windowUrl: string)
```

## Test

```bash
npm i
npm run test
```

## Real world demo

- [ringcentral-notification-app with UI(authorization and else)](https://github.com/ringcentral/ringcentral-notification-demo-ui-app)

## Tools

- [Developer tool to simulate running in RingCentral App](https://github.com/ringcentral/ringcentral-notification-app-developer-tool)

## License

MIT
