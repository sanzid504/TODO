const mongoose = require('mongoose')
const express =  require('express')
const app = express()
require('dotenv').config()
const PORT = process.env.PORT
const path = require('path')
const Todo = require('./models/todo')


mongoose.connect("mongodb+srv://sanzid:ttyl504@cluster0.oyoyc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MONGODB CONNECTION ERROR"));
db.once("open", function () {
  console.log("MONGODB CONNECTED");
});
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("static"));
let msg_1 = '';
let msg_2 = ''
app.get('/', async (req,res)=>{
    const Alltodo =  await  Todo.find({})

    res.render('todo.ejs',
    {
        Alltodo,
        msg_1: msg_1,
        msg_2: msg_2,
    })

})




app.get('/status/:id', async (req,res) =>{
    const todo  = await Todo.findOne({_id : req.params.id})
    if(todo.status === 'Uncompleted'){
        todo.status = 'Completed'
        msg_2 = todo.todo 
    }else{
        todo.status = 'Uncompleted'
    }

    await todo.save()
    
    if(todo.status === 'Completed'){
       await Todo.deleteOne({_id: req.params.id})
       return res.redirect('/')
    }

    res.redirect('/')

    
})
app.post('/addTodo', async (req,res) => {
    const todo = req.body.todo
    const date = req.body.date

    console.log(todo)

    const newTodo = new Todo({
        todo: todo,
        
    })
    await newTodo.save()
    msg_1 = newTodo.todo 
    res.redirect("/")   
})


app.listen(PORT || 3000 , ()=>{
    console.log(`APP IS LISTENING AT ${PORT}`)
})