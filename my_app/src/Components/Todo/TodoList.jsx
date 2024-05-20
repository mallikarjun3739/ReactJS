import React,{useState,useEffect} from "react";
import axios from 'axios';
import './todoStyle.css';

const TodoList = () => {
    const [todos, setTodos] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(()=>{
        const fetchTodos = async ()=> {
            try{
                const response = await axios.get(`https://jsonplaceholder.typicode.com/todos`);
                setTodos(response.data);
                setLoading(false);
            }catch(err){
                setError(err);
                setLoading(false);
                console.error('error fetching', error);
            }
        }
        fetchTodos();
    },[]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
          <h1>Todo List</h1>
          <ul>
            {todos.map(todo => (
              <li key={todo.id}>
                <div><strong>UserID:</strong> {todo.userId}</div>
                <div><strong>ID:</strong> {todo.id}</div>
                <div><strong>Title:</strong> {todo.title}</div>
                <div><strong>Completed:</strong> {todo.completed ? 'Yes' : 'No'}</div>
                <hr />
              </li>
            ))}
          </ul>
        </div>
      );
    };
    
    export default TodoList;