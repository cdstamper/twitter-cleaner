# twitter-cleaner
Simple command line utility for deleting old tweets

***NOTE: Currently twitter-cleaner deletes all tweets that it finds. Do NOT run this tool unless you want your entire timeline deleted.*** 

## DESCRIPTION
ideal usage would be a command line tool which accepts date ranges as parameters, authentication could be annoying though.

## USAGE
FIRST navigate to `https://developer.twitter.com/` and create a new API key – you'll need all four values so be sure to store them somewhere safe.

`npm install -g twitter-cleaner`

`~$ twitter-cleaner --consumer-key "key" --consumer-secret "secret" --access-token "token" --access-token-secret "secret" -u my_username_here`

## KNOWN ISSUES / TODO

- Pagination (API is limited to 3.2k max tweets)
- Query by date range
- CLI support w/ documentation

## CONTRIBUTIONS
Pull requests will be reviewed quickly 😀

As you'll notice immediately, this package doesn't do much. I'm working on improving it as I have time, but in the mean time I welcome any contributions!