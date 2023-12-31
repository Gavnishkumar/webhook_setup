const express = require('express');
const body_parser = require('body-parser');
const bodyParser = require('body-parser');
const { default: axios } = require('axios');
const msg = require('./messages.json');
const connectDB = require('./config/db');
const { logicFuntion, indexToQuestion } = require('./logic')
const Userchat = require('./model/UserChat');
require('dotenv').config();
const app = express().use(body_parser.json());
const PORT = process.env.PORT || 8000;
// connecting database
connectDB();
app.listen(PORT, () => {
    console.log("server started at 8000");
})
// This is get request from webhook to our server to verify this is the correct server that webhook have to communicate.
let index = 0;
app.get("/webhook", (req, res) => {
    let mode = req.query["hub.mode"];
    let challenge = req.query["hub.challenge"];
    let token = req.query["hub.verify_token"];
    console.log(challenge);
    const mytoken = process.env.MYTOKEN;
    if (mode && token) {
        if (mode === "subscribe" && token === mytoken) {
            res.status(200).send(challenge);
        }
        else {
            res.status(403);
        }
    }
});
// This is post request from webhook when webhook get a notification of received messages.
app.post('/webhook', async (req, res) => {
    let body_param = req.body;
    let sentResponse=false;

    if (body_param.object) {
        if (body_param.entry &&
            body_param.entry[0].changes &&
            body_param.entry[0].changes[0].value.messages &&
            body_param.entry[0].changes[0].value.messages[0]) {
                let phone_no_id = body_param.entry[0].changes[0].value.metadata.phone_number_id;
                let from = body_param.entry[0].changes[0].value.messages[0].from;
                let msg_body = body_param.entry[0].changes[0].value.messages[0].text.body;
                const permanent_token='Bearer ' + process.env.TOKEN;
                const header={
                    'Content-Type': 'application/json',
                    'Authorization': permanent_token
                }
                if(msg_body.toLowerCase()==="restart"){
                    let dlt = await Userchat.deleteOne({phoneno:from});
                }
            let user = await Userchat.findOne({ phoneno: from });
            let tosend;
            if (!user) {
                const chat = new Userchat({
                    "phoneno": from,
                    "index": 0,
                    "anyHarassment": '',
                    "safe": 'yes',
                    "organization": '',
                    "name": '',
                    "location": '',
                    "contactNumber": '',
                    "email": '',
                    "employeeOrStudentId": '',
                    "isEthnicMinority": '',
                    "gender": '',
                    "assaulted": '',
                    "oneOffIncident": '',
                    "dateOfIncident": '',
                    "nameOfAssaulter": '',
                    "reportAnonymously": '',
                    "reportToManagement": '',
                    "locationOfIncident": ''
                })
                chat.save();
                tosend = 0;
                msg[0].to = "+" + from
                let data = JSON.stringify(msg[0]);
                let config = {
                    method: 'post',
                    maxBodyLength: Infinity,
                    headers: header,
                    url: 'https://graph.facebook.com/v17.0/137613659416752/messages?Content-Type=application/json',
                    data: data
                };
                await axios.request(config)
                    .then((response) => {
                       
                        sentResponse=true;
                    })
                    .catch((error) => {
                        console.log(error);
                        sentResponse= false || sentResponse;
                    });
                // res.sendStatus(200);
            }
            else {

                tosend = logicFuntion(user.index, msg_body);
                if (tosend === 19 || tosend === 20 || tosend === 21 || tosend === 22 || tosend === 23 || tosend===24) {
                    let msgtosend = {
                        "messaging_product": "whatsapp",
                        "recipient_type": "individual",
                        "to": "+" + from,
                        "type": "text",
                        "text": msg[tosend].text
                    }

                    let data = JSON.stringify(msgtosend);
                    let config = {
                        method: 'post',
                        maxBodyLength: Infinity,
                        headers: header,
                        url: 'https://graph.facebook.com/v17.0/137613659416752/messages?Content-Type=application/json',
                        data: data
                    };
                    await axios.request(config)
                        .then((response) => {
                            sentResponse=true;
                            // res.sendStatus(200);
                        })
                        .catch((error) => {
                            console.log(error);
                            // res.sendStatus(404);
                            sentResponse=sentResponse || false;
                        });
                    tosend = user.index;
                }
                let fieldToUpdate = indexToQuestion(user.index)
               
                let update = await Userchat.updateMany(
                    { phoneno: from },
                    {
                        $set: {
                            [fieldToUpdate]: msg_body,
                            index: tosend
                        }
                    }
                );
                let msgtosend = {
                    "messaging_product": "whatsapp",
                    "recipient_type": "individual",
                    "to": "+" + from,
                    "type": "text",
                    "text": msg[tosend].text
                }

                let data = JSON.stringify(msgtosend);
                let config = {
                    method: 'post',
                    maxBodyLength: Infinity,
                    headers: header,
                    url: 'https://graph.facebook.com/v17.0/137613659416752/messages?Content-Type=application/json',
                    data: data
                };
                await axios.request(config)
                    .then((response) => {

                        sentResponse=true;
                    })
                    .catch((error) => {
                        sentResponse= sentResponse || false;
                        console.log(error);
                    });
                // res.sendStatus(200);
                if(sentResponse){
                    res.sendStatus(200);
                }
                else
                {
                    res.sendStatus(404);
                }
            }
        } else {
            res.sendStatus(404);
        }
    }
})
app.get('/', (req, res) => {
    res.status(200).send("my server working");
})
