import { toDate } from 'date-fns';
import Todos from './scripts';
import {
  createAddProject, Project, getButtName, ProjectsList,
} from './project';

function createHeader() {
  const header = document.createElement('div');
  const title = document.createElement('h1');

  header.classList = 'header';
  title.textContent = 'TODO LIST';
  header.appendChild(title);

  return header;
}

function createSidebar() {
  const sidebar = document.createElement('div');
  const defaultDiv = document.createElement('div');
  const newProjectsDiv = document.createElement('div');
  const inbox = document.createElement('button');
  const addproject = document.createElement('button');
  const projectsTitle = document.createElement('h2');
  const today = document.createElement('button');
  const thisWeek = document.createElement('button');

  today.textContent = 'Today';
  today.classList = 'default-project-butt';
  today.setAttribute('id', 'today');

  thisWeek.textContent = 'This Week';
  thisWeek.classList = 'default-project-butt';
  thisWeek.setAttribute('id', 'thisWeek');

  newProjectsDiv.classList = 'new-projects';
  defaultDiv.classList = 'default-projects';

  projectsTitle.textContent = 'Projects';

  addproject.textContent = 'Add Project';
  addproject.classList = 'add-project-butt';
  addproject.setAttribute('id', 'add-project');

  inbox.textContent = 'Inbox';
  inbox.classList = 'default-project-butt';
  inbox.setAttribute('id', 'inbox');

  defaultDiv.appendChild(inbox);
  defaultDiv.appendChild(today);
  defaultDiv.appendChild(thisWeek);

  newProjectsDiv.appendChild(projectsTitle);
  newProjectsDiv.appendChild(addproject);

  sidebar.classList = 'sidebar';
  sidebar.appendChild(defaultDiv);
  sidebar.appendChild(newProjectsDiv);

  // projects.getName('inbox');

  return sidebar;
  // return { sidebar, projects };
}

function createMain() {
  const main = document.createElement('div');
  const mainProjectTitle = document.createElement('h2');

  mainProjectTitle.classList = 'main-title';
  mainProjectTitle.textContent = '';
  main.classList = 'main';

  main.appendChild(mainProjectTitle);

  return main;
}
function createFooter() {
  const footer = document.createElement('div');
  //   const createdBy = document.createElement('p');
  footer.innerHTML = '<p>Created by <a href="https://github.com/wojwoj8">wojwoj8</a></p>';
  //   createdBy.textContent = 'Created By '
  footer.classList = 'footer';
  return footer;
}

// function createAddToDo() {
//   const
// }

function webInit() {
  const content = document.querySelector('#content');
  content.appendChild(createHeader());
  content.appendChild(createSidebar());
  content.appendChild(createMain());
  content.appendChild(createFooter());
  getButtName();
  createAddProject();

  return content;
}
export default webInit;