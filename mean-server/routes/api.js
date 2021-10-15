const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const mongoose = require('mongoose')
const User = require('../models/user')
const db = "mongodb+srv://root:root@cluster0.oxifr.mongodb.net/eventsdb?retryWrites=true&w=majority"
mongoose.connect(db,err =>{
    if(err){
        console.log('Error '+ err)
    }
    else{
        console.log("Connected to mongo db!!")
    }
})

function verifyToken(req,res,next){
    if(!req.headers.authorization){
        return res.status(401).send('unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if(token === 'null'){
        return res.status(401).send('unauthorized request')
    }
    let payload = jwt.verify(token,'secretKey')
    if(!payload){
        return res.status(401).send('unauthorized request')
    }
    req.userId = payload.subject
    next()
}
router.get('/get',async(req,res) => {
    const user = await User.find()
    res.json(user)
})

router.post('/register',(req,res)=>{
    let userData = new User();
     userData.email = req.body.email;
     userData.password = req.body.password;
    let user = new User(userData)
    user.save((err,registeredUser)=>{
        if(err)console.log(err);
        else {
            let payload = { subject: registeredUser._id}
            let token = jwt.sign(payload,'secretKey')
            res.status(200).send({token})
        }
    })
}) 

router.post('/login',(req,res)=>{
    let userData = req.body
    User.findOne({email: userData.email},(error,user)=>{
        if(error){
            console.log(error)
        }
        else{ 
            if(!user){
                res.status(401).send('Invalid Email')
            }
            else if(user.password !== userData.password)
            {
                res.status(401).send('Invalid Password')
            }
            else
            {
                let payload = { subject: user._id}
                let token = jwt.sign(payload,'secretKey')
                res.status(200).send({token})
                
            }
            
        }
    })

})

router.get('/events',(req,res) =>{
    let event = [
        {
            "_id":"1",
            "name":"Auto Expo",
            "description":"lorem ipsum",
            "date":"2021-04-23T18:25:43.511Z"
        },
        {
            "_id":"2",
            "name":"Auto Expo",
            "description":"lorem ipsum",
            "date":"2021-04-23T18:25:43.511Z"
        },
        {
            "_id":"3",
            "name":"Auto Expo",
            "description":"lorem ipsum",
            "date":"2021-04-23T18:25:43.511Z"
        },
        {
            "_id":"4",
            "name":"Auto Expo",
            "description":"lorem ipsum",
            "date":"2021-04-23T18:25:43.511Z"
        },
        {
            "_id":"5",
            "name":"Auto Expo",
            "description":"lorem ipsum",
            "date":"2021-04-23T18:25:43.511Z"
        },
        {
            "_id":"6",
            "name":"Auto Expo",
            "description":"lorem ipsum",
            "date":"2021-04-23T18:25:43.511Z"
        },
    ]
    res.json(event)
})

router.get('/special',verifyToken,(req,res) =>{
    let event = [
        {
            "_id":"1",
            "name":"Auto Expo",
            "description":"lorem ipsum",
            "date":"2021-04-23T18:25:43.511Z"
        },
        {
            "_id":"2",
            "name":"Auto Expo",
            "description":"lorem ipsum",
            "date":"2021-04-23T18:25:43.511Z"
        },
        {
            "_id":"3",
            "name":"Auto Expo",
            "description":"lorem ipsum",
            "date":"2021-04-23T18:25:43.511Z"
        },
        {
            "_id":"4",
            "name":"Auto Expo",
            "description":"lorem ipsum",
            "date":"2021-04-23T18:25:43.511Z"
        },
        {
            "_id":"5",
            "name":"Auto Expo",
            "description":"lorem ipsum",
            "date":"2021-04-23T18:25:43.511Z"
        },
        {
            "_id":"5",
            "name":"Auto Expo",
            "description":"lorem ipsum",
            "date":"2021-04-23T18:25:43.511Z"
        },
    ]
    res.json(event)
})
module.exports  = router; 