/* fileName: contacting.ts
 Student Name:Sina Pazhwak
 Student ID:301033560
 Date:2021-10-0-22 */

import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ContactingSchema = new Schema(
  {
    name: String,
    number: String,
    emailAddress: String,
  },
  {
    collection: "contacting",
  }
);

const Model = mongoose.model("contacting", ContactingSchema);
export default Model;
