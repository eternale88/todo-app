'use strict'

let todos = getSavedTodos()

const filters = {
  searchText: '',
  hideCompleted: false
}

renderTodos(todos, filters)

//add event listener to 'filter todo' input
document.querySelector('#search-text').addEventListener('input', (e) => {
  filters.searchText = e.target.value
  renderTodos(todos, filters)
})

//event listener for adding todo
document.querySelector('#todo-form').addEventListener('submit', (e) => {
  const text = e.target.elements.text.value.trim() // trims out any empty white space taht are entered
  e.preventDefault()

  if (text.length > 0) {
    todos.push({
      id: uuidv4(),
      text: text,
      completed: false
    })
    saveTodos(todos)
    renderTodos(todos, filters)
    e.target.elements.text.value = '' //clear input field
  }
})

//event listener for hide completed checkbox

document.querySelector('#hide-completed').addEventListener('change', (e) => {
  filters.hideCompleted = e.target.checked
  renderTodos(todos, filters)
})
