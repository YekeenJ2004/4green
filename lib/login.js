import { User } from "../schemas.js";
import { connectToDB } from "../utils.js";


export const login = async(email, password) =>{
    try {
        db = await connectToDB()
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return [400,'User not found' ];
        }
    
        // Compare the password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return [400,'invalid credentials' ];
        }
    
        return [201, 'Login successful']
    } catch (error) {
        console.error('Error during login:', error);
        return [500, "internal server error"]
    }
} 