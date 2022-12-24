// require the library

const mongoose = require('mongoose');

//connect to the database (i.e connecting ODM to mongo)
mongoose.connect('mongodb://localhost/contact_list_db');

//acquire the connection (to check if it is successfull.)
const db = mongoose.connection;

//if there is error in connection
db.on('error', console.error.bind(console, 'error conneting to db'));

//up and running fine then print message
db.once('open',function(){
    console.log("Successfully connected to the database");
});
// module.exports = db;