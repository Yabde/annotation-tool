import { Document, Schema, Model, model } from "mongoose";
import { UserItf } from "@shared/interfaces/user.itf";
import { HTTP400Error } from "@utils/http.errors";
import { validateEmail, validatePwd } from "@shared/functions/checks";

export interface UserModel extends UserItf, Document {
    fullName(): string;
}

const UserSchema: Schema = new Schema({
    email: String,
    first_name: String,
    last_name: String,
    pwd: String,
    last_connection: Date,
    rights: Number,
    annotations_ref: [String],
}, { toJSON: { transform: omitPrivate } });

function omitPrivate(doc: Document, obj: UserModel) {
    delete obj.__v;
    delete obj.pwd;
    return obj;
}

// UserSchema.pre('save', async function (user: any) {
//     // if (!validatePwd(user.pwd)) { throw new HTTP400Error("Wrong Password") }
//     // if (!validateEmail(user.email)) { throw new HTTP400Error("Wrong Email") }
//     await Promise.resolve()
// });

UserSchema.methods.fullName = function (): string { return (this.first_name.trim() + " " + this.last_name.trim()); };

export const User: Model<UserModel> = model<UserModel>("User", UserSchema);
