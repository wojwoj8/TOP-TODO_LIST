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
  sidebar.classList = 'sidebar';

  return sidebar;
}
function createMain() {
  const main = document.createElement('div');
  main.classList = 'main';

  return main;
}
function createFooter() {
  const footer = document.createElement('div');
  footer.classList = 'footer';
  return footer;
}
function webInit() {
  const content = document.querySelector('#content');
  content.appendChild(createHeader());
  content.appendChild(createSidebar());
  content.appendChild(createMain());
  content.appendChild(createFooter());
  return content;
}
export default webInit;
