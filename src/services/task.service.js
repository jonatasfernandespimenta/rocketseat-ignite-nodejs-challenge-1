import { randomUUID } from 'node:crypto';
import { Database } from "../database.js";

const database = new Database();

export function findAll(req, res) {
  const { search } = req.query

  const tasks = database.select('tasks', {
    title: search,
    description: search
  })

  return res.end(JSON.stringify(tasks));
}

export function create(req, res) {
  if (!req.body) {
    return res.writeHead(400).end(JSON.stringify({ message: 'No body provided' }))
  }

  const { title, description } = req.body;

  if (!title) {
    return res.writeHead(400).end(JSON.stringify({ message: 'Missing field "title"' }))
  }

  if (!description) {
    return res.writeHead(400).end(JSON.stringify({ message: 'Missing field "description"' }))
  }

  const task = {
    id: randomUUID(),
    title,
    description,
    completed_at: null,
    created_at: new Date(),
    updated_at: null
  };

  database.insert("tasks", task);

  return res.writeHead(201).end();
}

export function deleteById(req, res) {
  const { id } = req.params

  const foundTask = findOneOrFail(id);

  if (!foundTask) {
    return res.writeHead(404).end(JSON.stringify({ message: `task with id #${id} was not found` }))
  }

  database.delete('tasks', id)

  return res.writeHead(204).end();
}

export function updateById(req, res) {
  const { id } = req.params
  const { name, description } = req.body;

  const foundTask = findOneOrFail(id);

  if (!foundTask) {
    return res.writeHead(404).end(JSON.stringify({ message: `task with id #${id} was not found` }))
  }

  database.update('tasks', id, {
    name, description, updated_at: new Date()
  })

  return res.writeHead(204).end();
}

export function completeTask(req, res) {
  const { id } = req.params

  const foundTask = findOneOrFail(id);

  if (!foundTask) {
    return res.writeHead(404).end(JSON.stringify({ message: `task with id #${id} was not found` }))
  }

  database.update('tasks', id, {
    completed_at: new Date()
  })

  return res.writeHead(204).end();
}

function findOneOrFail(id) {
  const [task] = database.select('tasks', { id });

  return task;
}
