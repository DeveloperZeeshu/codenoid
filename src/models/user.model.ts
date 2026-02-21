import mongoose, { Model, Schema, SchemaDefinitionProperty } from "mongoose"

type BaseUser = {
    name: string
    email: string
    emailVerifiedAt: Date | null
    isActive: boolean
    isDeleted: boolean
    roles: ('USER' | 'ADMIN')[]
}

type CredentialUser = BaseUser & {
    authProvider: 'CREDENTIALS'
    passwordHash: string
}

type GoogleUser = BaseUser & {
    authProvider: 'GOOGLE'
    providerId: string
    passwordHash?: never
}

const passwordHashSchema: SchemaDefinitionProperty<string> = {
    type: String,
    trim: true,
    required(this: IUser) {
        return this.authProvider === 'CREDENTIALS'
    }
}

export type IUser = (CredentialUser | GoogleUser) & Document

const userSchema = new Schema<IUser>({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        required: true,
        index: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    emailVerifiedAt: {
        type: Date,
        default: null
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    roles: {
        type: [String],
        enum: ['USER', 'ADMIN'],
        required: true,
        default: ['USER']
    },

    passwordHash: passwordHashSchema,

    authProvider: {
        type: String,
        enum: ['GOOGLE', 'CREDENTIALS'],
        required: true
    },

    providerId: {
        type: String,
        trim: true,
    }
}, { timestamps: true })

userSchema.index({ providerId: 1 }, { unique: true, sparse: true })
userSchema.index({ email: 1, authProvider: 1 }, { unique: true })

export const User = (mongoose.models.User || 
  mongoose.model<IUser>('User', userSchema)) as Model<IUser>;
export default User
