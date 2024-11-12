import bcrypt from 'bcryptjs';
import { User } from '../schemas.js';
import { connectToDB } from "../utils.js";

db = await connectToDB()
export const signup = async() =>{
    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return [400,'User already exists']
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        return [201,'User created successfully']
    } catch (error) {
        return [500,'Internal server error']
    }
}