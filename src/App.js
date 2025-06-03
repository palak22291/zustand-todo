import React from "react";
import { useForm } from "react-hook-form";
import {
  TextField,
  Button,
  Typography,
} from "@mui/material";
import { useTaskStore } from "./TaskStore";

function App() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const tasks = useTaskStore((state) => state.tasks);
  const addTask = useTaskStore((state) => state.addTask);
  const toggleTask = useTaskStore((state) => state.toggleTask);
  const deleteTask = useTaskStore((state) => state.deleteTask);

  const onSubmit = (data) => {
    addTask(data.task);
    reset();
  };
  

  return (
    <div style={{ maxWidth: 500, margin: "70px auto", padding: 40, backgroundColor: "ivory", borderRadius: 8 }}>
      <Typography variant="h3" align="center" gutterBottom>
        📝 Zustand To-Do App
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Enter a task"
          variant="outlined"
          fullWidth
          style={{ marginBottom: 10 }}
          {...register("task", { required: true })}
          error={Boolean(errors.task)}
          helperText={errors.task ? "Task is required" : ""}
        />
        <Button type="submit" variant="contained" fullWidth>
          Add Task
        </Button>
      </form>

      <ul style={{ listStyle: "none", padding: 0, marginTop: 20 }}>
        {tasks.map((task, index) => (
          <li key={index} style={{
            marginBottom: 10,
            padding: "10px",
            background: "#f1f1f1",
            borderRadius: "5px",
            textDecoration: task.completed ? "line-through" : "none",
            color: task.completed ? "gray" : "black",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}>
            {task.text}
            <div>
              <Button size="small" onClick={() => toggleTask(index)}>
                {task.completed ? "Undo" : "Done"}
              </Button>
              <Button size="small" color="error" onClick={() => deleteTask(index)}>
                ❌
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
