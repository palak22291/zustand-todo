import { create } from "zustand";

export const useTaskStore = create((set)=>({

    tasks:[],

    addTask:(taskText)=>
        set((state) => ({
        tasks: [...state.tasks, { text: taskText, completed: false }],
        })),

    
    toggleTask: (index) =>
        set((state) => {
        const updated = state.tasks.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
        );
        return { tasks: updated };
        }),


    deleteTask: (index) =>
        set((state) => {
        const updated = [...state.tasks];
        updated.splice(index, 1);
        return { tasks: updated };
        }),



}))
