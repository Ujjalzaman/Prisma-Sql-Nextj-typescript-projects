import dotenv from "dotenv";
import path from 'path';


dotenv.config({path: path.join(process.cwd(), '.env')});

export default {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    database_url: process.env.DATABASE_URL,
    saltRound: process.env.BCRYP_SALT_ROUND,
    jwt: {
        secret: process.env.JWT_SCRET,
        JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
        refresh_secret: process.env.JWT_REFRESH_SCRET,
    }
}