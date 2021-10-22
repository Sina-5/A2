/* fileName: user.ts
 Student Name:Sina Pazhwak
 Student ID:301033560
 Date:2021-10-0-22 */

import mongoose, { PassportLocalSchema } from "mongoose";
const Schema = mongoose.Schema; // Schema alias
import passportLocalMongoose from "passport-local-mongoose";

const UserSchema = new Schema(
  {
    username: String,
    emailAddress: String,
    displayName: String,
    created: {
      type: Date,
      default: Date.now(),
    },
    updated: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    collection: "users",
  }
);

UserSchema.plugin(passportLocalMongoose);

const Model = mongoose.model("User", UserSchema as PassportLocalSchema);

declare global {
  export type UserDocument = mongoose.Document & {
    _id: String;
    username: String;
    emailAddress: String;
    displayName: String;
  };
}

export default Model;
