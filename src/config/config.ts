import { registerAs } from '@nestjs/config';

export default registerAs('config', () => ({
    port: parseInt(process.env.PORT) || 3000,
    db: {
        db_user: process.env.DATABASE_USER,
        db_password: process.env.DATABASE_PASSWORD,
        db_name: process.env.DATABASE_NAME,
        db_host: process.env.DATABASE_HOST,
        db_port: parseInt(process.env.DATABASE_PORT),
    },
    jwt_secret: process.env.JWT_SECRET,
}));