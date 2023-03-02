// SINGLE PROJECT OBJECT, TODO CONTAINS TODO OBJECTS
const Project = (name) => {
  // console.log('Creating project with name:', name);
  const todo = [];
  // const putName = (name) => Projects.push(name);
  // const setName = () => name;
  const getName = () => name;
  const getTodoList = () => console.log(todo);
  // console.log(getName());
  // return { getName, putName, getTodo };
  return {
    getTodoList,
    getName,
    name,
  };
};
// ARRAY THAT CONTAINS PROJECTS
const ProjectsList = (() => {
  const projects = [];

  const getProject = (projectName) => projects.find((project) => project.getName() === projectName);
  const addProject = (projectName) => {
    projects.push(projectName);
    console.log('dodano');
  };
  const list = () => console.log(projects);

  addProject(Project('Inbox'));
  addProject(Project('Today'));
  addProject(Project('This Week'));

  return {
    getProject, addProject, list,
  };
})();
function getButtName() {
  const title = document.querySelector('.main-title');
  const buttons = document.querySelectorAll('button');
  buttons.forEach((e) => {
    e.addEventListener('click', () => {
      // ProjectsList().list();
      // console.log(ProjectsList().getProject(e.innerHTML));
      if (e.innerHTML === 'Add Project') {
        return;
      }
      title.textContent = e.innerHTML;
    });
  });
}
function setButtName() {

}
function getProjectsName() {

}
function createAddProject() {
  const inputDiv = document.createElement('div');
  const buttDiv = document.createElement('div');
  const addProjectButt = document.getElementById('add-project');
  const addProject = document.querySelector('.new-projects');
  const inputField = document.createElement('input');
  const addButt = document.createElement('button');
  const cancelButt = document.createElement('button');

  inputDiv.setAttribute('id', 'input-div');
  buttDiv.setAttribute('id', 'butt-div');
  addButt.setAttribute('id', 'butt-add');
  addButt.textContent = 'Add';
  cancelButt.textContent = 'Cancel';
  cancelButt.setAttribute('id', 'butt-cancel');

  const cancelListener = () => {
    // console.log('test cancel');
    addProjectButt.style.display = 'grid';
    inputField.value = '';
    inputDiv.remove();
    cancelButt.removeEventListener('click', cancelListener);
    addButt.removeEventListener('click', addListener);
  };

  const addListener = () => {
    // console.log('test add');
    // console.log(inputField.value);
    const currentInput = inputField.value;
    if (currentInput !== '') {
      const newButt = document.createElement('button');
      newButt.classList = 'new-proj-butt';
      newButt.textContent = inputField.value;
      addProjectButt.style.display = 'grid';
      addProject.appendChild(newButt);
      inputField.value = '';
      inputDiv.remove();
      // projectList(newButt.textContent);
      ProjectsList.addProject(Project(newButt.textContent));
      // const newProject = Project(newButt.textContent);
      // ProjectsList().addProject(newProject);
      // console.log(newProject);

      ProjectsList.list();
      cancelButt.removeEventListener('click', cancelListener);
      addButt.removeEventListener('click', addListener);
    } else {
      // console.log(currentInput);
      // console.log('alert');
      alert('Project name cannot be empty');
    }
  };

  addProjectButt.addEventListener('click', () => {
    // console.log('test');
    inputDiv.appendChild(inputField);
    buttDiv.appendChild(addButt);
    buttDiv.appendChild(cancelButt);
    inputDiv.appendChild(buttDiv);
    addProject.appendChild(inputDiv);
    addProjectButt.style.display = 'none';

    cancelButt.addEventListener('click', cancelListener);
    addButt.addEventListener('click', addListener);
  });
}
export {
  createAddProject, Project, getButtName, ProjectsList,
};
