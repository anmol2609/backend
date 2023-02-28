let express = require('express');
let cors = require('cors');
let bodyParser = require('body-parser');
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey("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")
// const nodemailer = require("nodemailer");

// let transporter = nodemailer.createTransport({
//    host: 'smtp.sendgrid.net',
//    port: 465,
//    auth: {
//        user: "apikey",
//        pass: "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"
//    }
// })
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
extended: true
}));

app.use(cors());
app.use('/hi',(req, res, next)=>{
  const msg = {
    to: 'anmoldwivedi.jimkanpur@gmail.com', // Change to your recipient
    from: 'anmoldwivedi145@gmail.com', // Change to your verified sender
    //from: 'anmoldwivedi.jimkanpur@gmail.com', // Change to your verified sender
    subject: 'this is my subject',
    text: 'this is my subject',
    html: '<strong>this is my html hi</strong>',
  }
  sgMail
    .send(msg)
    .then((resa) => {
      //res.status(404).send(res)
      console.log('Email sent')
    })
    .catch((error) => {
      console.error(error)
    })
    // transporter.sendMail({
    //     from: "anmoldwivedi145@gmail.com", // verified sender email
    //     to: "anmoldwivedi.jimkanpur@gmail.com", // recipient email
    //     subject: "Test message subject", // Subject line
    //     text: "Hello world!z", // plain text body
    //     html: "<b>Hello world!</b>", // html body
    //   }, function(error, info){
    //     if (error) {
    //       console.log(error);
    //     } else {
    //       console.log('Email sent: ' + info.response);
    //     }
    //   });
})


// PORT
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
console.log('Connected to port ' + port)
})

// 404 Error
app.use((req, res, next) => {
res.status(404).send('Error 404!')
});

app.use(function (err, req, res, next) {
console.error(err.message);
if (!err.statusCode) err.statusCode = 500;
res.status(err.statusCode).send(err.message);
});
