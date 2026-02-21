'server only'

import conf from '@/conf/conf'
import mongoose, { Mongoose } from 'mongoose'

const MONGODB_URL = conf.mongoDbUri
if (!MONGODB_URL) {
    throw new Error('MongoDB Uri not defined.')
}

mongoose.set('bufferCommands', false)

type MongooseCache = {
    conn: Mongoose | null
    promise: Promise<Mongoose> | null
}

declare global {
    var mongoose: MongooseCache | undefined
}

const cached = globalThis.mongoose ??= {
    conn: null,
    promise: null
}

export async function connectToDB(): Promise<Mongoose> {
    if(cached.conn) return cached.conn

    if(!cached.promise){
        cached.promise = mongoose.connect(MONGODB_URL, {
            dbName: 'code_doctor_test',
            maxPoolSize: 10
        })
    }
    cached.conn = await cached.promise
    return cached.conn
}

