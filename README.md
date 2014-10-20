instance-digest-rfc3230
=======================

Generate instance digests in node in compliance with http://tools.ietf.org/html/rfc3230

```
var instanceDigest = require("instanve-digest-rfc3230")

var responseBody = JSON.stringify({
  "Hello": "World!"
})

var requestOptions = {
    hostname: "www.example.com",
    path: '/resource',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
}
requestOptions.headers.digest = instanceDigest(responseBody, "sha-256");
// SHA-256=nU+dINWadk54ZEcHlGl5yLiF4r5oUtiOjNJiAzkWU4A=

```
