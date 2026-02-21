import mongoose, { Model, Schema } from "mongoose"

export interface ISession extends Document {
    userId: Schema.Types.ObjectId
    userAgent?: string
    ip?: string
    refreshTokenHash: string
    active: Boolean
    expiresAt: Date
    lastUsedAt: Date
}

const sessionSchema = new Schema<ISession>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        index: true,
        required: true
    },
    userAgent: {
        type: String,
        trim: true,
    },
    ip: {
        type: String,
        trim: true
    },
    refreshTokenHash: {
        type: String,
        trim: true,
        required: true
    },
    active: {
        type: Boolean,
        default: true
    },
    expiresAt: {
        type: Date,
        required: true
    },
    lastUsedAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true })

sessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 })
sessionSchema.index({ userId: 1, valid: 1 })
sessionSchema.index({ refreshTokenHash: 1 })

export const Session = (mongoose.models.Session || 
  mongoose.model<ISession>('Session', sessionSchema)) as Model<ISession>;
export default Session


