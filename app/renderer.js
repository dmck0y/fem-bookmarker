const { shell, remote } = require('electron');
const systemPreferences = remote.systemPreferences;

const newLinkUrl = document.querySelector('#new-link-url');
const newLinkSubmit = document.querySelector('.new-link-form--submit');
const newLinkForm = document.querySelector('.new-link-form');
const linkTemplate = document.querySelector('#link-template');
const linkSection = document.querySelector('.links');

linkSection.addEventListener('click', e => {
  if (e.target.href) {
    e.preventDefault();
    shell.openExternal(e.target.href);
  }
});

newLinkUrl.addEventListener('keyup', () => {
  newLinkSubmit.disabled = !newLinkUrl.validity.valid;
});

const parser = new DOMParser();
const parseRes = text => parser.parseFromString(text, 'text/html');
const findTitle = nodes => nodes.querySelector('title').textContent;

const addToPage = ({title, url}) => {
  const newLink = linkTemplate.content.cloneNode(true);
  const titleElement = newLink.querySelector('.link--title');
  const urlElement = newLink.querySelector('.link--url');

  titleElement.textContent = title;
  urlElement.href = url;
  urlElement.textContent = url;

  linkSection.appendChild(newLink);
  return { title, url };
};

newLinkForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const url = newLinkUrl.value;

  fetch(url)
    .then(res => res.text())
    .then(parseRes)
    .then(findTitle)
    .then(title => ({title, url}))
    .then(addToPage)
    .then(title => console.log(title))
    .catch(err => console.error(err));
});

window.addEventListener('load', () => {
  if (systemPreferences.isDarkMode()) {
    document.querySelector('link').href = 'styles-dark.css';
  }
});
