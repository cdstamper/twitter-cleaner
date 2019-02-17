import twitter from 'twitter';

const client = new twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY || 'N/A',
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET || 'N/A',
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY || 'N/A',
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET || 'N/A',
});

async function tweetsBy(screenName: string) {
  // See https://developer.twitter.com/en/docs/tweets/timelines/guides/working-with-timelines
  //   User timelines belonging to protected users may only be requested when the authenticated user either "owns" the timeline or is an approved follower of the owner.
  // The timeline returned is the equivalent of the one seen as a user's profile on Twitter.
  // This method can only return up to 3,200 of a user's most recent Tweets. Native retweets of other statuses by the user is included in this total, regardless of whether include_rts is set to false when requesting this resource.
  try {
    return client.get('statuses/user_timeline', { screen_name: screenName, trim_user: true });
  } catch (e) {
    console.log('failed to get timeline for user', screenName, e);
  }
}

async function destroy(id: string) {
  try {
    const t = await client.get('statuses/destroy', { id, trim_user: true });
    console.log('deleted:', t.created_at, `https://twitter.com/statuses/${t.id}/`, t.text);
  } catch (e) {
    console.log('failed to delete tweet:', id, e);
  }
}

async function get(id: string) {
  try {
    const t = await client.get('statuses/show', { id, trim_user: true });
    console.log('got:', t.created_at, `https://twitter.com/statuses/${t.id_str}/`, t.text);
  } catch (e) {
    console.log('failed to get tweet:', id, e);
  }
}

export async function eraseAllTweetsBy(screenName: string, shouldDelete: boolean = false) {
  try {
    const tweets = await tweetsBy(screenName);
    const deletionOps = tweets!.map((t: any) => (shouldDelete ? destroy : get)(t.id_str));
    return Promise.all(deletionOps);
  } catch (e) {
    console.log('caught error during mass deletion of entire timeline', e);
  }
}
