
/* eslint-disable no-console */
require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const twilioNumber = process.env.TWILIO_PHONE_NUMBER;
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const database = require('../database-mongo/index.js');
const twilio = require('twilio');
const port = process.env.PORT || 3000;
const cors = require("cors");
const app = express();
const jwt = require('jsonwebtoken');
const client = new twilio(accountSid, authToken);

app.use(express.static(path.join(__dirname, '../react-client/dist')));
app.use(bodyParser.json());
app.use(cors())




/**
 * Retrieves all forms from the database
 * @param {Object} req, res
 */

app.get('/forms', (req, res) => {
    database.selectAll((err, data) => {
        if (err) {
            res.sendStatus(500);
        } else {
            console.log(data)
            res.send(data);
        }
    });
});


/**
 * Saves a form to the database
 * @param {Object} req, res
 */

app.post('/saveForms', (req, res) => {
    database.saveForm(req.body)
    res.send()
})



/**
 * Saves an admin to the database
 * @param {Object} req, res
 */

app.post('/saveAdmin', (req, res) => {
    database.saveAdmin(req.body)
    res.send()
})


app.get('/getAdmin', (req, res) => {
    const { password } = req.body
    const token = jwt.sign({ foo: 'bar' }, 'shhhhh')
    console.log(token);
    database.selectAdmin({ password }, (err, data) => {
        if (err) {
            res.sendStatus(500);
        } else {

            console.log(`This is req.body ${req.body}`)
            res.send({token})
        }
    })
    
})


/**
 * Retrieves all phone numbers from the database and sends a 
 * @param {Object} req, res
 */

app.post('/getNumbers', (req, res) => {
    // If I had more time
    // Pull out Authorization header
    // Parse token from Authorization header
    // Pass token into jwt.verify()
    // If successful -> execute Twilio code
    // else -> return res.status(401).send('Unauthorized')
    database.selectNumbers((err, data) => {
        if (err) {
            res.sendStatus(500);
        } else {
            res.send(data);
            // Should definitely be in a helper method I know
            data.map((number) => {
                console.log(number)
                client.messages.create({
                    body: req.body.message,
                    to: number,  // Text this number
                    from: twilioNumber // From a valid Twilio number
                })
                .then((message) => console.log(message.sid));
            })
        }
    });
});


app.listen(port, () => {
    console.log(`listening on port ${port}!`);
});

