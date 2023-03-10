const Todos = (title, description, dueDate, priority, state, projId) => {
  const getTitle = () => title;
  const getDescription = () => description;
  const getDueDate = () => dueDate;
  const getPriority = () => priority;
  const getState = () => state;
  const getProjId = () => projId;
  return {
    title,
    description,
    dueDate,
    priority,
    state,
    projId,
    getTitle,
    getDescription,
    getDueDate,
    getPriority,
    getState,
    getProjId,
  };
};
export default Todos;
