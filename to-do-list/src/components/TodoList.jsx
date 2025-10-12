import { TodoCard } from "./TodoCard";

export function TodoList(props) {
  const { todos, selectedTab } = props;

  //Filter todos based on selected tab
  const filterTodosList =
    selectedTab === "All"
      ? todos
      : selectedTab === "Completed"
      ? todos.filter((val) => val.complete)
      : todos.filter((val) => !val.complete);

  return (
    <>
      {/* Map through the filtered todo list and render a TodoCard for each todo */}
      {filterTodosList.map((todo, todoIndex) => {
        const tempTodoIndex = todos.findIndex((val) => val.input == todo.input);
        console.log(tempTodoIndex);
        return (
          <TodoCard
            key={todoIndex}
            {...props}
            todoIndex={tempTodoIndex}
            todo={todo}
          />
        );
      })}
    </>
  );
}
