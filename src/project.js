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
  const addProject = (projectName) => projects.push(projectName);
  const removeProject = (projectName) => {
    const delojb = getProject(projectName);
    projects.splice(projects.indexOf(delojb), 1);
  };
  const list = () => console.log(projects);

  addProject(Project('Inbox'));
  addProject(Project('Today'));
  addProject(Project('This Week'));

  return {
    getProject, addProject, removeProject, list,
  };
})();

function getButtName() {
  const title = document.querySelector('.main-title');
  const buttons = document.querySelectorAll('[data-projectbutt]');

  buttons.forEach((e) => {
    if (!e.hasAttribute('data-clicked')) {
      e.setAttribute('data-clicked', 'true');
      e.addEventListener('click', () => {
        ProjectsList.list();
        title.textContent = e.innerHTML;
        // console.log(e.innerHTML);
      });
    }
  });
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
    if (ProjectsList.getProject(currentInput)) {
      alert('Project name cannot repeat');
    } else if (currentInput !== '') {
      const newButt = document.createElement('button');
      const remButt = document.createElement('button');
      const projDiv = document.createElement('div');
      newButt.classList = 'new-proj-butt';
      newButt.textContent = inputField.value;
      newButt.dataset.projectbutt = '';
      remButt.textContent = 'X';
      remButt.addEventListener('click', removeNewProject);
      projDiv.appendChild(newButt);
      projDiv.appendChild(remButt);
      addProjectButt.style.display = 'grid';
      addProject.appendChild(projDiv);
      inputField.value = '';
      inputDiv.remove();
      getButtName();
      // projectList(newButt.textContent);
      ProjectsList.addProject(Project(newButt.textContent));
      // const newProject = Project(newButt.textContent);

      // console.log(ProjectsList.getProject(currentInput));

      // console.log(ProjectsList.list());
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
function removeNewProject(e) {
  const projDiv = e.target.parentElement;
  const projButt = e.target.parentElement.firstChild;
  // console.log(ProjectsList.getProject(projButt.textContent));
  ProjectsList.removeProject(projButt.textContent);
  projDiv.remove();
}
export {
  createAddProject, Project, getButtName, ProjectsList,
};
