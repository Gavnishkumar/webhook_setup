const express = require('express');
const body_parser = require('body-parser');
const bodyParser = require('body-parser');
const { default: axios } = require('axios');
require('dotenv').config();
const app = express().use(body_parser.json());
const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log("server started at 8000");
})
// This is get request from webhook to our server to verify this is the correct server that webhook have to communicate.
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
app.post('/webhook', (req,res) => {
    let body_param = req.body;
    const verify_token = process.env.TOKEN;
    console.log("received")
    if (body_param.object) {
        if (body_param.entry &&
            body_param.entry[0].changes &&
            body_param.entry[0].changes[0].value.messages &&
            body_param.entry[0].changes[0].value.messages[0]) {
            let phone_no_id = body_param.entry[0].changes[0].value.metadata.phone_number_id;
            let from = body_param.entry[0].changes[0].value.messages[0].from;
            let msg_body = body_param.entry[0].changes[0].value.messages[0].text.body;
            let data = JSON.stringify({
                "messaging_product": "whatsapp",
                "recipient_type": "individual",
                "to": "+"+from,
                "type": "text",
                "text": {
                    "preview_url": false,
                    "body": "hii "+from +" is sending this message in reply of "+msg_body
                }
            });
            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'https://graph.facebook.com/v17.0/137613659416752/messages?Content-Type=application/json',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer EAALlzWygEW0BO6krSwDhwke5hEDFSZCXNrz9bv6RYIvMtWhBTMU5PAPSj6k0uE3X9Wi2yKPhsqainZCjoEnIs7sFUXSrGMWtEbkOzsr9oJ8ZBSPei89TuWc76odP27jNKERr27awW4ozmWRzZBB90Uns97KrIEUuOeaG7ovhzsyIT5EyOAWZCfEWAyrEhZB19mVh51KesPaxNm9a2Viy0ZD'
                },
                data: data
            };

            axios.request(config)
                .then((response) => {
                    console.log("msg send ");
                })
                .catch((error) => {
                    console.log(error);
                });
                res.sendStatus(200)
        } else {
            res.status(404);
        }
    }
})
app.get('/', (req, res) => {
    res.status(200).send("my server working");
})
