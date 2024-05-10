import { Schema, Document, model, Model } from 'mongoose';
import UserDocument from '../shared/UserDocument';

interface UserModel extends Model<UserDocument>{};

const userSchema = new Schema<UserDocument>({
    username:{ type:String, required: true },
    email:{ type:String, required:true },
    role:{ 		
        type:String, 		
        required:true, 		
        default:"NORMAL", 		
    },
    password:{ type:String, required:true }
},
{
    timestamps:true
});

const User = model<UserDocument, UserModel>("User", userSchema);

export default User;

