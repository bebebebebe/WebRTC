# WebRTC Demo

This is a simple WebRTC demo, to be run in Chrome. It demos data transfer, rather than media transfer. That is, exchanging text messages, not video or audio. You can use it to send data between two browsers on the same wifi network.

## Motivation

It's possible to send data directly from one browser to another, without proceeding via a server. I wanted to see a really simple demo of this, but the "hello world" basic WebRTC demos tended to show data being transferred within one browser tab. This didn't seem too interesting, and made it harder to see what WebRTC was responsible for, since we can already "transfer" data within one browser tab. More complex examples that allow two different browser instances to communicate were *much* more complex, involving a lot of servers, and also making it hard to see what WebRTC was responsible for.

So this is a simple demo that lets two browser instances communicate. Before the communication begins, the browsers have to exchange some information about how to contact each other (their ip addresses), so the demo has the user do some extra steps, playing the role of a "signalling server."

See <a href='https://github.com/cjb/serverless-webrtc'>this</a> for an interesting project that uses this "serverless WebRTC" approach, and lets you send files and have video chats!

## To Use

You can clone the repo, and load the files locally, or use the hosted versions linked to below.

One person, the "sender" should load <a href='sender.html'>`sender.html`</a>

Someone else in the same wifi network (or you, in another browser window) should load <a href='receiver.html'>`receiver.html`</a>
