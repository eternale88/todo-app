'use strict';

// Read existing notes from local storage
const getSavedTodos = () => {
  const todosJSON = localStorage.getItem('todos');

  try {
    return todosJSON ? JSON.parse(todosJSON) : [];
  } catch (e) {
    return [];
  }
};

//Save notes to local storage
const saveTodos = (todos) => {
  localStorage.setItem('todos', JSON.stringify(todos));
};

//Render application todos based on filters
const renderTodos = (todos, filters) => {
  let filteredTodos = todos.filter((todo) =>
    todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
  );

  filteredTodos = filteredTodos.filter((todo) => {
    if (filters.hideCompleted) {
      return !todo.completed; //show todos not completed
    } else {
      return true; // if not checked, every single one stays in this filter
    }
  });
  //Print a summary message how many todos left to complete
  //"You have 2 todos left"
  const todosLeft = filteredTodos.filter((todo) => !todo.completed);

  document.querySelector('#todos').innerHTML = '';

  document.querySelector('#todos').appendChild(generateSummaryDOM(todosLeft));

  if (filteredTodos.length > 0) {
    //Add a p for each todo above (use text value)
    filteredTodos.forEach((todo) => {
      document.querySelector('#todos').appendChild(generateTodoDOM(todo));
    });
  } else {
    const message = document.createElement('p');
    message.textContent = 'Not to-dos to show';
    message.classList.add('empty-message');
    document.querySelector('#todos').appendChild(message);
  }
};

// Remove button by ID
const removeTodos = (id) => {
  const todoIndex = todos.findIndex((todo) => todo.id === id);

  if (todoIndex > -1) {
    todos.splice(todoIndex, 1);
  }
};

// Toggle todo based when checkbox is checked or unchecked
const toggleTodo = (id) => {
  const todo = todos.find((todo) => todo.id === id);

  if (todo) {
    todo.completed = !todo.completed;
  }
};

//Get the DOM elements for an individual todo
const generateTodoDOM = (todo) => {
  const todoEl = document.createElement('label');
  const containerEl = document.createElement('div');
  const todoCheckBox = document.createElement('input');
  const todoText = document.createElement('span');
  const removeButton = document.createElement('button');

  // Setup todo checkbox
  todoCheckBox.setAttribute('type', 'checkbox');
  todoCheckBox.checked = todo.completed;
  containerEl.appendChild(todoCheckBox);
  todoCheckBox.addEventListener('change', (e) => {
    toggleTodo(todo.id);
    saveTodos(todos);
    renderTodos(todos, filters);
  });

  //Setup todo text
  todoText.textContent = todo.text;
  containerEl.appendChild(todoText);

  // setup container
  todoEl.classList.add('list-item');
  containerEl.classList.add('list-item__container');
  todoEl.appendChild(containerEl);

  //Setup remove button
  removeButton.textContent = 'remove';
  removeButton.classList.add('button', 'button--text');
  todoEl.appendChild(removeButton);
  removeButton.addEventListener('click', () => {
    removeTodos(todo.id);
    saveTodos(todos);
    renderTodos(todos, filters);
  });

  return todoEl;
};

const generateSummaryDOM = (todosLeft) => {
  const summary = document.createElement('h2');
  const plural = todosLeft.length === 1 ? '' : 's';
  summary.classList.add('list-title');
  summary.textContent = `You have ${todosLeft.length} todo${plural} left`;

  return summary;
};
