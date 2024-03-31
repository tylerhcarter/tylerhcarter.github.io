---
layout: post
title:  "Better HTTP Mocking"
---

### Mocking is Annoying

Testing can be annoying, and nothing makes testing more annoying than mocking. Mocking tends 
to be an arduous task where you try to replicate the behavior of another object interacting
with the tested code by expecting inputs and defining outputs. 

```
# Test that mocks an input/out
```

Mocking gets harder when you have libraries with more complex inputs or outputs. A great example 
of this is HTTP requests. Mocking `axios` such that you can check what URL was called and give a JSON
output is no small feat.

```
# Test mocking axios input/output
```

Beyond writing the code, mocks often need to be rewritten. Mocking make tests brittle when they know 
too much - like that your code uses `axios` for instance. Want to switch to `got`? `node-fetch`? Some
other random library? You'll need to start rewriting tests.

### Stepping beyond the client

* In coding we are too concerned with details
* We just straight to ... well I need to mock this
* We might even jump to creating an interface for the client to decouple it
* We could, instead, just mock it at the HTTP layer
* This gets us out of the entire HTTP client business...
* Insert demo of using `nock`
* Profit?
