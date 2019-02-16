#!/usr/bin/env node

var Args = require('arg-parser')
var args = new Args('tweet-cleaner', '1.0', 'CLI Twitter feed cleaner', 'In addition to these parameters - more info https://github.com/cdstamper/tweet-cleaner')

args.add({ name: 'username', desc: `username who's timeline will be erased`, switches: [ '-u', '--username'], required: true, })

args.add({ name: 'consumer-key', desc: 'twitter consumer key', switches: [ '-ck', '--consumer-key'], required: true, value: 'file',})
args.add({ name: 'consumer-secret', desc: 'twitter consumer secret', switches: [ '-cs', '--consumer-secret'], required: true, value: 'file',})
args.add({ name: 'access-token', desc: 'twitter access token key', switches: [ '-at', '--access-token'], required: true, value: 'file',})
args.add({ name: 'access-token-secret', desc: 'twitter access token secret', switches: [ '-ak', '--access-token-secret'], required: true, value: 'file',})

// USAGE: twitter-cleaner --consumer-key "A" --consumer-secret "B" --access-token "C" --access-token-secret "D" -u myname
if (args.parse()) {

	process.env.TWITTER_CONSUMER_KEY = args.params['consumer-key']
	process.env.TWITTER_CONSUMER_SECRET = args.params['consumer-secret']
	process.env.TWITTER_ACCESS_TOKEN_KEY = args.params['access-token']
	process.env.TWITTER_ACCESS_TOKEN_SECRET = args.params['access-token-secret']

	var main = require( './index')
	main.eraseAllTweetsBy(args.params['username'])
}