import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true, unique: true }, // Added unique constraint for email
  password: { type: String, required: true },
});

// Middleware to hash password before saving
userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) {
    return next();
  }
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err); // Pass errors to the next middleware
  }
});

const Users = mongoose.model("Users", userSchema);

export default Users;
