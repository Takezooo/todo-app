import { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { MdOutlineCancel } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { LuCheck } from "react-icons/lu";
import "./App.css";

function App() {
  const [isCompleteScrn, setIsCompleteScrn] = useState(false);
  const [allTodos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [editTitle, setEditedTitle] = useState("");
  const [editDescription, setEditedDescription] = useState("");
  const [completedTasks, setCompletedTasks] = useState([]);
  const [enabledIndex, setEnabledIndex] = useState(null);

  // Add Tasks
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
      if (newTitle === "" && newDescription !== "") {
        alert("Please add Title to your task");
      } else if (newTitle !== "" && newDescription === "") {
        alert("Please add Description to your task");
      } else {
        alert("Please add Title and Description to your task");
      }
    }
  };

  // Edit Tasks
  const handleInputEnabled = (index) => {
    setEnabledIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const isInputEnabled = (index) => enabledIndex === index;

  const handleEdit = (index) => {
    if (editTitle !== "" && editDescription !== "") {
      if (index !== null) {
        let updatedTodoArr = [...allTodos];
        updatedTodoArr[index] = {
          title: editTitle,
          description: editDescription,
        };
        setTodos(updatedTodoArr);
        localStorage.setItem("todolist", JSON.stringify(updatedTodoArr));
        setEditedTitle("");
        setEditedDescription("");
        handleInputEnabled(index);
      }
    } else {
      alert("Please finish editing!");
    }
  };

  // Delete Tasks
  const handleDeleteItem = (index) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      let removeTodo = [...allTodos];
      removeTodo.splice(index, 1);
      setTodos(removeTodo);
      localStorage.setItem("todolist", JSON.stringify(removeTodo));
    }
  };

  //Delete Completed Tasks
  const handleDeleteCompleted = (index) => {
    let removeCompleted = [...completedTasks];
    removeCompleted.splice(index, 1);
    setCompletedTasks(removeCompleted);
    localStorage.setItem("completeTask", JSON.stringify(removeCompleted));
  };

  //Delete all completed tasks
  const handleClearCompletedTasks = () => {
    setCompletedTasks([]);
    localStorage.removeItem("completeTask");
  };

  //Mark tasks as completed
  const handleCompleted = (index) => {
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();

    let completedOn = `${mm}-${dd}-${yyyy} at ${h}:${m}:${s}`;

    if (window.confirm("Are you sure you want to mark this as completed?")) {
      let filteredItem = {
        ...allTodos[index],
        completedOn: completedOn,
      };

      let updatedCompletedArr = [...completedTasks];
      updatedCompletedArr.push(filteredItem);
      setCompletedTasks(updatedCompletedArr);
      let removeTodo = [...allTodos];
      removeTodo.splice(index, 1);
      setTodos(removeTodo);
      localStorage.setItem("todolist", JSON.stringify(removeTodo));
      localStorage.setItem("completeTask", JSON.stringify(updatedCompletedArr));
    }
  };

  //fetch saved tasks and completed tasks from localStorage
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

  //rendering part
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
                    {isInputEnabled(index) ? (
                      <>
                        <input
                          type="text"
                          value={editTitle}
                          onChange={(e) => setEditedTitle(e.target.value)}
                          disabled={isInputEnabled}
                          placeholder="Edit Task Title"
                        />
                        <input
                          type="text"
                          value={editDescription}
                          onChange={(e) => setEditedDescription(e.target.value)}
                          disabled={isInputEnabled}
                          placeholder="Edit Task Description"
                        />
                      </>
                    ) : (
                      <>
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                      </>
                    )}
                  </div>
                  <div className="icon-area">
                    {isInputEnabled(index) ? (
                      <>
                        <MdOutlineCancel
                          className="delete-icon"
                          onClick={() => handleInputEnabled(index)}
                        />
                        <LuCheck
                          className="check-icon"
                          onClick={() => handleEdit(index)}
                        />
                      </>
                    ) : (
                      <>
                        <AiOutlineDelete
                          className="delete-icon"
                          onClick={() => handleDeleteItem(index)}
                        />
                        <CiEdit
                          className="edit-icon"
                          onClick={() => handleInputEnabled(index)}
                        />
                        <LuCheck
                          className="check-icon"
                          onClick={() => handleCompleted(index)}
                        />
                      </>
                    )}
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
                      onClick={() => handleDeleteCompleted(index)}
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
