// Selecting Elements
const todoForm = document.querySelector("form"); // Selects the form element
const todoInput = document.getElementById("todo-input"); // Selects input field
const todoListUL = document.getElementById("todo-list"); // Selects the list that displays tasks
// Stores all tasks in an array
let allTodos = [];

/**
 * Function to add a new to-do item.
 * - Retrieves the user's input.
 * - Checks if it's non-empty before adding it to the list.
 * - Updates the UI after adding a task.
 */
function addTodo() {
  const todoText = todoInput.value.trim(); // Gets the typed value - removes extra spaces at the start and end of the value.

  if (todoText.length > 0) {
    allTodos.unshift(todoText); // Adds new task to the top of the array
    todoInput.value = ""; // Clears the input field by setting an empty string
    updateTodoList(); // Updates the UI after adding a task
  } else {
    alert("Oops! You need to enter a task before adding it to the list."); // Alerts the user if they submit an empty task
  }
}

/**
 * Function to update the displayed to-do list.
 * - Clears the existing list.
 * - Loops through the stored tasks and creates UI elements for each.
 */
function updateTodoList() {
  todoListUL.innerHTML = ""; // Replaces old list with the existing tasks plus the new task.
  allTodos.forEach((todo, todoIndex) => {
    const todoItem = createTodoItem(todo, todoIndex); // Creates a new list item for each task
    todoListUL.append(todoItem); // Adds the new task to the UI
  });
}

/**
 * Function to create a new to-do list item.
 * - Generates a unique ID for the task.
 * - Defines the HTML structure including a checkbox, labels, and delete button.
 * - Returns the created list item.
 */
function createTodoItem(todo, todoIndex) {
  const todoId = "todo-" + todoIndex; // Generates a unique ID for each item
  const todoLI = document.createElement("li"); // Creates a new <li> element
  todoLI.className = "todo"; // Adds a CSS class for styling

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

/**
 * Event listener for the "submit" event on the form.
 * - Prevents auto-refresh after submission.
 * - Calls function to add a new task.
 */
todoForm.addEventListener("submit", function (e) {
  e.preventDefault(); // Prevents auto-refresh after submission
  addTodo(); // Calls function to add a new task
});
