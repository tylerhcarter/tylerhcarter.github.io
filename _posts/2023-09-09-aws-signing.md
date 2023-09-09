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
Every time you make a request, the client you use preforms three actions:

1. Gathers your request body and (most of) your request headers, and hashes it. (Request Digest)
2. Gathers your client secret, request date, expiration time, and hashes it. (Signing Key)
3. Puts both of the above together, and then hashes it. (Signature)

Once you send the request, AWS then does the same thing. Your request is considered
valid if, and only if the signature AWS creates matches the one included in your request.

## What is a digest?

A **digest** or **hash**, for any unfamilliar, is commonly a string of completely 
random gibberish, like below. The power of a digest is that for a single piece of
input, the output is always the same. And if that input changes, even slightly, the
digest is designed to be significantly different. 

```
MyTestString -> f8a98c6d3b23908378c96e471d39225f368ea57b95e26263b3f2430e26210885
MyT3stString -> 9ced8ce330e02e3da97fec1c49110366a8598e4d0e0e06f4ac1b8db2a29e3ff2
```

Digests are not reversible, which means you cannot derive the input from the output 
like in encryption. You've likely seen them used in things like caching, git, or
many other areas of programming. 

### Generating the Request Digest
First step - we need to make a digest of the entire request. This seems simple, but 
a common developer might ask: What all makes up a request? How do we put it together?

This is important to get right. If you don't put your request together the exact way
AWS does, your signatures won't match. And because a single space could change your
output drastically, every detail matters.

Fortunately, AWS has made it very clear exactly what is in a request and how it comes together.



### Generating the Signature Key


### Generating the Request Signature


## Why It Works

* It verifies you have your secret
* All other details are a part of the request
* Second-nature to almost everyone

## Highlights & Takeways

* Make your patterns simple and reusable
* Encapsulate patterns as objects
* Create consistency across the board
