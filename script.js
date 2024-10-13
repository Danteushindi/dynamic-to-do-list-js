// Setup Event Listener for Page Load
document.addEventListener('DOMContentLoaded', () => {
    // Select DOM Elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Initialize tasks array
    let tasks = [];

    // Function to load tasks from Local Storage
    function loadTasks() {
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
            tasks = JSON.parse(storedTasks);
            tasks.forEach(taskText => createTaskElement(taskText));
        }
    }

    // Function to create a task element
    function createTaskElement(taskText) {
        // Create a new li element
        const listItem = document.createElement('li');
        listItem.textContent = taskText;

        // Create a new button element for removing the task
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.className = 'remove-btn';

        // Assign an onclick event to the remove button
        removeButton.onclick = function() {
            removeTask(taskText, listItem);
        };

        // Append the remove button to the li element
        listItem.appendChild(removeButton);
        // Append the li to taskList
        taskList.appendChild(listItem);
    }

    // Function to add a task
    function addTask() {
        // Retrieve and trim the value from the task input field
        const taskText = taskInput.value.trim();

        // Check if taskText is not empty
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        // Add the task to the tasks array and create the task element
        tasks.push(taskText);
        createTaskElement(taskText);

        // Save updated tasks to Local Storage
        saveTasks();

        // Clear the task input field
        taskInput.value = '';
    }

    // Function to remove a task
    function removeTask(taskText, listItem) {
        // Remove the task from the tasks array
        tasks = tasks.filter(task => task !== taskText);
        taskList.removeChild(listItem);

        // Update Local Storage with the new tasks array
        saveTasks();
    }

    // Function to save tasks to Local Storage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Attach Event Listeners
    addButton.addEventListener('click', addTask);
    
    // Allow tasks to be added by pressing the “Enter” key
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Load tasks from Local Storage when the page loads
    loadTasks();
});
