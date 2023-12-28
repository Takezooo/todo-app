import { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { LuCheck } from "react-icons/lu";
import "./App.css";

function App() {
  const [isCompleteScrn, setIsCompleteScrn] = useState(false);
  const [allTodos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const handleAddTodo = () => {
    let newTodoItem = {
      title: newTitle,
      description: newDescription,
    };

    let updatedTodoArr = [...allTodos];
    updatedTodoArr.push(newTodoItem);
    setTodos(updatedTodoArr);
  };

  return (
    <div className="App">
      <h1>My Todo List</h1>
      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <label>Title</label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Task Title"
            />
          </div>
          <div className="todo-input-item">
            <label>Description</label>
            <input
              type="text"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="Task Description"
            />
          </div>
          <div className="todo-input-item">
            <button
              type="button"
              onClick={handleAddTodo}
              className="primaryBtn"
            >
              Add
            </button>
          </div>
        </div>

        <div className="btn-area">
          <button
            className={`secondaryBtn ${isCompleteScrn === false && "active"}`}
            onClick={() => setIsCompleteScrn(false)}
          >
            Todo
          </button>
          <button
            className={`secondaryBtn ${isCompleteScrn === true && "active"}`}
            onClick={() => setIsCompleteScrn(true)}
          >
            Completed
          </button>
        </div>

        <div className="todo-list">
          {allTodos.map((item, index) => {
            return (
              <div className="todo-list-item" key={index}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
                <div className="icon-area">
                  <AiOutlineDelete className="delete-icon" />
                  <CiEdit className="edit-icon" />
                  <LuCheck className="check-icon" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
