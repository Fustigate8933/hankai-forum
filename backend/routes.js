const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


require("dotenv").config()
const mongoClient = require("mongodb").MongoClient
const { ObjectId } = require("mongodb")
const connectionString = process.env.DB_STRING
const jwtSecret = process.env.JWT_SECRET


mongoClient.connect(connectionString)
    .then(client => {
        console.log("Connected to Database in routes.js")
        const db = client.db("Forum")
        const postCollection = db.collection("Post")
        const commentCollection = db.collection("Comment")
        const userCollection = db.collection("User")




        router.get("/auth/user/exists/:userId", async (req, res) => {
            const users = await userCollection.find({username: req.params.userId}).toArray()
            res.send(users.length !== 0)
        })

        router.post("/auth/user/signup", async (req, res) => {
            // assume at frontend user exist is checked
            const saltRounds = 10
            req.body.password = await bcrypt.hash(req.body.password, saltRounds)
            userCollection.insertOne(req.body)
                .then(result => {
                    res.send(result)
                })
                .catch(error => {
                    console.error("Error: ", error)
                    res.send(error)
                })
        })

        router.post("/auth/user/signin", async (req, res) => {
            // assume at frontend user exists
            const { username, password } = req.body;
            const user = await userCollection.find({username: username}).toArray()

            if (user.length === 0){
                res.send(false)
            }else{
                const passwordMatch = await bcrypt.compare(password, user[0].password);
                if (passwordMatch){
                    const token = jwt.sign({ userId: user[0]._id }, jwtSecret, { expiresIn: '1d' })
                    res.send({token})
                }else{
                    res.send(false)
                }
            }
        })

        router.post("/auth/user/details", async (req, res) => {
            const token = req.body.token
            console.log(token)
            jwt.verify(token, jwtSecret, (err, decoded) => {
                if (err){
                    res.send(false)
                }else{
                    res.send({ "userId": decoded.userId})
                }
            })
        })






        router.get("/posts", async (req, res) => {
            const postsList = await postCollection.find({}).toArray()
            res.send(postsList)
        });

        router.get("/posts/:postId", async (req, res) => {
            const postId = req.params.postId
            const post = await postCollection.find({_id: new ObjectId(postId)}).toArray()
            if (!post){
                res.send({"status": `Post with id ${postId} not found`})
            }else{
                res.send(post)
            }
        })

        router.post("/posts/add", (req, res) => {
            req.body.userId = new ObjectId(req.body.userId)
            postCollection.insertOne(req.body)
                .then(result => {
                    res.send(result)
                })
                .catch(error => {
                    console.log("Error!")
                    console.log(error)
                    res.send(error)
                })
        });

        router.get("/posts/comments/:postId", async (req, res) => {
            const postId = req.params.postId
            const comments = await commentCollection.find({parentPost: true, parentId: new ObjectId(postId)}).toArray()
            res.send(comments)
        })

        router.post("/posts/comments/add", (req, res) => {
            req.body.parentId = new ObjectId(req.body.parentId)
            commentCollection.insertOne(req.body)
                .then(result => {
                    res.send(result)
                })
                .catch(error => {
                    console.log(error)
                })
        })

        router.delete("/posts/del/:postId", async (req, res) => {
            const postId = req.params.postId
            const deletedPost = await postCollection.findOneAndDelete({_id: new ObjectId(postId)})
            res.send(deletedPost)
        })

        router.delete("/posts/comments/del/:commentId", async (req, res) => {
            const commentId = req.params.commentId
            const deletedComment = await commentCollection.findOneAndDelete({_id: new ObjectId(commentId)})
            res.send(deletedComment)
        })
    })
    .catch(error => {
      console.log(error)
    })

module.exports = router;
