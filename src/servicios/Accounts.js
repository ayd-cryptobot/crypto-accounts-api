const express = require('express')
const endpoints = express.Router()
const axios = require('axios')
const { response } = require('../server')
const app = express();
module.exports = endpoints

 //database    
var mysql = require('mysql2');

var con = mysql.createConnection({
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

endpoints.post('/accounts/create',async(req,res)=> {
    console.log(req.body,"este es el body")


    //const buff = Buffer.from(req.body.message.data, 'base64');
    //const buff = Buffer.from(req.body.message.data, 'base64');
    const buff = req.body;
    //const id=buff.toString('utf-8')
 const id=buff;
//console.log(JSON.parse(id));
    //  first_name=JSON.parse(id).first_name;
    //  last_name=JSON.parse(id).last_name;
    //  email=JSON.parse(id).email;
    //  username=JSON.parse(id).username;
    //  telegram_id=JSON.parse(id).chat_id;
    //  password=JSON.parse(id).password;
    //  rol=JSON.parse(id).rol;
     first_name=id.first_name;
     last_name=id.last_name;
     email=id.email;
     username=id.username;
     telegram_id=id.telegram_id;
     password=id.password;
     rol=id.rol;



     con.connect(function(err) {
      if (err) throw err;
      console.log("Connected!");

      var sql = "INSERT INTO accounts (telegram_id,first_name, last_name, email, username,  password, rol) VALUES ('"+telegram_id+"','"+first_name+"','"+ last_name+"','"+ email+"','"+ username+"','" + password+"','"+ rol+"');";
      con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
        res.json({"message":"1 record inserted"});
      });
    });
    res.end;


})

endpoints.post('/accounts/login',async(req,res)=> {
  console.log(req.body,"este es el body")


  //const buff = Buffer.from(req.body.message.data, 'base64');
  //const buff = Buffer.from(req.body.message.data, 'base64');
  const buff = req.body;
  //const id=buff.toString('utf-8')
const id=buff;
//console.log(JSON.parse(id));
  //  first_name=JSON.parse(id).first_name;
  //  last_name=JSON.parse(id).last_name;
  //  email=JSON.parse(id).email;
  //  username=JSON.parse(id).username;
  //  telegram_id=JSON.parse(id).chat_id;
  //  password=JSON.parse(id).password;
  //  rol=JSON.parse(id).rol;


   username=id.username;
   telegram_id=id.telegram_id;
   password=id.password;
   rol=id.rol;

if(rol=="admin"){


   con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");

    var sql = "SELECT password FROM  accounts WHERE(username='"+username+"')" ;
    con.query(sql, function (err, result) {
      if (err) throw err;
      if(result==password){
      res.json({
        "message":"log-in"
 })
 filter =JSON.stringify(true);
 publishMessage(true);
    }
    else{
    res.json({"mensaje":"contraseña o usuario incorrecto"})
    filter =JSON.stringify(false);
 publishMessage(false);
  }
      console.log("1 record inserted");
    });
  });
  res.end;
}
else
console.log("acceso no autorizado");

})
endpoints.post('/accounts/edit',async(req,res)=> {
  console.log(req.body,"este es el body")


  //const buff = Buffer.from(req.body.message.data, 'base64');
  //const buff = Buffer.from(req.body.message.data, 'base64');
  const buff = req.body;
  //const id=buff.toString('utf-8')
const id=buff;
//console.log(JSON.parse(id));
  //  first_name=JSON.parse(id).first_name;
  //  last_name=JSON.parse(id).last_name;
  //  email=JSON.parse(id).email;
  //  username=JSON.parse(id).username;
  //  telegram_id=JSON.parse(id).chat_id;
  //  password=JSON.parse(id).password;
  //  rol=JSON.parse(id).rol;
   first_name=id.first_name;
   last_name=id.last_name;
   email=id.email;
   username=id.username;
   telegram_id=id.telegram_id;
   password=id.password;
   rol=id.rol;

   


   con.connect(function(err) {
    if (err) throw err;
   

    var sql = "UPDATE accounts SET first_name='"+ first_name+"', last_name='"+ last_name+"', email='"+ email+"', username='"+ username+"', password='"+password+"', rol='"+ rol+"' WHERE(telegram_id='"+telegram_id+"');";
    console.log(sql);
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record edited");
      res.json({"message":"1 record edited"});
    });
  });
  res.end;


})

endpoints.post('/accounts/change-password',async(req,res)=> {
  console.log(req.body,"este es el body")


  //const buff = Buffer.from(req.body.message.data, 'base64');
  //const buff = Buffer.from(req.body.message.data, 'base64');
  const buff = req.body;
  //const id=buff.toString('utf-8')
const id=buff;
//console.log(JSON.parse(id));
  //  first_name=JSON.parse(id).first_name;
  //  last_name=JSON.parse(id).last_name;
  //  email=JSON.parse(id).email;
  //  username=JSON.parse(id).username;
  //  telegram_id=JSON.parse(id).chat_id;
  //  password=JSON.parse(id).password;
  //  rol=JSON.parse(id).rol;

   telegram_id=id.telegram_id;
   email=id.email;
   password=id.password;

   


   con.connect(function(err) {
    if (err) throw err;
   

    var sql = "UPDATE accounts SET  password='"+password+"' WHERE(email='"+email+"');";
    console.log(sql);
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
      res.json({"message":"1 record edited"});
    });
  });
  res.end;


})

endpoints.post('/accounts/delete',async(req,res)=> {
  console.log(req.body,"este es el body")


  //const buff = Buffer.from(req.body.message.data, 'base64');
  //const buff = Buffer.from(req.body.message.data, 'base64');
  const buff = req.body;
  //const id=buff.toString('utf-8')
const id=buff;

telegram_id=id.telegram_id;


   con.connect(function(err) {
    if (err) throw err;
   

    var sql = "DELETE from accounts  WHERE(telegram_id='"+telegram_id+"');";
    console.log(sql);
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
      res.json({"message":"1 record deleted"});
    });
  });
  res.end;


})

