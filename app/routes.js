var Todo = require('./models/todo');

function getTodos(res) {
    Todo.find((err, todos) => {
        if (err)
            res.send(err);
        res.json(todos);
    });
}

module.exports = app => {

    app.get('/api/todos', (req, res) => {
        getTodos(res);
    });

    app.post('/api/todos', (req, res) => {

        Todo.create({
            text: req.body.text,
            done: false
        }, (err, todo) => {
            if (err)
                res.send(err);
            getTodos(res);
        });

    });

    app.delete('/api/todos/:todo_id', (req, res) => {
        Todo.remove({
            _id: req.params.todo_id
        }, (err, todo) => {
            if (err)
                res.send(err);
            getTodos(res);
        });
    });

    app.get('*', (req, res) => {
        res.sendfile('./public/index.html');
    });
};