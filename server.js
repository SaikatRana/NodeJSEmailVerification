var express=require('express');
var app=express();
var nodemailer = require("nodemailer");


var smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "< ENTER GMAIL ACCOUNT >",
        pass: "< PASSWORD >"
    }
});

var rand,mailOptions,host,link;

app.get('/',function(req,res){
    res.sendfile('index.html');
});

app.get('/send',function(req,res){
    rand=Math.floor((Math.random() * 10) + 17);
    host=req.get('host');
    link="http://"+req.get('host')+"/verify?id="+rand;
    mailOptions={
        to : req.query.to,
        subject : "Please confirm your Email account",
        html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>"
    }
    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function(error, response){
     if(error){
            console.log(error);
        res.end("error");
     }else{
            console.log("Message sent: " + response.message);
        res.end("sent");
         }
});
});

app.get('/verify',function(req,res){
console.log(req.protocol+":/"+req.get('host'));
if((req.protocol+"://"+req.get('host'))==("http://"+host))
{
    if(req.query.id==rand)
    {
        console.log("email is verified");
        res.end("<h1>Email "+mailOptions.to+" is been Successfully verified");
    }
    else
    {
        console.log("email is not verified");
        res.end("<h1>Check Request</h1>");
    }
}
else
{
    res.end("<h1>The request comming from other source</h1>");
}
});


app.listen(9999,function(){
    console.log("Server Running on Port 9999");
});