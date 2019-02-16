"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const twitter_1 = __importDefault(require("twitter"));
const client = new twitter_1.default({
    consumer_key: process.env.TWITTER_CONSUMER_KEY || 'N/A',
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET || 'N/A',
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY || 'N/A',
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET || 'N/A',
});
function tweetsBy(screenName) {
    return __awaiter(this, void 0, void 0, function* () {
        // See https://developer.twitter.com/en/docs/tweets/timelines/guides/working-with-timelines
        //   User timelines belonging to protected users may only be requested when the authenticated user either "owns" the timeline or is an approved follower of the owner.
        // The timeline returned is the equivalent of the one seen as a user's profile on Twitter.
        // This method can only return up to 3,200 of a user's most recent Tweets. Native retweets of other statuses by the user is included in this total, regardless of whether include_rts is set to false when requesting this resource.
        try {
            return client.get('statuses/user_timeline', { screen_name: screenName, trim_user: true });
        }
        catch (e) {
            console.log('failed to get timeline for user', screenName, e);
        }
    });
}
function destroy(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const t = yield client.get('statuses/destroy', { id, trim_user: true });
            console.log('t:', t, t);
        }
        catch (e) {
            console.log('failed to delete tweet:', id, e);
        }
    });
}
function eraseAllTweetsBy(screenName) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const tweets = yield tweetsBy(screenName);
            const deletionOps = tweets.map((t) => destroy(t.id_str));
            return Promise.all(deletionOps);
        }
        catch (e) {
            console.log('caught error during mass deletion of entire timeline', e);
        }
    });
}
exports.eraseAllTweetsBy = eraseAllTweetsBy;
