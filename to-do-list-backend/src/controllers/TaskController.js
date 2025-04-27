import Task from "../models/TaskModel.js";

// Criar nova tarefa
export const createTask = async (req, res) => {
  const { title, description } = req.body;

  const task = new Task({
    user: req.user.id,
    title,
    description,
  });

  const createdTask = await task.save();
  res.status(201).json(createdTask);
};

// Listar todas tarefas do usuário
export const getTasks = async (req, res) => {
  const tasks = await Task.find({ user: req.user.id });
  res.json(tasks);
};

// Buscar uma tarefa específica
export const getTaskById = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (task && task.user.toString() === req.user.id) {
    res.json(task);
  } else {
    res.status(404).json({ message: "Tarefa não encontrada" });
  }
};

// Atualizar uma tarefa
export const updateTask = async (req, res) => {
  const { title, description } = req.body;

  const task = await Task.findById(req.params.id);

  if (task && task.user.toString() === req.user.id) {
    task.title = title || task.title;
    task.description = description || task.description;

    const updatedTask = await task.save();
    res.json(updatedTask);
  } else {
    res.status(404).json({ message: "Tarefa não encontrada" });
  }
};

// Deletar uma tarefa
export const deleteTask = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (task && task.user.toString() === req.user.id) {
    await task.remove();
    res.json({ message: "Tarefa removida" });
  } else {
    res.status(404).json({ message: "Tarefa não encontrada" });
  }
};
