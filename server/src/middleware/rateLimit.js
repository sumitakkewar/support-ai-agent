import { rateLimit } from 'express-rate-limit'
import MongoStore from 'rate-limit-mongo';
import { mongoUrl } from '../config/db.js';

const expiry = 5 * 60 * 1000

const limiter = rateLimit({
    windowMs: expiry,
    limit: 100,
    standardHeaders: true,
    legacyHeaders: false,
    store: new MongoStore({
        uri: mongoUrl,
        expireTimeMs: expiry,
        errorHandler: console.error.bind(null, 'rate-limit-mongo')
    }),
})

export default limiter