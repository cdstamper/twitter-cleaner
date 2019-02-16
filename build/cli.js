#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const arg_parser_1 = __importDefault(require("arg-parser"));
const args = new arg_parser_1.default('tweet-cleaner', '1.0', 'CLI Twitter feed eraser', 'In addition to these parameters - more info https://github.com/cdstamper/twitter-cleaner');
args.add({
    name: 'username',
    desc: 'username to clean',
    switches: ['-u', '--username'],
    required: true,
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
    value: 'file'
});
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
// USAGE: twitter-cleaner --consumer-key "A" --consumer-secret "B" --access-token "C" --access-token-secret "D" -u myname
if (args.parse()) {
    process.env.TWITTER_CONSUMER_KEY = args.params['consumer-key'];
    process.env.TWITTER_CONSUMER_SECRET = args.params['consumer-secret'];
    process.env.TWITTER_ACCESS_TOKEN_KEY = args.params['access-token'];
    process.env.TWITTER_ACCESS_TOKEN_SECRET = args.params['access-token-secret'];
    // since we're injecting config via env, we need to wait to import:
    const main = require('./index');
    main.eraseAllTweetsBy(args.params['username']);
}
