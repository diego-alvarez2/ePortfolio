import { Schema, model } from "mongoose";
import { UserDocument } from "../types/user.interface";
import validator from 'validator'
import bcryptjs from 'bcryptjs'

const userSchema = new Schema<UserDocument>({ // We want to define the types of our Schema, that's why we use UserDocument, to get some validation 
    email: {
        type: String,
        required: [true, 'Email is required'],
        validate: [validator.isEmail, "invalid email"],
        createIndexes: {unique: true},
    },
    username: {
        type: String,
        required: [true, 'Username is required'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        select: false,
    },
},
{
    timestamps: true,
}
);

userSchema.pre('save', async function () {
 if (!this.isModified("password")) {
    return;
 }

const salt = await bcryptjs.genSalt(10);
this.password = await bcryptjs.hash(this.password, salt)

});

userSchema.methods.validatePassword = function (password: string) {
    return bcryptjs.compare(password, this.password);
}

export default model<UserDocument>("User", userSchema);


