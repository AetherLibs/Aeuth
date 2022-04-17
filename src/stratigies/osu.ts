/* eslint-disable @typescript-eslint/no-explicit-any */
import 'dotenv/config'
import OsuStrategy from "passport-osu";

const clientID = `${process.env.OSU_CLIENT_ID}` || 'clientID';
const clientSecret = `${process.env.OSU_SECRET}` || 'clientSecret';
const host = 'localhost';
const port = Number(process.env.PORT) || 8080;
const callbackUrl = `http://${host}:${port}/auth/osu/cb`;

const osuStrat: OsuStrategy = new OsuStrategy({
    clientID,
    clientSecret,
    userProfileUrl: 'https://osu.ppy.sh/api/v2/me/osu',
    callbackURL: callbackUrl
    }, (_accessToken: string, _refreshToken: string, profile: any, cb: any) => {
        console.log(profile);
        return cb(null, profile);
    });

export default osuStrat;
