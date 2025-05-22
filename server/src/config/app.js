import dotenv from 'dotenv';
dotenv.config();

export const jwtSecret = process.env.JWT_SECRET
export const siteName = process.env.SITE_NAME
export const siteUrl = process.env.SITE_URL