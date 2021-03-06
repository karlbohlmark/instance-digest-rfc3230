instance-digest-rfc3230
=======================

Generate instance digests in node in compliance with http://tools.ietf.org/html/rfc3230

## API

### instanceDigest(body, algorithm)
Calculate instance digest header value given body and algorithm
Example:
```
require("instance-digest-rfc3230")("hello world", "sha-256")
// -> SHA-256=uU0nuZNNPgilLlLX2n2r+sSE7+N6U4DukIj3rOLvzek=
```

```
var instanceDigest = require("instance-digest-rfc3230")

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
