import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    posts: Schema.Types.ObjectId[];
    likedPosts: Schema.Types.ObjectId[];
    dislikedPosts: Schema.Types.ObjectId[];
    isCorrectPassword(password: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Must match an email address!'],
        },
        password: {
            type: String,
            required: true,
            minlength: 8,
        },
        posts: [{type: Schema.Types.ObjectId, ref: "Post"}],
        likedPosts: [{type: Schema.Types.ObjectId, ref: "Post"}],
        dislikedPosts: [{type: Schema.Types.ObjectId, ref: "Post"}],
    }
);

// for seeding hooks
userSchema.pre<IUser>('insertMany', async function (next, docs) {
    try {
        docs = docs.map(async (doc: IUser) => {
            const saltRounds = 10;
            doc.password = await bcrypt.hash(doc.password, saltRounds);
            return doc;
        });
    } catch (err) {
        console.error(err);
    }

    next();
});

// pre hook to hash the password before saving a new user or updating password field on a user
userSchema.pre<IUser>('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
});

userSchema.methods.isCorrectPassword = async function (password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
};

const User = model<IUser>('User', userSchema);

export default User;