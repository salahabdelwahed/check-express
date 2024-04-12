const express = require('express');
const nodemailer = require('nodemailer');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();


app.use(bodyParser.urlencoded({extended:false}));
app.get('/',(req, res) =>{
    fs.readFile("./index.html",(err, data) =>{
        return res.end(data)
    })
})
app.get('/contact',(req, res) =>{
    fs.readFile("./contact.html",(err, data) =>{
        return res.end(data)
    })
});

//nodemailer 
app.post("/contact",(req, res) =>{
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: "abdelwahedsalaah10@gmail.com", // Adresse e-mail Ethereal Email
          pass: "cuhk gquj xesz heop",   // Mot de passe Ethereal Email
        },
    });

    const{Email,Subject,text}= req.body;
    const option = {
        from: 'abdelwahedsalaah10@gmail.com', // Adresse expéditeur
        to: Email,          // Adresse destinataire
        subject: Subject,                          // Objet de l'e-mail
        text: text,                         // Corps de texte de l'e-mail                 // Corps HTML de l'e-mail
    };

    transporter.sendMail(option,(err,res)=>{
        if (err) {
        console.error(err);
        }else {
        console.log(res);
        }
    })

})



app.listen(3000,(err)=>{
    if (err) {
        console.error(err);}
    else {
        console.log("server is running");}


})