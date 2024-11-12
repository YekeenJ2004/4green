import express from 'express';
import { signup } from './lib/signup.js';
import { getleaderboard } from './lib/getLeaderBoard.js';
import { connectToDB } from './utils.js';
import { addFriend } from './lib/addFriend.js';
import { searchFriend } from './lib/searchFriend.js';
import { updateLikes } from './lib/responseUpdate.js';

const app = express();
app.use(express.json());

db =connectToDB()

// Signup Endpoint
app.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    const[status, message] = signup(username, email, password)
    res.status(status).json({ message});
});

// Login Endpoint
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const [status, message] = login(email, password)
    res.status(status).json({ message});
});

app.get('/getleaderboard/:username', async (req, res) => {
    const { username } = req.params.username;

    const [leaderboardPointsObject, status, message] = await getleaderboard(username)

    res.status(status).json({ message: message, leaderBoard: leaderboardPointsObject});
});

app.get('/homepagedata', async (req, res) => {
    const { username } = req.body;

    const [homePageDataObject, status, message] = getHomePageData(username)

    res.status(status).json({ message: message, leaderBoard: leaderboardPointsObject});
});

app.put('/updateresponse', async (req, res) => {
    const { username, action} = req.body;

    const [ status, message] = updateLikes(username, action)

    return res.status(status).json({ message: message});
});

app.post('/addfriend', async (req, res) => {
    const {user, userToBeAdded} = req.body;

    const [ status, message] = addFriend(user, userToBeAdded)

    return res.status(status).json({ message: message});
});

app.get('/searchfriends', async (req, res) => {
    const [searchterm, username]= req.body;

    const [ status, message, resultObjects] = searchFriend(searchterm, username)

    return res.status(status).json({ message: message, results: resultObjects});
});

app.get('/api/image/:filename', async (req, res) => {
    const fileName = req.params.filename;

    try {
        const downloadStream = bucket.openDownloadStreamByName(fileName);

        // Set the content type for the response
        res.setHeader('Content-Type', 'image/jpeg'); // Adjust this if your file type varies

        // Pipe the image data directly to the response
        downloadStream.pipe(res);

        downloadStream.on('error', (err) => {
            console.error('Error retrieving image:', err);
            res.status(404).send('Image not found');
        });
    } catch (error) {
        console.error('Error fetching image:', error);
        res.status(500).send('Server error');
    }
});


// Start the Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
