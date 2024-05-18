import Redis from "ioredis"
const RedisClient = new Redis(process.env.NEXT_PUBLIC_REDIS_CONNECTION as string)
export default RedisClient