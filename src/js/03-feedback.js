import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const input = document.querySelector('.feedback-form input');
const textarea = document.querySelector('.feedback-form textarea');
const STORAGE_KEY = 'feedback-form-state';
const saveData = throttle(data => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}, 500);

form.addEventListener('input', onFormInput);
form.addEventListener('submit', onFormSubmit);

onPageLoad();

function onFormInput(event) {
  event.preventDefault();
  const data = {
    email: event.currentTarget.elements.email.value,
    message: event.currentTarget.elements.message.value,
  };
  saveData(data);
}

function onPageLoad(form) {
  const formValue = localStorage.getItem(STORAGE_KEY);
  if (formValue) {
    const parsedFormValue = JSON.parse(formValue);
    input.value = parsedFormValue.email;
    textarea.value = parsedFormValue.message;
  }
}
function onFormSubmit(event) {
  event.preventDefault();
  const data = {
    email: event.currentTarget.elements.email.value,
    message: event.currentTarget.elements.message.value,
  };
  console.log(data);
  event.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}