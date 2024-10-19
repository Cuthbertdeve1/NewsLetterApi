const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const request = require('request');

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('assets'));
app.get('/signup',(req,res)=>{
    res.sendFile(__dirname + "/signup.html");
})

app.post('/signup',(req,res)=>{
  const email = req.body.email;
    const name = req.body.fname;
      const surname = req.body.lname;
        const phone = req.body.phone;
        //console.log(email, name,surname,phone);
       // res.send(email, name,surname,phone);
         
        // https.get(url,response=>{

        // })
        const data = {
          members:[{
            email_address:email,
            status: "subscribed",
            merge_fields:{
              FNAME: name,
              LNAME: surname,
              PHONE: phone
            }

          }]
        };
       
        const jsonData = JSON.stringify(data);
        const url = ' https://us9.api.mailchimp.com/3.0/lists/916a0c3c33';
        //https://<dc>.api.mailchimp.com/3.0/

        const option={
          method:"POST",
          auth:"cazzy:6d3c2f716219f3063f5df0ce3df2f60d-us9"
        }
      const request =  https.request(url,option, (response)=>{
        if(response.statusCode === 200){
          res.sendFile(__dirname +'/success.html');
        }else{
          res.sendFile(__dirname +'/failure.html');
        }
          response.on("data",data=>{
            console.log(JSON.parse(data));
            

          })
        })
        request.write(jsonData);
        request.end();
})
app.post('/failure',(req,res)=>{
  res.redirect('/signup');
})

app.listen('3001',() =>{
console.log('server is running on port 3001');

})
// mailChimp API Key 6d3c2f716219f3063f5df0ce3df2f60d-us9 
//Audience ID  916a0c3c33