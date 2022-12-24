
const express = require('express');
const path = require('path'); //we dont require to install path. because its in-build in node.
const bodyParser = require('body-parser');
// const { application } = require('express');
const port = 8000;

const db = require('./config/mongoose');
const Contact = require("./modules/contact"); 
const app = express();


//console.log(app);

contactList = [
    {
        name : "Rushikesh",
        phone:1234567890
    },
    {
        name:"Tony",
        phone:234589167
    },
    {
        name : "Caps",
        phone : 123123112
    }
];


app.set('view engine','ejs'); // setting view engine of app to be ejs
//console.log(__dirname + '/views');
app.set('views', path.join(__dirname,'views'));// setting the path from where views will bs rendered
//it enables the middleware to parse data from server(to decode the data parser helps us)
app.use(bodyParser.urlencoded({extended: false}));

app.use(function(req,res,next){
    console.log("Hi, from middleware 2");
    next();
});

//enables static files accessible to the project
app.use(express.static("assets"));

//for home URL
app.get('/', function(req, res){ 
    //This is request from client
    //rendering the view below

    //get data from database
    Contact.find({}, function(err,contact){
        if(err){
            console.log("Error while fetch the contact");
            return;
        }
        // console.log("This is fetched data :: ",contact);
        res.render('home',{
            title : "My Contact List",
            contact_List : contact
        });  //second argument is global "locals" object accessible to all views 
        return;
    });
    
});

//this function will be called when user hits for create-contact action
app.post('/create-contact', function(req, res){
    // console.log(req);
    //data sits in req.body object
    // contactList.push({
    //     name : req.body.name,
    //     phone : req.body.phone
    // });
    
    //temporary storage
    // contactList.push(req.body); //req.body has same properties as in contactList
    // return res.redirect('back'); //back redirect us to same page


    //database storage
    Contact.create({
        name : req.body.name,
        phone : req.body.phone
    },function(err, newContact){
        if(err){
            console.log('Error in creating contact');
            return;
        }
        console.log("***Contact Added***", newContact);
        return res.redirect("back");
    });
});

// for profile URL
app.get('/profile', function(req, res){ 
    //This is request from client


    //rendering the view below
    res.render('profile',{
        title : "My Profile",
        name : "Rushikesh"
    });  //second argument is global "locals" object accessible to all views 
    return;
});

//for deleting the contact
app.get("/delete-contact/", function(req,res){
    // console.log(req.query);
    let id = req.query.id;
    console.log('Id is ',id);
    Contact.findByIdAndDelete(id, function(err){//this method identifies by ID and delete it.
        if(err)//failure
        {
            console.log("Error in deletion", err);
            return;
        }
        return res.redirect("back");//successfully deleted then redirect to same page
    });




    // let i = 0;
   

    // for(index of contactList)
    // {
    //     // console.log("reached to 80", contactList)
    //     if(index.phone == req.query.phone)
    //     {

    //         //  console.log(index.name, i);
    //         break;
    //     }
    //     i++;
    // }
    // contactList.splice(i,1);
    // res.redirect("back");

});

app.listen(port, function(err){

    //When server starts listening on port
    if(err)
    {
        console.log("Error in the server " + err);
        return;
    }
    console.log("Yup !! my express server is running on port "+port);
 
});