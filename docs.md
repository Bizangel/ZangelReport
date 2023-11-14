# API Documentation

The purpose of the API is to allow easy to use reporting API.

_All routes are prefixed with /api_

# Discord

`POST /api/discord/notify` Notifies via discord to the request channel

```ts
{
  /**
   * The channel to send the message / notify to
   * Each one of these can be directly customized via the serverconfig.json
   */
  channel: 'logs' | 'announce' | 'reports' | 'dm';
  message: string;
}
```
