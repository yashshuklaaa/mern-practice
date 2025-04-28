const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TodoModel = require('./Models/todo');
const app = express();

// Update CORS to allow both origins
const allowedOrigins = ['http://localhost:3000', 'http://localhost:5173'];

app.use(cors({
    origin: function (origin, callback) {
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}));

app.use(express.json());

mongoose.connect('mongodb+srv://yashshukla0160:G8GX4H22jEddfmMN@cluster0.ikta33g.mongodb.net/');


app.get('/get', (req, res) => {
    TodoModel.find()
        .then(result => res.json(result))
        .catch(err => res.json(err))
})

app.use('/update/:id', (req, res) => {
    const { id } = req.params;
    TodoModel.findByIdAndUpdate({ _id: id }, { done: true })
        .then(result => res.json(result))
        .catch(err => res.json(err));
})

app.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    TodoModel.findByIdAndDelete({ _id: id })
        .then(result => res.json(result))
        .catch(err => res.json(err));
})

app.post('/add', (req, res) => {
    const task = req.body.task;
    TodoModel.create({ task })
        .then(result => res.json(result))
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'Failed to add task' });
        });
});


app.listen(3001, () => {
    console.log("Server is running");
});
