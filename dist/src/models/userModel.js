import { Schema, model } from 'mongoose';
;
const userSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    role: {
        type: String,
        required: true,
        default: "NORMAL",
    },
    password: { type: String, required: true }
}, {
    timestamps: true
});
const User = model("User", userSchema);
export default User;
