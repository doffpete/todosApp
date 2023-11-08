//MY CONST VARIABLES
const todoInput = document.getElementById("input_todo");
const todosContainer = document.getElementById("todos_container");
const pendingBtn = document.getElementById("pending");
const completedBtn = document.getElementById("completed");
const allTodosBtn = document.getElementById("all_todos");

// TODO ARRAY INITIALIZED;
let todos = JSON.parse(localStorage.getItem("todos")) || [];

displayTodo(todos);

// TO ADD TODO ELEMENTS TO THE ARRAY
function addTodo() {
  const todoValue = todoInput.value.trim();
  const isDuplicate = todos.some(
    (todo) => todo.value.toLowerCase() === todoValue.toLowerCase()
  );

  if (todoValue === "") {
    alert("you must type in a todo!!");
  } else if (isDuplicate) {
    alert("This todo already exists!!");
  } else {
    const todo = {
      value: todoValue,
      checked: false,
    };

    todos.push(todo);

    todos = todos.reverse();

    displayTodo(todos);
    updateLS();
    setFocusToTextBox();
  }

  todoInput.value = "";
}

// TO RENDER TODO ELEMENTS TO THE UI
function displayTodo(todoArray) {
  if (todoArray.length <= 0) {
    toggleTodoContainerDisplay();

    return;
  }

  todosContainer.innerHTML = "";
  todoArray.forEach((todo, index) => {
    todosContainer.innerHTML += `
    <div class="todo" id=${index}>
    <i class="bi ${todo.checked ? "bi-check-circle-fill" : "bi-circle"}"
    data-action="check";
    ></i>
    <p class="${todo.checked ? "checked" : "unchecked"}"
    data-action="check">${todo.value}</p>
    
    <i class="bi bi-trash" data-action="delete"></i>
  </div>
   `;
  });

  toggleTodoContainerDisplay();
}

// ADD CLICK FUNCTION TO THE ICONS
todosContainer.addEventListener("click", (e) => {
  const target = e.target;

  const parentElement = target.parentElement;

  if (parentElement.className !== "todo") return;

  // get specific todo id
  const todo = parentElement;
  const todoId = Number(todo.id);

  // TARGETING THE ACTION
  const action = target.dataset.action;
  console.log(action);

  action === "check" && checkTodo(todoId);

  action === "delete" && deleteTodo(todoId);
});

function checkTodo(todoId) {
  todos = todos.map((todo, index) => {
    return {
      value: todo.value,
      checked: index === todoId ? !todo.checked : todo.checked,
    };
  });

  displayTodo(todos);
  updateLS();
}

function deleteTodo(todoId) {
  todos.splice(todoId, 1);

  displayTodo(todos);
  updateLS();
  setFocusToTextBox();
}

function toggleTodoContainerDisplay() {
  if (todos.length > 0 && todosContainer.style.display === "none") {
    todosContainer.style.display = "block";
  } else if (todos.length <= 0 && todosContainer.style.display !== "none") {
    todosContainer.style.display = "none";
  }
}

function showPendingTodo() {
  const pendingTodos = todos.filter((todo) => !todo.checked);
  displayTodo(pendingTodos);
}

function showCompletedTodo() {
  const completedTodos = todos.filter((todo) => todo.checked);
  displayTodo(completedTodos);
  updateLS();
}

function showAllTodos() {
  displayTodo(todos);
  setFocusToTextBox();
  updateLS();
}

function setFocusToTextBox() {
  todoInput.focus();
}

//SAVE TO LOCALSTORAGE

function updateLS() {
  localStorage.setItem("todos", JSON.stringify(todos));
}
