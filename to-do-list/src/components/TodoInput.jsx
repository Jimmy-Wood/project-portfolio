export function TodoInput(props) {
  const { handleAddTodo, inputValue, setInputValue } = props;

  return (
    //Input field and button to add a new todo
    <div className="input-container">
      <input
        id="todo-input"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && inputValue) {
            handleAddTodo(inputValue);
            setInputValue("");
          }
        }}
        placeholder="Add a new task..."
      />
      <button
        onClick={() => {
          if (!inputValue) {
            return;
          }
          handleAddTodo(inputValue);
          setInputValue("");
        }}
      >
        <i className="fa-solid fa-plus"></i>
      </button>
    </div>
  );
}
