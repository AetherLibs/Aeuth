/* DotEnv Init */
import { config } from 'dotenv';
config();

/* Express Init */
import Server from './server';
new Server().start();

