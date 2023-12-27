import { useState } from "react";
import {AiOutlineDelete} from 'react-icons/ai';
import { LuCheck } from "react-icons/lu";
import "./App.css";

function App() {
  const [isCompleteScrn, setIsCompleteScrn] = useState(false);
  return (
    <div className="App">
      <h1>My Todo List</h1>
      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <label>Title</label>
            <input type="text" placeholder="Type Task Title" />
          </div>
          <div className="todo-input-item">
            <label>Description</label>
            <input type="text" placeholder="Type Task Description" />
          </div>
          <div className="todo-input-item">
            <button type="button" className="primaryBtn">
              Add
            </button>
          </div>
        </div>

        <div className="btn-area">
          <button className={`secondaryBtn ${isCompleteScrn === false && 'active'}`} onClick={()=>setIsCompleteScrn(false)}>Todo</button>
          <button className={`secondaryBtn ${isCompleteScrn === true && 'active'}`} onClick={()=>setIsCompleteScrn(true)}>Completed</button>
        </div>

        <div className="todo-list">
          <div className="todo-list-item">
            <h3>Task 1</h3>
            <p>Description</p>
          </div>

          <div>
            <AiOutlineDelete className="delete-icon"/>
            <LuCheck className="check-icon" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
