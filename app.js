// Selecting Elements
const todoForm = document.querySelector("form"); // Selects the form element
const todoInput = document.getElementById("todo-input"); // Selects input field
const todoListUL = document.getElementById("todo-list"); // Selects the list that displays tasks

// Stores all tasks in an array
let allTodos = getTodos();
updateTodoList();

/**
 * Event listener for the "submit" event on the form.
 * - Prevents auto-refresh after submission.
 * - Calls function to add a new task.
 */
todoForm.addEventListener("submit", function (e) {
  e.preventDefault(); // Prevents auto-refresh after submission
  addTodo(); // Calls function to add a new task
});

/**
 * Function to add a new to-do item.
 * - Retrieves the user's input.
 * - Checks if it's non-empty before adding it to the list.
 * - Stores task in an object with a completed status.
 * - Updates the UI after adding a task.
 */
function addTodo() {
  const todoText = todoInput.value.trim(); // Gets the typed value - removes extra spaces at the start and end

  if (todoText.length > 0) {
    const todoObject = {
      text: todoText,
      completed: false, // Initializes task as incomplete
    };

    allTodos.unshift(todoObject); // Adds new task to the top of the array
    todoInput.value = ""; // Clears the input field
    updateTodoList(); // Updates the UI after adding a task
    saveTodos();
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
  todoListUL.innerHTML = ""; // Replaces old list with the existing tasks plus the new task
  allTodos.forEach((todo, todoIndex) => {
    const todoItem = createTodoItem(todo, todoIndex); // Creates a new list item for each task
    todoListUL.append(todoItem); // Adds the new task to the UI
  });
}

/**
 * Function to create a new to-do list item.
 * - Generates a unique ID for the task.
 * - Defines the HTML structure including a checkbox, labels, and delete button.
 * - Adds event listeners for task completion and deletion.
 * - Returns the created list item.
 */
function createTodoItem(todo, todoIndex) {
  const todoId = "todo-" + todoIndex; // Generates a unique ID for each item
  const todoLI = document.createElement("li"); // Creates a new <li> element
  const todoText = todo.text;
  todoLI.className = "todo"; // Adds a CSS class for styling

  todoLI.innerHTML = `    
    <input type="checkbox" id="${todoId}"> <!-- Checkbox for marking task completion -->
    <label class="custom-checkbox" for="${todoId}"> <!-- Custom-styled checkbox -->
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="transparent">
            <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
        </svg>
    </label>
    <label for="${todoId}" class="todo-txt">${todoText}</label> <!-- Displays the task text -->
    <button class="edit-btn">
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px">
        <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>
    </button> 
    <button class="delete-btn"> <!-- Delete button to remove the task -->
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px">
            <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
        </svg>
    </button>
`;

  // Add event listener to delete button
  const deletebtn = todoLI.querySelector(".delete-btn");
  deletebtn.addEventListener("click", () => {
    deleteTodoItem(todoIndex);
  });

  // Add event listener to checkbox to mark task as completed
  const checkbox = todoLI.querySelector("input");
  checkbox.addEventListener("change", () => {
    allTodos[todoIndex].completed = checkbox.checked; // Updates completion status
    saveTodos(); // Saves the updated task list
  });

  // Set checkbox state based on stored completion status
  checkbox.checked = todo.completed;

  return todoLI; // Returns the created list item
}

/**
 * Function to delete a to-do item.
 * - Removes the selected task from the array.
 * - Updates localStorage with the new task list.
 * - Refreshes the UI.
 */
function deleteTodoItem(todoIndex) {
  allTodos = allTodos.filter((_, i) => i !== todoIndex); // Filters out the selected task
  saveTodos(); // Saves the updated task list to localStorage
  updateTodoList(); // Refreshes the UI to reflect changes
}

/**
 * Function to save the to-do list to localStorage.
 * - Converts the task array into a JSON string.
 * - Stores the string in localStorage under the key "todos".
 */
function saveTodos() {
  const todoJson = JSON.stringify(allTodos); // Converts the array into a JSON string
  localStorage.setItem("todos", todoJson); // Saves the JSON string in localStorage
}

/**
 * Function to retrieve the stored to-do list from localStorage.
 * - Retrieves the stored JSON string or defaults to an empty array.
 * - Parses the JSON string back into an array format.
 */
function getTodos() {
  const todos = localStorage.getItem("todos") || "[]"; // Retrieves stored tasks or defaults to an empty array
  return JSON.parse(todos); // Parses the JSON string into a JavaScript array
}
