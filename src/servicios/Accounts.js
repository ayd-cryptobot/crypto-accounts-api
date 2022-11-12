const express = require('express')
const endpoints = express.Router()

const axios = require('axios')
//database    
var mysql = require('mysql2');
var mysqlpro = require('mysql2/promise');

var con =  mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "sys"
});

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


    var con = await mysqlpro.createConnection({
      host: "localhost",
      user: "root",
      password: "root",
      database: "sys"
    });
    try {
     // con.connect(async function (err) {
        //if(err)catchDuplicateFunction(res, err)
        console.log("Connected!");

        var sql = "INSERT INTO user (telegram_id,first_name, last_name,  username,  rol) VALUES ('" + telegram_id + "','" + first_name + "','" + last_name + "','" + username + "','" + rol + "');";
        const result =await con.query(sql) 
         //if(err)catchDuplicateFunction(res, err)
        console.log("1 record inserted");
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


  username = id.username;
  password = id.password;





  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");

    var sql = "SELECT password FROM  user WHERE(username='" + username + "')";
    con.query(sql, function (err, result) {
      if (err) throw err;
      if (result == password) {
        res.json({
          "message": "log-in"
        })
        filter = JSON.stringify(true);
        publishMessage(true);
      }
      else {
        res.json({ "mensaje": "contraseña o usuario incorrecto" })
        filter = JSON.stringify(false);
        publishMessage(false);
      }
      console.log("1 record inserted");
    });
  });
  res.end;

})
endpoints.post('/accounts/edit', async (req, res) => {
  console.log(req.body, "este es el body")


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
  first_name = id.first_name;
  last_name = id.last_name;
  email = id.email;
  username = id.username;
  telegram_id = id.telegram_id;





  con.connect(function (err) {
    if (err) throw err;


    var sql = "UPDATE user SET first_name='" + first_name + "', last_name='" + last_name + "', email='" + email + "', username='" + username + "' WHERE(telegram_id='" + telegram_id + "');";
    console.log(sql);
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record edited");
      res.json({ "message": "1 record edited" });
    });
  });
  res.end;


})

endpoints.post('/accounts/change-password', async (req, res) => {
  console.log(req.body, "este es el body")


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

  telegram_id = id.telegram_id;

  password = id.password;




  con.connect(function (err) {
    if (err) throw err;


    var sql = "UPDATE user SET  password='" + password + "' WHERE(telegram_id='" + telegram_id + "');";
    console.log(sql);
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
      res.json({ "message": "1 record edited" });
    });
  });
  res.end;


})

endpoints.post('/accounts/delete/:telegram_id', async (req, res) => {
  console.log(req.body, "este es el body")

  let telegram_id = req.params.telegram_id

  //const buff = Buffer.from(req.body.message.data, 'base64');
  //const buff = Buffer.from(req.body.message.data, 'base64');

  //const id=buff.toString('utf-8')



  con.connect(function (err) {
    if (err) throw err;


    var sql = "DELETE from user  WHERE(telegram_id='" + telegram_id + "');";
    console.log(sql);
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
      res.json({ "message": "1 record deleted" });
    });
  });
  res.end;


})


module.exports = endpoints