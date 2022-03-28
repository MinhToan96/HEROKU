const mongoose = require('mongoose');
//const url = "mongodb://localhost:27017/EmployeeDB";
const url = "mongodb+srv://minhtoan:UoRW8uVoLZVr2LbJ@cluster0.1oden.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
mongoose.connect(url,{useNewUrlParser:true},(err) => {
    if(!err){ console.log("MongoDB Connection Succeeded");}
    else{
        console.log("An Error Occured");
    } 
})

require('./employee.model');
