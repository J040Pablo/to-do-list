import { useState, useEffect } from "react";
import styles from "../styles/Home/home.module.css"; // Estilos em CSS Module

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [editedTask, setEditedTask] = useState("");

  // Carregar as tasks do backend
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/tasks", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          setTasks(data);
        } else {
          alert("Error fetching tasks");
        }
      } catch (error) {
        console.error(error);
        alert("Error connecting to the backend");
      }
    };

    fetchTasks();
  }, []);

  // Adicionar uma nova task
  const addTask = async () => {
    if (newTask.trim()) {
      try {
        const response = await fetch("http://localhost:3000/api/tasks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ title: newTask }),
        });

        const data = await response.json();
        if (response.ok) {
          setTasks([...tasks, data]);
          setNewTask("");
        } else {
          alert("Error adding task");
        }
      } catch (error) {
        console.error(error);
        alert("Error connecting to the backend");
      }
    }
  };

  // Editar uma task
  const editTask = (task) => {
    setEditingTask(task);
    setEditedTask(task.title);
  };

  const saveEditedTask = async () => {
    if (editedTask.trim()) {
      try {
        const response = await fetch(
          `http://localhost:3000/api/tasks/${editingTask._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({ title: editedTask }),
          }
        );

        const data = await response.json();
        if (response.ok) {
          setTasks(
            tasks.map((task) =>
              task._id === data._id ? { ...task, title: data.title } : task
            )
          );
          setEditingTask(null);
          setEditedTask("");
        } else {
          alert("Error saving task");
        }
      } catch (error) {
        console.error(error);
        alert("Error connecting to the backend");
      }
    }
  };

  const removeTask = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/tasks/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        setTasks(tasks.filter((task) => task._id !== id));
      } else {
        alert("Error deleting task");
      }
    } catch (error) {
      console.error(error);
      alert("Error connecting to the backend");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Minhas Tarefas</h2>
      <div className={styles.addTaskContainer}>
        <input
          className={styles.input}
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Adicionar nova tarefa"
        />
        <button className={styles.addButton} onClick={addTask}>
          Adicionar
        </button>
      </div>
      <ul className={styles.taskList}>
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <li key={task._id} className={styles.taskItem}>
              {editingTask && editingTask._id === task._id ? (
                <div className={styles.editContainer}>
                  <input
                    className={styles.input}
                    type="text"
                    value={editedTask}
                    onChange={(e) => setEditedTask(e.target.value)}
                  />
                  <button
                    className={styles.saveButton}
                    onClick={saveEditedTask}
                  >
                    Salvar
                  </button>
                </div>
              ) : (
                <span>{task.title}</span>
              )}
              <div className={styles.taskButtons}>
                <button
                  className={styles.editButton}
                  onClick={() => editTask(task)}
                >
                  Editar
                </button>
                <button
                  className={styles.removeButton}
                  onClick={() => removeTask(task._id)}
                >
                  Remover
                </button>
              </div>
            </li>
          ))
        ) : (
          <p className={styles.noTasks}>Nenhuma tarefa encontrada!</p>
        )}
      </ul>
    </div>
  );
};

export default Home;
