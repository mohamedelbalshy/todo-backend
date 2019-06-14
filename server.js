var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Todo = require('./models/todo');
var cors = require('cors');


var app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
 







mongoose.connect('mongodb://localhost:27017/todo_backend',{useNewUrlParser: true}, (err)=>{
    if(err)
        return console.log(err);
    console.log('Connected to mongodb!');
});

app.post('/api/addtodo', (req, res)=>{
    console.log(req.body)
    var title = req.body.title;

    var todo = new Todo({title: title});
    todo.save((err)=>{
        if(err)
            return res.send({error: err, status: false});
        res.send({status: true, todo: todo});
    });
});

app.get('/api/todos', (req, res)=>{
    Todo.find({removed: false}, (err, todos)=>{
        if(err)
            return res.send({error: err, status: false});
        
        res.send({status: true, todos: todos})
    })
});

app.delete('/api/todo/:todo_id', (req, res)=>{
    let todo_id = req.params.todo_id;
    Todo.findOneAndUpdate({_id: todo_id}, {removed: true}, (err)=>{
        if(err)
            return res.send({status: false, error: err});
        console.log('todo has been deleted');
        res.send({status: true, message: "Todo has been deleted!"});
    })
})

app.get('/api/markcompleted/:todo_id', (req, res)=>{
    
    let todo_id = req.params.todo_id;
    Todo.findOne({_id: todo_id}, (err, todo)=>{
        if(err)
            return res.send({error: err, status: false});
        if(todo.completed == true)
            todo.completed = false;
        else
            todo.completed = true;
        todo.save((err)=>{
            if(err)
                return res.send({error: err, status: false});
            res.send({status: true, todo: todo});
        });
        
    });
})

app.listen(4000, ()=>{
    console.log('Server is running on port 4000');
});



