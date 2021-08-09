const mongoose = require('mongoose')
const express =  require('express')
const app = express()
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


app.get('/', async (req,res)=>{
    const Alltodo =  await  Todo.find({})

    res.render('todo.ejs',
    {
        Alltodo,

    })

})
app.get('/status/:id', async (req,res) =>{
    const todo  = await Todo.findOne({_id : req.params.id})
    if(todo.status === 'Uncompleted'){
        todo.status = 'Completed'
    }else{
        todo.status = 'Uncompleted'
    }
    console.log(todo.status)
    await todo.save()

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
    res.redirect("/")   
})


app.listen(PORT || 3000 , ()=>{
    console.log(`APP IS LISTENING AT ${PORT}`)
})