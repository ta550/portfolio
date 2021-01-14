const express = require('express')
const app = express();
const port = process.env.PORT || 3000
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');



app.use(bodyParser.urlencoded({extended: false}))

var transporter = nodemailer.createTransport({
  service: 'Gmail',
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

app.listen(port)