import { User, Challenges } from "../schemas.js";
import { connectToDB } from "../utils.js";



export const getHomePageData = async(username) => {
    try{
        db = connectToDB()

        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

        // Query to find challenges with today's date
        const challenge = await Challenges.find({
            date: { $gte: startOfDay, $lt: endOfDay }
        });
 
        let resultsObject = {
            friends :[],
            question: challenge,
            points: points,
        }
        const user = await User.findOne({ username });

        
        for (const friend of user.friends) {
            resultsObject.friends.push({
                name: friend,
                hasLiked: friend.hasLiked
            });
        }

    }catch{
        
    }

}

getHomePageData()