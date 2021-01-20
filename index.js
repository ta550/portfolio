const express = require('express')
const app = express();
const port = process.env.PORT || 8000
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const sendmail = require('sendmail')();


app.use(bodyParser.urlencoded({extended: false}))

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
  }
});

app.use(express.static(__dirname + '/src'));

app.get("/",(req,res)=> {
    res.sendFile(__dirname +"/src/index.html");
})

app.post("/send/email",(req,res)=> {
    const { name, email, subject, body } = req.body
    var mailOptions = {
        from: process.env.EMAIL,
        to: 'azeztaimur7@gmail.com',
        subject: subject,
        text: `Name: ${name} \n from: ${email} \n body: ${body}`
    };
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          res.redirect("/")
        }
    })
});


app.get('*', (req,res)=> {
    res.json({"Message": "Page Not Found"})
})

app.listen(port, () => console.log(`server is running on http://localhost:${port}`))