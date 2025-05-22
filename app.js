// Selects the form element
const todoForm = document.querySelector("form");

// Selects the input field where users type their tasks
const todoInput = document.getElementById("todo-input");

// Selects the unordered list (UL) that displays to-do items
const todoListUL = document.getElementById("todo-list");

// Creates an empty array to store all to-do items
let allTodos = [];

// Listens for the "submit" event on the form
todoForm.addEventListener("submit", function (e) {
  e.preventDefault(); // Prevents auto-refresh after submission
  addTodo(); // Calls function to add a new task
});

// Function to add a new to-do item
function addTodo() {
  const todoText = todoInput.value.trim(); // Gets input value and removes extra spaces
  if (todoText.length > 0) {
    // Checks if input is not empty
    allTodos.push(todoText); // Adds new task to the array
    updateTodoList(); // Updates the UI after adding a task
    todoInput.value = ""; // Clears the input field
  } else {
    alert("Please enter a task before submitting!"); // Alerts the user if they submit an empty task
  }
}

// Function to update the displayed to-do list
function updateTodoList() {
  todoListUL.innerHTML = ""; // Clears old list before updating
  allTodos.forEach((todo, todoIndex) => {
    // Loops through all to-do items
    const todoItem = createTodoItem(todo, todoIndex); // Creates a new list item for each task
    todoListUL.append(todoItem); // Adds the new task to the UI
  });
}

// Function to create a new to-do list item
function createTodoItem(todo, todoIndex) {
  const todoId = "todo-" + todoIndex; // Generates a unique ID for each item
  const todoLI = document.createElement("li"); // Creates a new <li> element
  todoLI.className = "todo"; // Adds a CSS class for styling

  // Defines the HTML structure of the to-do item, including a checkbox, labels, and a delete button
  todoLI.innerHTML = `    
    <input type="checkbox" id="${todoId}"> <!-- Checkbox for marking task completion -->
    <label class="custom-checkbox" for="${todoId}"> <!-- Custom-styled checkbox -->
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="transparent">
            <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
        </svg>
    </label>
    <label for="${todoId}" class="todo-txt">${todo}</label> <!-- Displays the task text -->
    <button class="delete-btn"> <!-- Delete button to remove the task -->
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px">
            <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
        </svg>
    </button>
  `;

  return todoLI; // Returns the created list item
}
