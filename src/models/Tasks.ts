import { Schema, model } from "mongoose"

const taskScheme = new Schema({
    userName: String,
    email: String,
    text: String,
    status: Boolean,
    changed: Boolean,
}, { versionKey: false })

export default model("Task", taskScheme)