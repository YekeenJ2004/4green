import { User } from "../schemas.js";
import { connectToDB } from "../utils.js";


export const addFriend = async(usernameAdding, userToBeAdded) => {

    try {
        db = await connectToDB()
        const updatedUser = await User.findOneAndUpdate(
            { username: usernameAdding }, // Find the user by their ID
            { $addToSet: { friends: userToBeAdded } }, // Add friend only if they are not already in the array
            { new: true } // Return the updated document
        );

        if (!updatedUser) {
            console.log("User not found");
            return [401, "User not Found"];
        }
        const updatedAddedUser = await User.findOneAndUpdate(
            { username: userToBeAdded }, // Find the user by their ID
            { $addToSet: { friends: usernameAdding } }, // Add friend only if they are not already in the array
            { new: true } // Return the updated document
        );

        console.log("Friend added successfully:", updatedUser);
        return [200, "Friend added successfully"];
    } catch (error) {
        console.error("Error adding friend:", error);
        return[400, "Error adding Friend"]
    }


}