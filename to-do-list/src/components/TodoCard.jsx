export function TodoCard(props) {
  const { todo, handleDeleteTodo, todoIndex, handleCompleteTodo, handleEditTodo } = props;

  return (
    <div className="card todo-item">
      <p>{todo.input}</p>
      <div className="todo-buttons">
        {/* Button to complete the todo, disabled on already completed items */}
        <button
          onClick={() => {
            handleCompleteTodo(todoIndex);
          }}
          disabled={todo.complete}
        >
          <h6>Done</h6>
        </button>
        {/* Button to Edit the todo */}
        <button
          onClick={() => {
            handleEditTodo(todoIndex);
          }}
        >
          <h6>Edit</h6>
        </button>
        {/* Button to delete the todo */}
        <button
          onClick={() => {
            handleDeleteTodo(todoIndex);
          }}
        >
          <h6>Delete</h6>
        </button>
      </div>
    </div>
  );
}
