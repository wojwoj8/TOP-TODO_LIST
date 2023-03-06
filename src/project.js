import {
  toDate, parseISO, isValid, format,
} from 'date-fns';
import { de, enGB } from 'date-fns/locale';
import Todos from './todos';
// SINGLE PROJECT OBJECT, TODO CONTAINS TODO OBJECTS
const Project = (name) => {
  // console.log('Creating project with name:', name);
  const todo = [];
  // const putName = (name) => Projects.push(name);
  // const setName = () => name;
  const getName = () => name;
  const getTodoList = () => todo;
  // const removeTodo = (index) =>

  const addTodo = (title, description, dueDate, priority, state) => {
    todo.push(Todos(title, description, dueDate, priority, state));
    console.log(todo);
    // console.log(x);
  };

  // console.log(getName());
  // return { getName, putName, getTodo };
  return {
    getTodoList,
    getName,
    addTodo,

    name,
    todo,
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
  const getTodo = (projectName, title) => {
    const project = ProjectsList.getProject(projectName);
    // console.log('project:', project);
    const todoList = project.getTodoList();
    // console.log('todoList:', todoList);
    const todo = todoList.find((todo) => todo.getTitle() === title);
    // console.log('todo:', todo);
    return todo;
  };
  const addTodoObj = (projectName, object) => {
    const project = ProjectsList.getProject(projectName);
    const todoList = project.getTodoList();
    todoList.push(object);
  };
  const removeTodo = (projectName, title) => {
    const deltodo = getTodo(projectName, title);
    const project = ProjectsList.getProject(projectName);
    // console.log('project:', project);
    const todoList = project.getTodoList();
    todoList.splice(todoList.indexOf(deltodo), 1);
  };
  const list = () => console.log(projects);

  addProject(Project('Inbox'));
  addProject(Project('Today'));
  addProject(Project('This Week'));

  return {
    getProject, addProject, removeProject, list, getTodo, removeTodo, addTodoObj,
  };
})();

function getButtName() {
  const title = document.querySelector('.main-title');
  const buttons = document.querySelectorAll('[data-projectbutt]');
  const mainContent = document.querySelector('.main-content');

  buttons.forEach((e) => {
    if (!e.hasAttribute('data-clicked')) {
      e.setAttribute('data-clicked', 'true');
      e.addEventListener('click', () => {
        ProjectsList.list();

        // main title
        // console.log();
        // REMOVE BUTTON AND FORM FROM TODAY AND THIS WEEK
        if (e.id === 'thisWeek' || e.id === 'today') {
          const button = document.querySelector('.add-Todo');
          // TEMPORARY SOLUTION FOR DELETING TODOS IN TODAY AND THIS WEEK
          mainContent.innerHTML = '';
          try {
            const form = document.querySelector('form');
            button.remove();
            form.remove();
            title.textContent = e.innerHTML;
          } catch (TypeError) {
            title.textContent = e.innerHTML;
            return;
          }

          return;
        }
        addTodoButton(e);
        title.textContent = e.innerHTML;
        // console.log(e.innerHTML);

        try {
          loopTodos(e.innerHTML);
        } catch (TypeError) {
          console.log('error');
        }
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
  const mainContent = document.querySelector('.main-content');
  const mainTitle = document.querySelector('.main-title');
  mainTitle.textContent = '';
  mainContent.innerHTML = '';
  // console.log(ProjectsList.getProject(projButt.textContent));
  // console.log(projDiv);
  ProjectsList.removeProject(projButt.textContent);
  projDiv.remove();
}

function addTodoButton(e) {
  const mainContent = document.querySelector('.main-content');
  const button = document.createElement('button');
  // all todos are here
  const todosDiv = document.createElement('div');
  todosDiv.classList = 'all-Todos-List';
  // clear existing buttons
  mainContent.innerHTML = '';
  const projectName = e.innerHTML;
  button.classList = 'add-Todo';
  button.textContent = 'Add todos';
  button.dataset.name = projectName;
  mainContent.appendChild(button);
  mainContent.appendChild(todosDiv);
  // console.log(`created button: ${button}`);
  button.addEventListener('click', () => {
    const formDiv = createForm();

    // console.log(formDiv);
    mainContent.appendChild(formDiv);
    button.style.display = 'none';

    const formSubmit = document.querySelector('.form-submit');
    formSubmit.addEventListener('click', formHandler);
  });
}
// HERE NEED TO TAKE INPUTS AND CREATE TODO AND REMOVE FORM
function dateValidation() {
  try {
    const dateElem = document.querySelector('.form-duedate');
    const date = format(parseISO(dateElem.value), 'yyyy-MM-dd');
    return date;
  } catch (RangeError) {
    // alert('date must be valid');
    return false;
  }
}
function formHandler(event) {
  // console.log('test');
  // const dateElem = document.querySelector('.form-duedate');
  const titleElem = document.querySelector('.form-title');
  const descriptionElem = document.querySelector('textarea');
  const priorityElem = document.querySelector('.form-priority');
  const stateElem = document.querySelector('.form-state');

  // PROJECT NAME
  const project = document.querySelector('[data-name]').dataset.name;
  // console.log(project);

  // FORM VALUES
  // const date = format(parseISO(dateElem.value), 'dd/MM/yyyy');
  const date = dateValidation();
  const title = titleElem.value;
  const description = descriptionElem.value;
  const priority = priorityElem.value;
  const state = stateElem.value;
  let a = false;
  // console.log(description);
  // console.log(`data: ${date}`);
  // console.log(date);
  if (title === '') {
    alert('title can\'t be empty');
  } else if (ProjectsList.getTodo(project, title)) {
    alert('Title name cannot repeat');
  } else if (dateValidation() === false) {
    alert('date must be valid');
  } else if (!(priority === 'Low' || priority === 'Medium' || priority === 'High')) {
    alert('You must select valid priority');
  } else if (!(state === 'Active' || state === 'Inactive')) {
    alert('You must select valid state');
  } else {
    // CREATE TODOS AND ASSIGN TO PROJECT
    ProjectsList.getProject(project).addTodo(title, description, date, priority, state);
    loopTodos(project);
    const form = document.querySelector('.form-div');
    form.remove();
    // console.log(ProjectsList.getProject(project).getTodoList()[0].getTitle());
    a = true;
  }
  try {
    event.preventDefault();
  } catch (TypeError) {

  }
  return a;
}
function loopTodos(project) {
  const allTodosList = document.querySelector('.all-Todos-List');
  const form = document.querySelector('form');
  const todoButton = document.querySelector('.add-Todo');
  allTodosList.innerHTML = '';
  const proj = ProjectsList.getProject(project).getTodoList();
  for (let i = 0; i < proj.length; i++) {
    // Todo objects
    const todoDiv = document.createElement('div');
    const remTodoDiv = document.createElement('div');
    remTodoDiv.classList = 'remTodoDiv';

    const remTodo = document.createElement('div');
    remTodo.classList = 'remove-Todo';
    todoDiv.classList = 'todos-container';
    remTodo.textContent = 'X';

    // object index in todoArray
    todoDiv.dataset.index = i;

    todoDiv.innerHTML = `<div class="todos" data-index="${i}">
    <div class="todoTitleDescContainer">
        <div class="todoTitle">
            <h2>${proj[i].getTitle()}</h2>
        </div>
        <div class="todoDescription">
            <p>${proj[i].getDescription()}</p>
        </div>
    </div>
    <div class="todoDatePrioContainer">
      <div class="todoDate">
          <p>${proj[i].getDueDate()}</p>
      </div>
      <div class="todoPriority">
          <p>${proj[i].getPriority()} priority</p>
      </div>
      <div class="removeButtonDiv">
      </div>
    </div>
</div>`;

    const title = proj[i].getTitle();
    const edit = document.createElement('button');
    const del = document.createElement('button');
    const addTodo = document.querySelector('.add-Todo');
    edit.classList = 'editTodo';
    edit.textContent = 'edit';
    del.classList = 'deleteTodo';
    del.textContent = 'delete';
    // console.log(remTodo);
    remTodo.addEventListener('click', () => {
      remTodoDiv.appendChild(edit);
      remTodoDiv.appendChild(del);
      addTodo.style.display = 'none';
      try {
        form.remove();
      } catch (TypeError) {

      }
      del.addEventListener('click', () => {
        ProjectsList.removeTodo(project, title);
        loopTodos(project);
      });
      edit.addEventListener('click', (e) => {
        // edit form func
        // console.log(e.target.parentElement.parentElement);
        const { index } = e.target.parentElement.parentElement.dataset;
        e.target.parentElement.parentElement.style.display = 'none';
        const mainContent = document.querySelector('.main-content');
        const formDiv = editForm(project, title);
        console.log(mainContent);
        console.log(formDiv);
        mainContent.appendChild(formDiv);
        const submit = document.querySelector('.form-submit');
        submit.addEventListener('click', (e) => {
          console.log(ProjectsList.getProject(project).getTodoList());
          const object = ProjectsList.getTodo(project, title);
          console.log(object);
          ProjectsList.removeTodo(project, title);
          // console.log(`${project} ${title}`);
          if (formHandler(e) === true) {
            console.log('git');
            // ProjectsList.removeTodo(project, title);
          } else {
            ProjectsList.addTodoObj(project, object);
          }
        });
      });
      remTodo.addEventListener('click', () => {
        loopTodos(project);
      });
      // console.log('removed');
      // loopTodos(project);
    });
    remTodoDiv.appendChild(remTodo);
    todoDiv.lastChild.appendChild(remTodoDiv);
    allTodosList.appendChild(todoDiv);
  }
  try {
    form.remove();
  } catch (TypeError) {

  }

  todoButton.style.display = 'inline';
  return allTodosList;
}
function editForm(project, title) {
  const mainContent = document.querySelector('main-content');
  const addButton = document.querySelector('.add-Todo');
  const proj = project;
  const object = ProjectsList.getTodo(project, title);

  addButton.style.display = 'none';
  const formDiv = document.createElement('div');
  formDiv.classList = 'form-div';
  const formContent = `<form method="post">
  <div class="form-inputs">
      <label for="form-title">Title:</label>
      <input class="form-title" type="text" value="${object.title}" required>
      <label for="form-duedate">Due Date:</label>
      <input class="form-duedate"type="date" value="${object.dueDate}" required>
  </div>
  <div class="form-textarea">
      <label for="textarea">Description:</label>
      <textarea class="textarea" name="textarea" rows="4" cols="50" placeholder="Description">${object.description}</textarea>
  </div>
  <div class="form-selects">
      <label for="priority">Choose Priority:</label>
      <select class="form-priority" name="priority" value="${object.priority}"> 
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
      </select>

      <label for="state">Choose State:</label>
      <select class="form-state" name="state" value="${object.state}">
          <option value="Active">Acive</option>
          <option value="Inactive">Inactive</option>
      </select>
  </div>
  <input class="form-submit" type="submit" value="Submit">
</form>`;
  formDiv.innerHTML = formContent;
  return formDiv;
}
function createForm() {
  const formDiv = document.createElement('div');
  formDiv.classList = 'form-div';
  const formContent = `<form method="post">
  <div class="form-inputs">
      <label for="form-title">Title:</label>
      <input class="form-title" type="text" placeholder="Title" required>
      <label for="form-duedate">Due Date:</label>
      <input class="form-duedate"type="date" required>
  </div>
  <div class="form-textarea">
      <label for="textarea">Description:</label>
      <textarea class="textarea" name="textarea" rows="4" cols="50" placeholder="Description"></textarea>
  </div>
  <div class="form-selects">
      <label for="priority">Choose Priority:</label>
      <select class="form-priority" name="priority">
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
      </select>

      <label for="state">Choose State:</label>
      <select class="form-state" name="state">
          <option value="Active">Acive</option>
          <option value="Inactive">Inactive</option>
      </select>
  </div>
  <input class="form-submit" type="submit" value="Submit">
</form>`;
  formDiv.innerHTML = formContent;
  return formDiv;
}
export {
  createAddProject, getButtName,
};
