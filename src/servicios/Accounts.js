const express = require('express')
const endpoints = express.Router()

const axios = require('axios')
//database    
var mysql = require('mysql2');
var mysqlpro = require('mysql2/promise');


async function PromiseConnection() {
  con = await mysqlpro.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE
  });

}


//account variables
var first_name;
var last_name;
var email;
var username;
var telegram_id;
var password;
var rol;

endpoints.post('/accounts/create', async (req, res) => {
  console.log(req.body, "este es el body")
 
  try {
    //const buff = Buffer.from(req.body.message.data, 'base64');
    //const buff = Buffer.from(req.body.message.data, 'base64');
    const buff = req.body;
    //const id=buff.toString('utf-8')
    const id = buff;
    //console.log(JSON.parse(id));
    //  first_name=JSON.parse(id).first_name;
    //  last_name=JSON.parse(id).last_name;
    //  email=JSON.parse(id).email;
    //  username=JSON.parse(id).username;
    //  telegram_id=JSON.parse(id).chat_id;
    //  password=JSON.parse(id).password;
    //  rol=JSON.parse(id).rol;
    first_name = id.firstName;
    last_name = id.lastName;
    username = id.username;
    telegram_id = id.telegramID;
    rol = "cliente";


    var con = await PromiseConnection();
 
     // con.connect(async function (err) {
        //if(err)catchDuplicateFunction(res, err)
        console.log("Connected!");

        var sql = "INSERT INTO user (telegram_id,first_name, last_name,  username,  rol) VALUES ('" + telegram_id + "','" + first_name + "','" + last_name + "','" + username + "','" + rol + "');";
        const result =await con.query(sql);
         //if(err)catchDuplicateFunction(res, err)
        console.log("1 record inserted");
        const pubSubMessage={
          "telegram_user_id":telegram_id,
          "operation_type":"create",
          "first_name":first_name,
          "last_name":last_name,
          "username":username,
          "email":""
          }
                    
       await  publishMessage(JSON.stringify(pubSubMessage))
          res.json({ "message": "1 record inserted" });
          res.end
        
     // });

    
  } catch (err) {

    console.log(err)
   
  res.status(208).json({
    message: "invalid account ",
    status: 208
  })

  res.end;
  }

})



endpoints.post('/accounts/login', async (req, res) => {
  console.log(req.body, "este es el body")
try{
  //const buff = Buffer.from(req.body.message.data, 'base64');
  //const buff = Buffer.from(req.body.message.data, 'base64');
  const buff = req.body;
  //const id=buff.toString('utf-8')
  const id = buff;
  //console.log(JSON.parse(id));
  //  first_name=JSON.parse(id).first_name;
  //  last_name=JSON.parse(id).last_name;
  //  email=JSON.parse(id).email;
  //  username=JSON.parse(id).username;
  //  telegram_id=JSON.parse(id).chat_id;
  //  password=JSON.parse(id).password;
  //  rol=JSON.parse(id).rol;
  var username = id.username;
 var  password = id.password;
  var con = await PromiseConnection();
    console.log("Connected!");

    var sql = "SELECT password FROM  user WHERE(username='"+username+"')";
    console.log(sql);
    const result =await con.query(sql);
    const rtaPassword=result[0][0].password
    console.log(rtaPassword);

if(rtaPassword){
      if (rtaPassword == password) {
        res.json({
          "message": "log-in"
        })
        res.end;
      }
      else {
        res.json({
          "message": "invalid password"
        })
        res.end;
      }
}
else{
  res.json({
    "message": "account doesnt exist"
  })
  res.end;
}

    }
    catch(err){
console.log(err)
res.json("invalid account");
res.end;
    }
})

endpoints.post('/accounts/edit', async (req, res) => {
  console.log(req.body, "este es el body")

try{
  //const buff = Buffer.from(req.body.message.data, 'base64');
  //const buff = Buffer.from(req.body.message.data, 'base64');
  const buff = req.body;
  //const id=buff.toString('utf-8')
  const id = buff;
  //console.log(JSON.parse(id));
  //  first_name=JSON.parse(id).first_name;
  //  last_name=JSON.parse(id).last_name;
  //  email=JSON.parse(id).email;
  //  username=JSON.parse(id).username;
  //  telegram_id=JSON.parse(id).chat_id;
  //  password=JSON.parse(id).password;
  //  rol=JSON.parse(id).rol;
  first_name = id.firstname;
  last_name = id.lastname;
  email = id.email;
  username = id.username;
  telegram_id = id.telegramID;
  password=id.password;
  var con = await PromiseConnection();


    var sql = "UPDATE user SET first_name='" + first_name + "', last_name='" + last_name + "', email='" + email +  "', password='" + password + "' WHERE(telegram_id='" + telegram_id + "');";
    console.log(sql);
    const result =await con.query(sql);
      console.log("1 record updated");
      const pubSubMessage={
        "telegram_user_id":telegram_id,
        "operation_type":"update",
        "first_name":first_name,
        "last_name":last_name,
        "username":username,
        "email":email
        }
                  
     await  publishMessage(JSON.stringify(pubSubMessage))
      res.json({ "message": "1 record edited" });

  res.end;
}
catch(err){
console.log(err)
res.end
}
})
endpoints.get('/accounts/consult/:telegramID', async (req, res) => {
  

try{
  let telegram_id = req.params.telegramID
  console.log(telegram_id, "este es el body")


  var con = await PromiseConnection();


    var sql = "SELECT telegram_id, first_name,last_name, email, username, password FROM user   WHERE(telegram_id='" + telegram_id + "');";
    console.log(sql);
    var result =await con.query(sql);
    result=result[0][0]
      console.log("record sended");

     const Message= await
     {
      "telegramID":result.telegram_id,
      "firstname":result.first_name,
      "lastname":result.last_name,
      "username":result.username,
      "email":result.email,
      "password":result.password
      }
      console.log(Message);
      res.json(Message);

  res.end;
}
catch(err){
console.log(err)
res.json("error on data");
res.end
}
})

endpoints.delete('/accounts/delete/:telegramID', async (req, res) => {
  console.log(req.body, "este es el body")
try{
  let telegram_id = req.params.telegramID

  //const buff = Buffer.from(req.body.message.data, 'base64');
  //const buff = Buffer.from(req.body.message.data, 'base64');

  //const id=buff.toString('utf-8')


  var con = await PromiseConnection();


    var sql = "DELETE from user  WHERE(telegram_id='" + telegram_id + "');";
    console.log(sql);
    const result =await con.query(sql);
      console.log("1 record inserted");
      const pubSubMessage={
        "telegram_user_id":telegram_id,
        "operation_type":"delete"
        }
                  
     await  publishMessage(JSON.stringify(pubSubMessage))
      res.json({ "message": "1 record deleted" });
  res.end;
}
catch(err){
  console.log(err)
  res.json({ "message": "wrong direction" });
  res.end
}

})
 //gcloud auth application-default login   
/**
 * TODO(developer): Uncomment these variables before running the sample.
 */
// const topicNameOrId = 'YOUR_TOPIC_NAME_OR_ID';
// const data = JSON.stringify({foo: 'bar'});

// Imports the Google Cloud client library
const {PubSub} = require('@google-cloud/pubsub');

// Creates a client; cache this for further use
const pubSubClient = new PubSub();
GOOGLE_APPLICATION_CREDENTIALS = '.\cryptobot-369523'
async function publishMessage(messaging) {
  // Publishes the message as a string, e.g. "Hello, world!" or JSON.stringify(someObject)
  const dataBuffer = Buffer.from(messaging);

  try {
    const messageId = await pubSubClient
      .topic("projects/cryptobot-369523/topics/accounts-events-topic")
      .publishMessage({data:dataBuffer});
    console.log(`Message ${messageId} published.`);
  } catch (error) {
    console.error(`Received error while publishing: ${error.message}`);
    process.exitCode = 1;
  }
}

module.exports = endpoints