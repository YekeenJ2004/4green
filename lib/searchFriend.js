import { User } from "../schemas.js"
import { connectToDB } from "../utils.js"


export const searchFriend = async(searchTerm, username) =>{
    try{
        db = await connectToDB()
        let resultObjects = [] 
        const resultUsers = await User.find({ 
          username: {$regex : searchTerm, $options: 'i'}
        })
        if(!resultUsers){
            return[401, "User does not Exist"]
        }
        
        for(const user in resultUsers){

            const isFriend =  user.findOne({
                username: user.username,
                friends: username
            })
            
            if(isFriend){
                isFriend = true
            }else{
                isFriend = false
            }

            resultObjects.push({
                username: user.username,
                isFriend:  isFriend
            })
        }
        return [200, "Users found", resultObjects]
    }catch(err){
        console.log(err)
        throw new Error('Failed to fetch users')
    }
}