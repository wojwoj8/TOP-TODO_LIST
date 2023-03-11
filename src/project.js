import {
  parseISO, format, differenceInDays,
} from 'date-fns';
import Todos from './todos';
import RemoveIcon from './remove.png';
import RemoveHoverIcon from './removeHover.png';
// SINGLE PROJECT OBJECT, TODO CONTAINS TODO OBJECTS
const Project = (name) => {
  const todo = [];

  const getName = () => name;
  const getTodoList = () => todo;

  const addTodo = (title, description, dueDate, priority, state, name) => {
    todo.push(Todos(title, description, dueDate, priority, state, name));
  };

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
    const project = getProject(projectName);

    const todoList = project.getTodoList();

    const todo = todoList.find((todo) => todo.getTitle() === title);

    return todo;
  };
  const addTodoObj = (projectName, object) => {
    const project = getProject(projectName);
    const todoList = project.getTodoList();
    todoList.push(object);
  };
  const removeTodo = (projectName, title) => {
    const deltodo = getTodo(projectName, title);
    const project = getProject(projectName);

    const todoList = project.getTodoList();
    todoList.splice(todoList.indexOf(deltodo), 1);
  };
  const list = () => projects;

  const initProjects = () => {
    const projectList = JSON.parse(localStorage.getItem('projects'));
    if (projectList === null) {
      addProject(Project('Inbox'));
      addProject(Project('Today'));
      addProject(Project('This Week'));

      setStorage();
      listAllTodos();
    } else {
      for (let i = 0; i < projectList.length; i++) {
        const projectObj = projectList[i];
        const project = Project(projectObj.name);
        const todoList = project.getTodoList();
        for (let j = 0; j < projectObj.todo.length; j++) {
          const todoData = projectObj.todo[j];
          todoList.push(Todos(
            todoData.title,
            todoData.description,
            todoData.dueDate,
            todoData.priority,
            todoData.state,
            todoData.projId,
          ));
        }
        addProject(project);
      }
    }
  };

  const setStorage = () => {
    const projectListData = projects.map((project) => ({
      name: project.getName(),
      todo: project.getTodoList().map((todo) => ({
        title: todo.getTitle(),
        description: todo.getDescription(),
        dueDate: todo.getDueDate(),
        priority: todo.getPriority(),
        state: todo.getState(),
        projId: todo.getProjId(),
      })),
    }));
    localStorage.setItem('projects', JSON.stringify(projectListData));
  };
  const addProjectToStorage = (projectName) => {
    addProject(projectName);
    setStorage();
  };
  const removeProjectFromStorage = (projectName) => {
    const projectListData = JSON.parse(localStorage.getItem('projects'));
    const projectIndex = projectListData.findIndex((project) => project.name === projectName);
    projectListData.splice(projectIndex, 1);
    removeProject(projectName);

    setStorage();
  };
  const addTodoToStorage = (projectName, title, description, date, priority, state, projId) => {
    getProject(projectName).addTodo(title, description, date, priority, state, projectName);
    setStorage();
  };
  // for edit
  const addTodoToStorageEdit = (projectName, object) => {
    addTodoObj(projectName, object);
    setStorage();
  };

  const removeTodoFromStorage = (project, title) => {
    removeTodo(project, title);
    setStorage();
  };

  // All todos from all projects
  const listAllTodos = () => {
    const todaysDate = new Date();
    todaysDate.setHours(0, 0, 0, 0);
    const today = getProject('Today');
    const thisWeek = getProject('This Week');
    today.todo.length = 0;
    thisWeek.todo.length = 0;

    const todoList = list();
    todoList.map((project) => {
      if (!(project.name === 'Today' || project.name === 'This Week')) {
        project.todo.map((todo) => {
          const todoDate = new Date(todo.dueDate);
          todoDate.setHours(0, 0, 0, 0);
          const x = (differenceInDays(todoDate, todaysDate));

          if (x <= 7 && x >= 0) {
            addTodoObj('This Week', todo);
          }
          if (x === 0) {
            addTodoObj('Today', todo);
          }
        });
      }
    });
  };

  initProjects();

  return {
    getProject,
    addProject,
    removeProject,
    list,
    getTodo,
    removeTodo,
    addTodoObj,
    setStorage,
    addProjectToStorage,
    removeProjectFromStorage,
    addTodoToStorage,
    addTodoToStorageEdit,
    removeTodoFromStorage,
    listAllTodos,
  };
})();

function getButtName() {
  const title = document.querySelector('.main-title');
  const buttons = document.querySelectorAll('[data-projectbutt]');

  buttons.forEach((e) => {
    if (!e.hasAttribute('data-clicked')) {
      e.setAttribute('data-clicked', 'true');
      e.parentElement.addEventListener('click', () => {
        try {
          e.parentElement.classList += ' active';
          console.log(e);
        } catch (TypeError) {
          return;
        }
        const active = document.querySelector('.active');
        if (active !== null) {
          console.log(active);
          if (document.querySelector('.user-proj active') === 1) {
            document.querySelector('.user-proj active').classList = 'user-proj';
            console.log(document.querySelector('.user-proj active').classList);
          }
          // active.classList = 'proj-container';
        }
        const mainContent = document.querySelector('.main-content');
        mainContent.innerHTML = '';
        // REMOVE BUTTON AND FORM FROM TODAY AND THIS WEEK

        if (e.id === 'thisWeek' || e.id === 'today') {
          addTodoButton(e);
          const button = document.querySelector('.add-Todo');
          button.remove();
          try {
            const form = document.querySelector('form');
            button.remove();
            form.remove();
            title.textContent = e.innerHTML;
          } catch (TypeError) {
            title.textContent = e.innerHTML;
          }
          ProjectsList.listAllTodos();
          loopTodos(e.innerHTML);
          const editDeleteButt = document.querySelectorAll('.remove-Todo');
          editDeleteButt.forEach((e) => {
            e.remove();
          });
          return;
        }
        addTodoButton(e);
        title.textContent = e.innerHTML;
        try {
          loopTodos(e.innerHTML);
        } catch (TypeError) {

        }
      });
    }
  });
}

function createAddProject() {
  const inputDiv = document.createElement('div');
  const buttDiv = document.createElement('div');
  const addProjectButt = document.getElementById('add-project').parentElement;
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
    addProjectButt.style.display = 'flex';
    inputField.value = '';
    inputDiv.remove();
    cancelButt.removeEventListener('click', cancelListener);
    addButt.removeEventListener('click', addListener);
  };

  const addListener = () => {
    const currentInput = inputField.value;
    if (ProjectsList.getProject(currentInput)) {
      alert('Project name cannot repeat');
    } else if (currentInput !== '') {
      const newButt = document.createElement('div');
      const remButt = new Image();
      remButt.src = RemoveIcon;

      remButt.classList = 'remove-proj-butt';
      const projDiv = document.createElement('div');
      projDiv.classList = 'user-proj';
      newButt.classList = 'new-proj-butt';
      newButt.textContent = inputField.value;
      newButt.dataset.projectbutt = '';
      projDiv.appendChild(newButt);
      projDiv.appendChild(remButt);
      addProjectButt.style.display = 'flex';
      addProject.appendChild(projDiv);
      inputField.value = '';
      inputDiv.remove();
      getButtName();

      ProjectsList.addProjectToStorage(Project(newButt.textContent));

      remButt.addEventListener('mouseover', () => {
        remButt.src = RemoveHoverIcon;
      });
      remButt.addEventListener('mouseleave', () => {
        remButt.src = RemoveIcon;
      });

      remButt.addEventListener('click', removeNewProject);
      cancelButt.removeEventListener('click', cancelListener);
      addButt.removeEventListener('click', addListener);
    } else {
      alert('Project name cannot be empty');
    }
  };

  addProjectButt.addEventListener('click', () => {
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

  ProjectsList.removeProjectFromStorage(projButt.textContent);
  projButt.remove();
  projDiv.remove();
  mainTitle.textContent = '';
  mainContent.innerHTML = '';
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

  button.addEventListener('click', () => {
    const formDiv = createForm();

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
    return false;
  }
}
function formHandler(event) {
  const titleElem = document.querySelector('.form-title');
  const descriptionElem = document.querySelector('textarea');
  const priorityElem = document.querySelector('.form-priority');
  const stateElem = document.querySelector('.form-state');

  // PROJECT NAME
  const project = document.querySelector('[data-name]').dataset.name;

  // FORM VALUES
  const date = dateValidation();
  const title = titleElem.value;
  const description = descriptionElem.value;
  const priority = priorityElem.value;
  const state = stateElem.value;
  let a = false;

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
    ProjectsList.addTodoToStorage(project, title, description, date, priority, state, project);
    loopTodos(project);
    const form = document.querySelector('.form-div');
    form.remove();

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
  let from = '';
  for (let i = 0; i < proj.length; i++) {
    // Todo objects
    if (project === 'Today' || project === 'This Week') {
      from = `(${proj[i].getProjId()})`;
    }
    const todoDiv = document.createElement('div');
    const remTodoDiv = document.createElement('div');
    remTodoDiv.classList = 'remTodoDiv';

    const remTodo = document.createElement('div');
    remTodo.classList = 'remove-Todo';
    todoDiv.classList = 'todos-container';
    remTodo.textContent = 'X';
    let todosClass = 'todoTitleDescContainer';

    if (proj[i].getState() === 'Inactive') {
      todosClass = 'todoTitleDescContainer inactive';
    }

    // object index in todoArray
    todoDiv.dataset.index = i;

    todoDiv.innerHTML = `<div class="todos" data-index="${i}">
    <div class="${todosClass}">
        <div class="todoTitle">
            <h2>${proj[i].getTitle()} ${from}</h2>
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

    remTodo.addEventListener('click', () => {
      remTodoDiv.appendChild(edit);
      remTodoDiv.appendChild(del);

      try {
        addTodo.style.display = 'none';
        form.remove();
      } catch (TypeError) {

      }
      del.addEventListener('click', () => {
        ProjectsList.removeTodoFromStorage(project, title);
        loopTodos(project);
      });
      edit.addEventListener('click', (e) => {
        // edit form func
        e.target.parentElement.parentElement.style.display = 'none';
        const mainContent = document.querySelector('.main-content');
        const formDiv = editForm(project, title);

        mainContent.appendChild(formDiv);
        const submit = document.querySelector('.form-submit');
        submit.addEventListener('click', (e) => {
          const object = ProjectsList.getTodo(project, title);
          ProjectsList.removeTodoFromStorage(project, title);
          if (formHandler(e) === true) {

          } else {
            ProjectsList.addTodoToStorageEdit(project, object);
          }
        });
      });
      remTodo.addEventListener('click', () => {
        loopTodos(project);
      });
    });
    remTodoDiv.appendChild(remTodo);
    todoDiv.lastChild.appendChild(remTodoDiv);
    allTodosList.appendChild(todoDiv);
  }
  try {
    form.remove();
    todoButton.style.display = 'inline';
  } catch (TypeError) {

  }

  return allTodosList;
}
function editForm(project, title) {
  const addButton = document.querySelector('.add-Todo');
  const object = ProjectsList.getTodo(project, title);

  try {
    addButton.style.display = 'none';
  } catch (TypeError) {

  }

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

function renderProjects() {
  const addProject = document.querySelector('.new-projects');
  for (let i = 3; i < ProjectsList.list().length; i++) {
    const currentInput = Project(ProjectsList.list()[i].name);

    const newButt = document.createElement('div');
    const remButt = new Image();
    remButt.src = RemoveIcon;
    const projDiv = document.createElement('div');
    projDiv.classList = 'user-proj';
    newButt.classList = 'new-proj-butt';
    newButt.textContent = currentInput.name;
    newButt.dataset.projectbutt = '';
    remButt.classList = 'remove-proj-butt';
    remButt.addEventListener('click', removeNewProject);
    projDiv.appendChild(newButt);
    projDiv.appendChild(remButt);

    addProject.appendChild(projDiv);
    getButtName();
    remButt.addEventListener('mouseover', () => {
      remButt.src = RemoveHoverIcon;
    });
    remButt.addEventListener('mouseleave', () => {
      remButt.src = RemoveIcon;
    });
  }
}

export {
  createAddProject, getButtName, renderProjects,
};
