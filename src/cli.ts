#!/usr/bin/env node

import argParser from 'arg-parser';
const args = new argParser('tweet-cleaner', '1.0', 'CLI Twitter feed eraser', 'In addition to these parameters - more info https://github.com/cdstamper/twitter-cleaner');

args.add({
  name: 'username',
  desc: 'username to clean',
  switches: ['-u', '--username'],
  required: true,
  value: 'string',
});

args.add({
  name: 'consumer-key',
  desc: 'twitter consumer key',
  switches: ['-ck', '--consumer-key'],
  required: true,
  value: 'file',
});

args.add({
  name: 'consumer-secret',
  desc: 'twitter consumer secret',
  switches: ['-cs', '--consumer-secret'],
  required: true,
  value: 'file' });

args.add({
  name: 'access-token',
  desc: 'twitter access token key',
  switches: ['-at', '--access-token'],
  required: true,
  value: 'file',
});

args.add({
  name: 'access-token-secret',
  desc: 'twitter access token secret',
  switches: ['-ak', '--access-token-secret'],
  required: true,
  value: 'file',
});

args.add({
  name: 'should-delete',
  desc: 'by default tweet-cleaner only GETS tweets',
  switches: ['-d', '--destructive'],
});

// USAGE: twitter-cleaner --consumer-key "A" --consumer-secret "B" --access-token "C" --access-token-secret "D" -u myname
if (args.parse()) {

  process.env.TWITTER_CONSUMER_KEY = args.params['consumer-key'];
  process.env.TWITTER_CONSUMER_SECRET = args.params['consumer-secret'];
  process.env.TWITTER_ACCESS_TOKEN_KEY = args.params['access-token'];
  process.env.TWITTER_ACCESS_TOKEN_SECRET = args.params['access-token-secret'];

  // since we're injecting config via env, we need to wait to import:
  const main = require('./index');
  console.log('got user', args.params['username']);
  main.eraseAllTweetsBy(args.params['username'], args.params['should-delete'] || false);
}
