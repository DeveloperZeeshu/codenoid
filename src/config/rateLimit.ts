import { Ratelimit } from '@upstash/ratelimit'
import redis from './redisDB'

type Window = '1 m' | '1 h'

const rateLimit = (limit: number = 5, window: Window = '1 m') => {
    return new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(limit, window),
        prefix: process.env.REDIS_PREFIX || '@code_doctor'
    })
}

export default rateLimit
