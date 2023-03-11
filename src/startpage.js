import {
  createAddProject, getButtName, renderProjects,
} from './project';

import HeaderIcon from './check.png';
import InboxIcon from './inbox.png';
import TodayIcon from './today.png';
import ThisWeekIcon from './thisWeek.png';

function createHeader() {
  const header = document.createElement('div');
  const title = document.createElement('h1');

  header.classList = 'header';
  title.textContent = 'TODO LIST';
  header.appendChild(title);

  const headerIcon = new Image();
  headerIcon.src = HeaderIcon;
  header.appendChild(headerIcon);

  return header;
}

function createSidebar() {
  const sidebar = document.createElement('div');
  const defaultDiv = document.createElement('div');
  const newProjectsDiv = document.createElement('div');
  const inbox = document.createElement('div');
  const addproject = document.createElement('div');
  const projectsTitle = document.createElement('h2');
  const today = document.createElement('div');
  const thisWeek = document.createElement('div');
  const inboxDiv = document.createElement('div');
  const todayDiv = document.createElement('div');
  const thisWeekDiv = document.createElement('div');

  todayDiv.classList = 'proj-container';
  thisWeekDiv.classList = 'proj-container';

  today.textContent = 'Today';
  today.classList = 'default-project-butt';
  today.setAttribute('id', 'today');
  today.dataset.projectbutt = '';

  const todayIcon = new Image();
  todayIcon.src = TodayIcon;
  todayDiv.appendChild(todayIcon);

  todayDiv.appendChild(today);

  thisWeek.textContent = 'This Week';
  thisWeek.classList = 'default-project-butt';
  thisWeek.setAttribute('id', 'thisWeek');
  thisWeek.dataset.projectbutt = '';

  const thisWeekIcon = new Image();
  thisWeekIcon.src = ThisWeekIcon;
  thisWeekDiv.appendChild(thisWeekIcon);
  thisWeekDiv.appendChild(thisWeek);

  newProjectsDiv.classList = 'new-projects';
  defaultDiv.classList = 'default-projects';

  projectsTitle.textContent = 'Projects';

  addproject.textContent = 'Add Project';
  addproject.classList = 'add-project-butt';
  addproject.setAttribute('id', 'add-project');

  inbox.textContent = 'Inbox';
  inbox.classList = 'default-project-butt';
  inbox.setAttribute('id', 'inbox');
  inbox.dataset.projectbutt = '';

  const inboxIcon = new Image();
  inboxIcon.src = InboxIcon;

  inboxDiv.classList = 'proj-container';
  inboxDiv.appendChild(inboxIcon);
  inboxDiv.appendChild(inbox);

  defaultDiv.appendChild(inboxDiv);
  defaultDiv.appendChild(todayDiv);
  defaultDiv.appendChild(thisWeekDiv);

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
  const mainContent = document.createElement('div');

  mainContent.classList = 'main-content';

  mainProjectTitle.classList = 'main-title';
  mainProjectTitle.textContent = '';
  main.classList = 'main';

  main.appendChild(mainProjectTitle);
  main.appendChild(mainContent);

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
  renderProjects();

  return content;
}
export default webInit;
