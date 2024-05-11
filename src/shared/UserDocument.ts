interface UserDocument extends Document {
    _id:string,
    username: string,
    email: string,
    role:string,
    password: string
}

export default UserDocument;