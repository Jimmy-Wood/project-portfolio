export function Tabs(props) {
  const { todos, selectedTab, setSelectedTab } = props;

  const tabs = ["All", "Open", "Completed"];

  return (
    //Navigation tabs to filter todos
    <nav className="tab-container">
      {tabs.map((tab, tabIndex) => {
        const numOfTasks =
          tab === "All"
            ? todos.length
            : tab === "Open"
            ? todos.filter((val) => !val.complete).length
            : todos.filter((val) => val.complete).length;

        return (
          // Tab button with the number of tasks in each category
          <button
            onClick={() => {
              setSelectedTab(tab);
            }}
            key={tabIndex}
            className={
              "tab-button " + (tab == selectedTab ? " tab-selected" : " ")
            }
          >
            <h4>
              {tab} <span>({numOfTasks})</span>
            </h4>
          </button>
        );
      })}
      <hr />
    </nav>
  );
}
