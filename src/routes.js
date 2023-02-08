import { buildRoutePath } from './utils/build-route-path.js';
import { completeTask, create, deleteById, findAll, updateById } from './services/task.service.js';

export const routes = [
  {
    method: "GET",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => findAll(req, res),
  },
  {
    method: "POST",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => create(req, res),
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => deleteById(req, res),
  },
  {
    method: 'PUT',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => updateById(req, res),
  },
  {
    method: 'PATCH',
    path: buildRoutePath('/tasks/:id/complete'),
    handler: (req, res) => completeTask(req, res),
  }
];
