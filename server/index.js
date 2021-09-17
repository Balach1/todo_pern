const express = require('express');
const app = express();
const Joi = require('joi'); //pascal for class names
const pool = require('./db');
var cors = require('cors')


app.use(cors())
app.use(express.json());

app.get('/', (req, res) => {
  res.send('The Rabbit hole goes deeper');
});

app.get('/todos', async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo_database ORDER BY todo_id;")
    res.json(allTodos.rows);
  } catch (error) {
    console.log(error.message);

  }

});

app.get('/todos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await pool.query("SELECT * FROM todo_database WHERE todo_id = $1", [id]);
    res.json(todo.rows);
  } catch (error) {
    console.log(error.message);

  }

});

// Create a todos
app.post('/todos', async (req, res) => {
  try {
    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message);
    const { description } = req.body;
    const newTodo = await pool.query("INSERT INTO todo_database (description) VALUES ($1) RETURNING *", [description]);
    res.json(newTodo.rows[0]);

  } catch (error) {
    console.log(error.message);

  }
});

// Update todos
app.put('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params; // WHERE
    const { description } = req.body; // SET
    const updateTodo = await pool.query("UPDATE todo_database SET description = $1 WHERE todo_id = $2", [description, id]);
    res.json("Todo was updated")
  } catch (error) {
    console.log(error.message);
  }
});


app.delete('/todos/:id', async(req, res) => {
    try {
      const { id } = req.params;
      const deleteTodo = await pool.query("DELETE FROM todo_database WHERE todo_id = $1", [id]);
      res.json("Todo was deleted successfully");
      
    } catch (error) {
      console.log(error.message)
    }
});

function validate(course) {
  const schema = {
    description: Joi.string().min(3).required()
  };

  return Joi.validate(course, schema);
}
// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app;