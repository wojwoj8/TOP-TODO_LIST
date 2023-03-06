const Todos = (title, description, dueDate, priority, state) => {
  const getTitle = () => title;
  const getDescription = () => description;
  const getDueDate = () => dueDate;
  const getPriority = () => priority;
  const getState = () => state;
  return {
    title,
    description,
    dueDate,
    priority,
    state,
    getTitle,
    getDescription,
    getDueDate,
    getPriority,
    getState,
  };
};
export default Todos;
