const notifications = [{
  "port": "80",
  "url": "process.env.NOTIFICATION_URL",
  "method": "PATCH",
  "type": "onSuccess",
  "payload": "request",
  "use_url": true,
  "allowed_requests": [
    {
      "path": "groups",
      "method": "POST"
    }
  ],
  "auth": {
    "type": "bearer",
    "token": "{{cache.token.token}}"
  }
},{
  "port": "80",
  "url": "process.env.NOTIFICATION_URL",
  "method": "POST",
  "type": "onSuccess",
  "payload": "response",
  "use_url": true,
  "allowed_requests": [
    {
      "path": "users",
      "method": "POST"
    }
  ],
  "auth": {
    "type": "bearer",
    "token": "{{cache.token.token}}"
  }
},{
  "port": "80",
  "url": "process.env.NOTIFICATION_URL",
  "method": "POST",
  "type": "onSuccess",
  "payload": "request",
  "use_url": true,
  "allowed_requests": [
    {
      "path": "users",
      "method": "PATCH"
    }
  ],
  "auth": {
    "type": "bearer",
    "token": "{{cache.token.token}}"
  }
}];
            
module.exports = { notifications };