import './App.css';

function App() {
  return (
    <div className="app">
      <h1>
        My Todo List
      </h1>
      <div className='todo-wrapper'>
        <div className='todo-input'>
          <div className='todo-input-item'>
            <label>Description</label>
            <input type='text' placeholder='Type Task Title' />
          </div>
          <div className='todo-input-item'>
            <button type='button' className='primaryBtn'>Add</button>
          </div>
        </div>
      </div>

      <div className='btn-area'>
        <button>Todo</button>
        <button>Completed</button>
      </div>

      <div className='todo-list'>
        <div className='todo-list-item'>
          <h3>Task 1</h3>
          <p>Description</p>
        </div>
      </div>
    </div>
  );
}

export default App;
