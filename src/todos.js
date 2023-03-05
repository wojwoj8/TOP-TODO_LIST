const Todos = (title, description, dueDate, priority, state) => {
  const getTitle = () => title;
  const getDesctiprion = () => description;
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
    getDesctiprion,
    getDueDate,
    getPriority,
    getState,
  };
};
export default Todos;
