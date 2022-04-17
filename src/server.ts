/* eslint-disable @typescript-eslint/no-explicit-any */
import 'dotenv/config'
import express, { type Express, Request, Response } from 'express';
import passport from 'passport';
import session from 'express-session';
import osuStrat from './stratigies/osu';

export default class Server {
    private app: Express;

    constructor() {
        this.app = express();
    }

    async start(): Promise<void> {

        const secret = process.env.SECRET || 'secret';

        this.app.use(session({
            secret: secret,
            resave: false,
            saveUninitialized: true
        }));

        this.app.use(passport.initialize());
        this.app.use(passport.session());
        this.app.use(express.static('public'));

        passport.use(osuStrat);

        passport.serializeUser((user: any, done: any) => {
            done(null, user);
        });

        passport.deserializeUser((user: any, done: any) => {
            done(null, user);
        });

        // TODO: Add routes
        this.app.get('/auth/osu', (_req: Request, _res: Response, next: any) => {
            next()
        }, passport.authenticate('osu'));

        this.app.get('/auth/osu/cb', passport.authenticate('osu', { failureRedirect: '/error' }), (req: Request, res: Response) => {
            res.send("Successfully authentucated! You should have been redirected to the home page.");
        });

        const host = '127.0.0.1';
        const port = Number(process.env.PORT) || 8080;
        this.app.listen(port, host);
        console.log(`Server running at http://${host}:${port}\nAuth URL is http://${host}:${port}/auth/osu`);
    }
}
