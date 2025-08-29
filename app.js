// First, we grab the key elements from the HTML:
// - The form where users type their tasks
// - The input field itself
// - The unordered list where tasks will be displayed
const todoForm = document.querySelector("form"); // Selects the form element
const todoInput = document.getElementById("todo-input"); // Selects input field
const todoListUL = document.getElementById("todo-list"); // Selects the list that displays tasks

// We load any previously saved tasks from localStorage
// and immediately update the UI to show them
let allTodos = getTodos(); // Retrieves stored tasks from localStorage
updateTodoList(); // Displays the tasks in the UI

// Now we listen for the form submission event.
// When the user hits "Enter" or clicks the submit button,
// we stop the page from refreshing and call the function to add a new task.
todoForm.addEventListener("submit", function (e) {
  e.preventDefault(); // Prevents auto-refresh after submission
  addTodo(); // Calls function to add a new task
});

// This function handles adding a new task.
// It grabs the text from the input field, trims it,
// and checks if it's not empty.
function addTodo() {
  const todoText = todoInput.value.trim(); // Gets the typed value - removes extra spaces at the start and end

  // If the input isn't empty, we create a new task object
  // with the text and a default "not completed" status.
  if (todoText.length > 0) {
    const todoObject = {
      text: todoText, // Stores the task text
      completed: false, // Initializes task as incomplete
    };

    // We add the new task to the beginning of the array,
    // clear the input field, update the UI, and save the list.
    allTodos.unshift(todoObject); // Adds new task to the top of the array
    todoInput.value = ""; // Clears the input field
    updateTodoList(); // Updates the UI after adding a task
    saveTodos(); // Saves the updated task list to localStorage
  } else {
    // If the input is empty, we alert the user.
    alert("Oops! You need to enter a task before adding it to the list."); // Alerts the user if they submit an empty task
  }
}

// This function refreshes the task list in the UI.
// It clears the current list and rebuilds it from the array.
function updateTodoList() {
  todoListUL.innerHTML = ""; // Clears the existing list
  allTodos.forEach((todo, todoIndex) => {
    const todoItem = createTodoItem(todo, todoIndex); // Creates a new list item for each task
    todoListUL.append(todoItem); // Adds the new task to the UI
  });
}

// This function creates the HTML for each task.
// It builds a list item with a checkbox, task text, edit button, and delete button.
function createTodoItem(todo, todoIndex) {
  const todoId = "todo-" + todoIndex; // Generates a unique ID for each item
  const todoLI = document.createElement("li"); // Creates a new <li> element
  const todoText = todo.text; // Retrieves the task text
  todoLI.className = "todo"; // Adds a CSS class for styling

  // We build the inner HTML structure:
  // - A checkbox to mark completion
  // - A label for styling the checkbox
  // - A label to show the task text
  // - An edit button to change the task
  // - A delete button to remove the task
  todoLI.innerHTML = `    
    <input type="checkbox" id="${todoId}"> <!-- Checkbox for marking task completion -->
    <label class="custom-checkbox" for="${todoId}"> <!-- Custom-styled checkbox -->
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="transparent">
            <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
        </svg>
    </label>
    <label for="${todoId}" class="todo-txt">${todoText}</label> <!-- Displays the task text -->
    <button class="edit-btn"> <!-- Edit button to modify the task -->
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px">
        <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>
    </button> 
    <button class="delete-btn"> <!-- Delete button to remove the task -->
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px">
            <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
        </svg>
    </button>
`;

  // We add functionality to the delete button.
  // When clicked, it removes the task from the array and updates the UI.
  const deleteBtn = todoLI.querySelector(".delete-btn"); // Selects the delete button
  deleteBtn.addEventListener("click", () => {
    deleteTodoItem(todoIndex); // Calls function to delete the task
  });

  // We add functionality to the edit button.
  // When clicked, it opens a prompt with the current task text.
  // The user can edit it, and if they submit valid text,
  // we update the task and refresh the list.
  const editBtn = todoLI.querySelector(".edit-btn"); // Selects the edit button
  editBtn.addEventListener("click", () => {
    editTodoItem(todoIndex); // Calls function to edit the task
  });

  function editTodoItem(todoIndex) {
    const currentText = allTodos[todoIndex].text; // Gets the current task text
    const newText = prompt("Edit your task:", currentText); // Prompts the user to edit the task

    if (newText !== null && newText.trim().length > 0) {
      allTodos[todoIndex].text = newText.trim(); // Updates the task with new text
      saveTodos(); // Saves the updated task list
      updateTodoList(); // Refreshes the UI
    }
  }

  // We handle the checkbox interaction.
  // When the user checks or unchecks it,
  // we update the task's completion status and save the change.
  const checkbox = todoLI.querySelector("input"); // Selects the checkbox
  checkbox.addEventListener("change", () => {
    allTodos[todoIndex].completed = checkbox.checked; // Updates completion status
    saveTodos(); // Saves the updated task list
  });

  // We make sure the checkbox reflects the saved status.
  checkbox.checked = todo.completed; // Sets checkbox state based on stored value

  // Finally, we return the fully built list item to be added to the UI.
  return todoLI; // Returns the created list item
}

// This function deletes a task.
// It filters out the selected task from the array,
// saves the updated list, and refreshes the UI.
function deleteTodoItem(todoIndex) {
  allTodos = allTodos.filter((_, i) => i !== todoIndex); // Removes the selected task from the array
  saveTodos(); // Saves the updated task list to localStorage
  updateTodoList(); // Refreshes the UI to reflect changes
}

// This function saves the task list to localStorage.
// It converts the array into a JSON string and stores it.
function saveTodos() {
  const todoJson = JSON.stringify(allTodos); // Converts the array into a JSON string
  localStorage.setItem("todos", todoJson); // Saves the JSON string in localStorage
}

// This function retrieves the saved task list from localStorage.
// If nothing is saved, it returns an empty array.
function getTodos() {
  const todos = localStorage.getItem("todos") || "[]"; // Retrieves stored tasks or defaults to an empty array
  return JSON.parse(todos); // Parses the JSON string into a JavaScript array
}
