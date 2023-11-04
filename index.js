const express= require('express');
const body_parser=require('body-parser');
const bodyParser = require('body-parser');
const { default: axios } = require('axios');
require('dotenv').config();
const app= express().use(body_parser.json());
const PORT=process.env.PORT || 8000
app.listen(PORT,()=>{
    console.log("server started at 8000");
})
app.get("/webhook",(req,res)=>{
    let mode=req.query["hub.mode"];
    let challenge=req.query["hub.challenge"];
    let token=req.query["hub.verify_token"]; 
    console.log(challenge);
    const mytoken=process.env.MYTOKEN;
    if(mode && token){
        if(mode==="subscribe" && token===mytoken){
            res.status(200).send(challenge);
        }
        else{
            res.status(403);
        }
    }
});
app.post('/webhook',(req,res)=>{
    let body_param=req.body;
    const verify_token=process.env.TOKEN;
    console.log(JSON.stringify(body_param,null,2));
    if(body_param.object){
        if(body_param.entry && body_param.entry[0].changes && body_param.entry[0].changes[0].value.messages && body_param.entry[0].changes[0].value.messages[0]){
            let phone_no_id=body_param.entry[0].changes[0].value.phone_number_id;
            let from = body_param.entry[0].value.messages[0].from;
            let msg_body=body_param.entry[0].changes[0].value.messages[0].text.body;
            console.log(msg_body);
            console.log("https://graph.facebook.com/v13.0/"+phone_no_id+"/message?access_token"+verify_token)
            axios({
                method:"POST",
                url:"https://graph.facebook.com/v13.0/"+phone_no_id+"/message?access_token"+verify_token,
                
                data:{
                    messaging_product:"whatsapp",
                    to:from,
                    text:{
                        body:"hii... I'm Gavnish"
                    }
                },
                headers:{
                    "Content-Type":"application/json"
                }
            });
            res.status(200);
        }else{
            res.status(404);
        }
    }
})
app.get('/',(req,res)=>{
    res.status(200).send("my server working");
})
