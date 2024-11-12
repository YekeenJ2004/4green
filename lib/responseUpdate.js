
import { Response } from "../schemas.js";
import { connectToDB } from "../utils.js";


export const updateLikes = async (username, action) => {
    try {
        db = await connectToDB()
        // Find the response by responsename
        const response = await Response.findOne({ username });

        if (!response) {
            return [400, 'response doesnt exist']
        }

        // Update the likes count based on the action
        if (action === 'add') {
            response.likes += 1;
            await response.save();
            return[ 200, 'Like Added']
        } else if (action === 'remove') {
            response.likes = Math.max(response.likes - 1, 0); // Ensure likes don’t go below 0
            await response.save();
            return[ 200, 'Like removed']
        } else {
            return [400, 'Could not update likes']
        }

    } catch (error) {
        console.error('Error updating likes:', error);
        return [500, 'Internal server error']
    }
};