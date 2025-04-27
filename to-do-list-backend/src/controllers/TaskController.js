import Task from "../models/TaskModel.js";

// Criar uma nova task
export const createTask = async (req, res) => {
  const { title } = req.body;
  const task = new Task({
    title,
    user: req.user.id, // Associa a task ao usuário logado
  });

  await task.save();
  res.status(201).json(task);
};

// Buscar todas as tasks do usuário
export const getTasks = async (req, res) => {
  const tasks = await Task.find({ user: req.user.id });
  res.json(tasks);
};

// Editar uma task
export const updateTask = async (req, res) => {
  const { title } = req.body;
  const task = await Task.findById(req.params.id);

  if (task.user.toString() !== req.user.id) {
    return res.status(401).json({ message: "Não autorizado" });
  }

  task.title = title || task.title;
  await task.save();
  res.json(task);
};

// Deletar uma task
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Task removed" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting task" });
  }
};
