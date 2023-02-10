const mongoose = require("mongoose");

const crypto = require('crypto');
const uuidv1 = require('uuid').v1;
const     ObjectId =  mongoose.Schema.ObjectId;

const EmployeeSchema = new mongoose.Schema({
  
    username : {
        type : String,
        required : true,
    }
    ,
    hashed_password : {
        type : String ,
        required : true,
       
    },
    salt : String,
    userId : { type : ObjectId, ref: 'User' },
    tasks : [ { type : ObjectId, ref: 'Task' }]

    
}, {timestamps : true})


EmployeeSchema.virtual('password')
.set(function(password){

    this._password = password;
    this.salt = uuidv1();
    this.hashed_password = this.encryptPassword(password)
})
.get(function(){
    return this._password
})

EmployeeSchema.methods = {


    authenticate  : function(PlainText){

        return this.encryptPassword(PlainText) === this.hashed_password
    },
    encryptPassword : function(password){

        if(!password) return "";
        try {
            return crypto.createHmac('sha1',this.salt)
            .update(password)
            .digest("hex");
            
        } catch (error) {
            return "";
        }
    }
}


module.exports = mongoose.model("Employee", EmployeeSchema)