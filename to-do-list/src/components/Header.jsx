export function Header(props) {
  const { todos } = props;
  // Calculate the number of tasks
  const todosLength = todos.length;

  // Determine whether to use "task" or "tasks"
  const taskOrTasks = todosLength != 1 ? "tasks" : "task";

  return (
    <header>
      <h1 className="text-gradient">
        You have {todosLength} open {taskOrTasks}.
      </h1>
    </header>
  );
}
