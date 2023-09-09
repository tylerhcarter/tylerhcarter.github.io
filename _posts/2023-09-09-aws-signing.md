---
layout: post
title:  "How AWS Verify Your Identity"
---

If you're an AWS developer, you likely make many privileged requests to AWS using 
tools like an SDK, CDK, CLI, or even just the console. However, despite doing this
for a while, I've only recently done a deep dive into just how those requests
are actually authenticated. Its not just an API key being sent over, its actually
an entire, cryptographically secure signature. And knowing how to use it correctly
can give you a lot of control over how you make your AWS requests secure.

## How It Works

* Generating the request digest
* Generating the signature key
* Generating the request signature

## Why It Works

* It verifies you have your secret
* All other details are a part of the request
* Second-nature to almost everyone

## Highlights & Takeways

* Make your patterns simple and reusable
* Encapsulate patterns as objects
* Create consistency across the board
