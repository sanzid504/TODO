const mongoose = require('mongoose')

const TodoSchema = new mongoose.Schema({
    todo : {
        type : String,
        required : true
    },
    status :{
        type : String,
        default:"Uncompleted"
    },
    date :{
        
    }
    

})

module.exports = new mongoose.model('todo', TodoSchema)