import { Schema, model } from "mongoose"

const taskScheme = new Schema({
    userName: String,
    email: String,
    status: Boolean,
}, { versionKey: false })

export default model("Task", taskScheme)