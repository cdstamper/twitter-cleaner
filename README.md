# twitter-cleaner
Simple command line utility for deleting old tweets, written in typescript and compiled to node/es6. Twitter Developer key required for API access, sign up for free at https://developer.twitter.com/.

## INTENT
Easily installable open-source CLI tool for safely purging your timeline. No need to trust any third-party, you can see the code yourself.

## USAGE
`npm install -g twitter-cleaner`
`open https://developer.twitter.com/ && signup`
`twitter-cleaner -ck "key" --consumer-secret "secret" --access-token "token" --access-token-secret "secret" -u cdstamper

## TODO
– Pagination (API is limited to 3.2k max tweets)
- Query by date range ('30 days', '90 days', etc)
- Query by 'after_id'