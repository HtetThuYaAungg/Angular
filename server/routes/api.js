const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const User = require('../models/user')
const mongoose = require('mongoose')
const db = "mongodb+srv://user:userpass@eventsdb.xsscv.mongodb.net/<dbname>?retryWrites=true&w=majority"

mongoose.connect(db, err => {
    if (err) {
        console.error('Error!'+ err)
    } else {
        console.log('Connected to mongodb')
    }
})

function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if (token === 'null') {
        return res.status(401).send('Unthorized request')
    }
    let payload = jwt.verify(token, 'secretKey')
    if (!payload) {
        return res.status(401).send('Unthorized request')
    }
    req.userId = payload.subject
    next()
}

router.get('/', (req, res) => {
    res.send('From API route')
})

router.post('/register', async (req, res) => {
    const existEmail = await User.findOne({ email: req.body.email });

        let userData = req.body
        let registeredUser = new User(userData)


    try {
        if (existEmail) {
            
            return res.status(401).send('Already email')
        }
        await registeredUser.save();
        let payload = { subject: registeredUser._id }
                        let token = jwt.sign(payload, 'secretKey')
                        res.status(200).send({ token })
    } catch (error) {
        console.log(error)
    }
})
// router.post('/register', (req, res) => {
//     let userData = req.body
//     let user = new User(userData)
//     user.save((error, registeredUser) => {
        
//         if (error) {
//             console.log(error)
//         } else {
             
//                         let payload = { subject: registeredUser._id }
//                         let token = jwt.sign(payload, 'secretKey')
//                         res.status(200).send({ token })
//                     }
        
//             })
        
// })

router.post('/login', (req, res) => {
    let userData = req.body

    User.findOne({ email: userData.email }, (error, user) => {
        if (error) {
            console.log(error)
        } else {
            if (!user) {
                res.status(401).send('Invalid email')
            } else if (user.password !== userData.password) {
                res.status(401).send('Invalid password')
            } else {
                let payload = { subject: user._id }
                let token = jwt.sign(payload, 'secretKey')
                res.status(200).send({token})
            }
        }
    })
})

router.get('/events', (req, res) => {
    let events = [
        {
            "id": "1",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-4-23T18:25:43.511Z"
        },
        {
            "id": "2",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-4-23T18:25:43.511Z"
        },
        {
            "id": "3",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-4-23T18:25:43.511Z"
        },
        {
            "id": "4",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-4-23T18:25:43.511Z"
        },
        {
            "id": "5",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-4-23T18:25:43.511Z"
        },
        {
            "id": "6",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-4-23T18:25:43.511Z"
        }
    ]
    res.json(events)
})

router.get('/special', verifyToken, (req, res) => {
    let events = [
        {
            "id": "1",
            "name": "Auto Expo1",
            "description": "lorem ipsum",
            "date": "2012-4-23 T18:25:43.511Z"
        },
        {
            "id": "2",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-4-23 T18:25:43.511Z"
        },
        {
            "id": "3",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-4-23T18:25:43.511Z"
        },
        {
            "id": "4",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-4-23T18:25:43.511Z"
        },
        {
            "id": "5",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-4-23T18:25:43.511Z"
        },
        {
            "id": "6",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-4-23T18:25:43.511Z"
        }
    ]
    res.json(events)
})

module.exports = router