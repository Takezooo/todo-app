import { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { LuCheck } from "react-icons/lu";
import "./App.css";

function App() {
  const [isCompleteScrn, setIsCompleteScrn] = useState(false);
  const [allTodos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [completedTasks, setCompletedTasks] = useState([]);

  const handleAddItem = () => {
    let newTodoItem = {
      title: newTitle,
      description: newDescription,
    };

    if (newTitle !== "" && newDescription !== "") {
      let updatedTodoArr = [...allTodos];
      updatedTodoArr.push(newTodoItem);
      setTodos(updatedTodoArr);
      localStorage.setItem("todolist", JSON.stringify(updatedTodoArr));
      setNewTitle("");
      setNewDescription("");
    } else {
      if (newTitle === "") {
        alert("Please add Title to your task");
      } else if (newDescription === "") {
        alert("Please add Description to your task");
      } else {
        alert("Please add Title and Description to your task");
      }
    }
  };

  const handleDeleteItem = (index) => {
    let removeTodo = [...allTodos];
    removeTodo.splice(index, 1);
    setTodos(removeTodo);

    localStorage.setItem("todolist", JSON.stringify(removeTodo));
  };

  const handleDeleteCompleted = (index) => {
    let removeCompleted = [...completedTasks];
    removeCompleted.splice(index, 1);
    setCompletedTasks(removeCompleted);

    localStorage.setItem("completeTask", JSON.stringify(removeCompleted));
  };

  const handleCompleted = (index) => {
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();

    let completedOn = `${mm}-${dd}-${yyyy} at ${h}:${m}:${s}`;

    let filteredItem = {
      ...allTodos[index],
      completedOn: completedOn,
    };

    let updatedCompletedArr = [...completedTasks];
    updatedCompletedArr.push(filteredItem);
    setCompletedTasks(updatedCompletedArr);
    handleDeleteItem(index);
    localStorage.setItem("completeTask", JSON.stringify(updatedCompletedArr));
  };

  const handleEditItem = (index) => {
    if (index !== null) {
      let updatedTodoArr = [...allTodos];
      updatedTodoArr[index] = {
        title: newTitle,
        description: newDescription,
      };
      setTodos(updatedTodoArr);
      localStorage.setItem("todolist", JSON.stringify(updatedTodoArr));
      setNewTitle("");
      setNewDescription("");
    }
  };

  const handleClearCompletedTasks = () => {
    setCompletedTasks([]);
    localStorage.removeItem("completeTask");
  };

  useEffect(() => {
    let savedTodo = JSON.parse(localStorage.getItem("todolist"));
    let savedCompleted = JSON.parse(localStorage.getItem("completeTask"));
    if (savedTodo) {
      setTodos(savedTodo);
    }

    if (savedCompleted) {
      setCompletedTasks(savedCompleted);
    }
  }, []);

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
              onClick={handleAddItem}
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
          {isCompleteScrn === false &&
            allTodos.map((item, index) => {
              return (
                <div className="todo-list-item" key={index}>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                  <div className="icon-area">
                    <AiOutlineDelete
                      className="delete-icon"
                      onClick={handleDeleteItem}
                    />
                    <CiEdit
                      className="edit-icon"
                      onClick={() => handleEditItem(index)}
                    />
                    <LuCheck
                      className="check-icon"
                      onClick={() => handleCompleted(index)}
                    />
                  </div>
                </div>
              );
            })}

          <button
            className={`clearAll ${isCompleteScrn === true && "show"}`}
            onClick={handleClearCompletedTasks}
          >
            Clear Completed{" "}
          </button>

          {isCompleteScrn === true &&
            completedTasks.map((item, index) => {
              return (
                <div className="todo-list-item" key={index}>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <p>
                      <small>Completed On: {item.completedOn}</small>
                    </p>
                  </div>
                  <div className="icon-area">
                    <AiOutlineDelete
                      className="delete-icon"
                      onClick={handleDeleteCompleted}
                    />
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
