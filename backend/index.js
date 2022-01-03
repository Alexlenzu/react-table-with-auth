const cors = require('cors')
const express = require('express')
const { MongoClient, ObjectId } = require("mongodb");
const auth = require("./middleware");

const jwt = require("jsonwebtoken");

const app = express()

// database config
let uri = `mongodb+srv://<username>:<password>@test.yfxtz.mongodb.net/alexandersusers?retryWrites=true&w=majority`
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// global database instance
let db;

const PORT = 5000;
app.use(cors())

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.post('/login', async (req, res, next) => {
    try {
        // Get user input
        const { username, password } = req.body;

        // Validate user input
        if (!(username && password)) {
            res.status(400).send("All input is required");
        }
        // Validate if user exist in our database
        const user = await db.collection("admin").findOne({ username });

        if (user && password === user.password) {
            // Create token
            const token = jwt.sign({ user_id: user._id, username }, "alexander-key");

            res.status(200).json({token: token});
        }
        res.status(400).send("Invalid Credentials");
    } catch (err) {
        console.log(err);
    }
})

// Gets all users
app.get('/users',auth, async (req, res, next) => {

    const users = await db.collection("users").find({}).toArray()
    res.json(users)


})

// Gets a single user
app.get('/users/:id',auth, async (req, res, next) => {
    const id = req.params['id']
    const user = await db.collection("users").findOne({ "_id": ObjectId(id) })

    if (user) {
        res.json(user)
        return
    }
    res.sendStatus(404)
})

// creates a single user
app.post('/users',auth, async (req, res, next) => {
    const body = req.body
    await db.collection("users").insertOne(body)
    res.sendStatus(200)
})

// Updates a single user
app.put('/users/:id',auth, async (req, res, next) => {
    const id = req.params['id']
    const body = req.body

    // the query to target the id
    const query = { "_id": ObjectId(id) }
    const update = { $set: body }

    await db.collection("users").updateOne(query, update)
    res.sendStatus(200)


})

// Deletes a user
app.delete('/users/:id',auth, async (req, res, next) => {
    const id = req.params['id']
    await db.collection("users").deleteOne({ "_id": ObjectId(id) })
    res.sendStatus(200)

})


client.connect((error, c) => {
    if (error) {
        return console.log("mongodb: connection failed", error);
    }
    console.log("Connected to mongodb atlas");

    db = c.db("alexandersusers");

    app.listen(PORT, () => {
        console.log(`server listening on port: ${PORT}`)
    })
});