import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },

}, {
    timestamps: true
});


userSchema.methods.matchPassword = async function(entered_password) {
    return await bcrypt.compare(entered_password, this.password)
};
//crypting password before saving user;
userSchema.pre("save", async function(next) {
    //check if user has made changes 'name/email'if so we just skip this part
    if (!this.isModified("password")) {
        next()
    };
    //if user creating an account we create salt and hash the password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});


const User = mongoose.model("User", userSchema);

export default User