const express = require('express')
const app = express();
const port = process.env.PORT || 8000
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const sendmail = require('sendmail')();


app.use(bodyParser.urlencoded({extended: false}))

var transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // use SSL,
  auth: {
    user: 'hj6249314@gmail.com',
    pass: 'hamza@786'
  }
});

app.use(express.static(__dirname + '/src'));

app.get("/",(req,res)=> {
    res.sendFile(__dirname +"/src/index.html");
})

app.post("/send/email",(req,res)=> {
    const { name, email, subject, body } = req.body
    var mailOptions = {
        from: 'hj6249314@gmail.com',
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