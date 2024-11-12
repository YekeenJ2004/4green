import { User } from "../schemas.s";
import { connectToDB } from "../utils.js";


export async function getleaderboard(username) {
    try {
        db = await connectToDB()
        // Find the main user by username
        const user = await User.findOne({ username: username });

        if (!user) {
            return[null, 400, `User ${username} not found`]
        }

        // Initialize the result dictionary with the main user's points
        let pointsDictionary = { [username]: user.points };

        // Retrieve points for each friend in the user's friends list
        const friends = await User.find({ username: { $in: user.friends } });

        friends.forEach(friend => {
            pointsDictionary[friend.username] = friend.points;
        });
        
        const sortedPointsDictionary = Object.fromEntries(
            Object.entries(pointsDictionary).sort(([, a], [, b]) => b - a)
        );

        return [sortedPointsDictionary, 200, "successfully retrieved leaderboard"]
    } catch (error) {
        console.error('Error retrieving points:', error);
        return [null, 500, "Internal server error"]
    }
}