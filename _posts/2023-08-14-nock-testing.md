---
layout: post
title:  "Testing with Nock"
---

### Mocking is Annoying

Testing can be annoying, and nothing makes testing more annoying than mocking. Mocking tends 
to be an arduous task where you try to replicate the behavior of another object interacting
with the tested code by expecting inputs and defining outputs. 

```
# Test that mocks an input/out
```

Mocking gets harder when you have libraries with more complex inputs or outputs. A great exmaple 
of this is HTTP requests. Mocking `axios` such that you can check what URL was called and give a JSON
output is no small feat.

```
# Test mocking axios input/output
```

Beyond writing the code, mocks often need to be rewritten. Mocking make tests brittle when they know 
too much - like that your code uses `axios` for instance. Want to switch to `got`? `node-fetch`? Some
other random library? You'll need to start rewriting tests.

### Testing with Nock
