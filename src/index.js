import _ from 'lodash';
import './style.css';
import editIcon from './editIcon.png';
import deleteIcon from './deleteIcon.png';

let projectList = [];
let notesList = [];
let todoList = [];

// Function to update the counter for a specific task type
function updateTaskCounter(taskType) {
    const noteTabCounter = document.getElementById('note-tab-counter'); 
    const projectsTabCounter = document.getElementById('projects-tab-counter');
    const todoTabCounter = document.getElementById('todo-tab-counter');

    if (projectList.length > 0){
        projectsTabCounter.style.display = 'flex';
        projectsTabCounter.innerHTML = projectList.length;
    } else {
        projectsTabCounter.style.display = 'none';
    }

    if (notesList.length > 0){
        noteTabCounter.style.display = 'flex';
        noteTabCounter.innerHTML = notesList.length;
    } else {
        noteTabCounter.style.display = 'none';
    }

    if (todoList.length > 0){
        todoTabCounter.style.display = 'flex';
        todoTabCounter.innerHTML = todoList.length;
    } else {
        todoTabCounter.style.display = 'none';
    }
}

// Storing tasks in local storage
function saveTasksToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify({ projects: projectList, notes: notesList, todo: todoList }));
}

function loadTasksFromLocalStorage() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (savedTasks) {
        projectList = savedTasks.projects || [];
        notesList = savedTasks.notes || [];
        todoList = savedTasks.todo || [];
    }
}

//function that initializes a task
function task(type, date, details, priority){
    this.type = type;
    this.date = date;
    this.details = details;
    this.priority = priority;
}

//simple function to remove an element
function removeElement (elementid){
    const element = document.getElementById(elementid)
    if (element){
        element.remove();
    };
};

function deleteTask(taskId, taskType, task) {
    // Remove the task from the respective list
    if (taskType === 'Project') {
        const index = projectList.indexOf(task);
        if (index !== -1) {
            projectList.splice(index, 1);
        }
    } else if (taskType === 'To Do') {
        const index = todoList.indexOf(task);
        if (index !== -1) {
            todoList.splice(index, 1);
        }
    } else if (taskType === 'Note') {
        const index = notesList.indexOf(task);
        if (index !== -1) {
            notesList.splice(index, 1);
        }
    }

    // Remove the task from the DOM
    removeElement(taskId);

    updateTaskCounter(taskType);

    saveTasksToLocalStorage();
}


// Create a function to handle the editing of a task
function editTask(task, taskDiv, taskType) {
    // Create a pop-up form for editing the task
    const popUpContainer = document.createElement('div');
    popUpContainer.setAttribute('id', 'pop-up-container');

    const taskForm = document.createElement('form');
    taskForm.setAttribute('id', 'task-form');
    popUpContainer.appendChild(taskForm);

    // Populate the form with the existing task details
    const taskTypeSelect = document.createElement('select');
    // Add options for task types (Project, To Do, Note)
    const taskTypes = ['Project', 'To Do', 'Note'];
    taskTypes.forEach(type => {
        const option = document.createElement('option');
        option.value = type;
        option.text = type;
        taskTypeSelect.appendChild(option);
    });
    taskTypeSelect.value = task.type;

    const taskDateInput = document.createElement('input');
    taskDateInput.setAttribute('type', 'date');
    taskDateInput.value = task.date;

    const taskDetailsInput = document.createElement('input');
    taskDetailsInput.setAttribute('type', 'text');
    taskDetailsInput.value = task.details;

    // Priority radio buttons (similar to adding a new task)
    const taskPriorityDiv = document.createElement('div');
    taskPriorityDiv.setAttribute('id', 'task-Priority');

    const taskPriorityLabels = ['Urgent', 'Medium', 'No Rush'];
    taskPriorityLabels.forEach(label => {
        const taskPriorityLabel = document.createElement('label');
        const taskPriorityInput = document.createElement('input');
        taskPriorityInput.setAttribute('type', 'radio');
        taskPriorityInput.setAttribute('value', label.toLowerCase());
        taskPriorityInput.setAttribute('name', 'task-priority');
        taskPriorityLabel.appendChild(taskPriorityInput);
        taskPriorityLabel.appendChild(document.createTextNode(label));
        if (label.toLowerCase() === task.priority) {
            taskPriorityInput.checked = true;
        }
        taskPriorityDiv.appendChild(taskPriorityLabel);
    });

    const saveButton = document.createElement('button');
    saveButton.textContent = 'Save';

    saveButton.addEventListener('click', function () {
        const newTaskType = taskTypeSelect.value;
        
        // Remove the old task from its list
        if (taskType === 'Project') {
            const index = projectList.indexOf(task);
            if (index !== -1) {
                projectList.splice(index, 1);
            }
        } else if (taskType === 'To Do') {
            const index = todoList.indexOf(task);
            if (index !== -1) {
                todoList.splice(index, 1);
            }
        } else if (taskType === 'Note') {
            const index = notesList.indexOf(task);
            if (index !== -1) {
                notesList.splice(index, 1);
            }
        }

        // Update the task object with the edited details
        task.type = newTaskType; // Update the task type
        task.date = taskDateInput.value;
        task.details = taskDetailsInput.value;
        task.priority = taskPriorityDiv.querySelector('input[type="radio"]:checked').value;

        // Add the edited task to the new list
        if (newTaskType === 'Project') {
            projectList.push(task);
        } else if (newTaskType === 'To Do') {
            todoList.push(task);
        } else if (newTaskType === 'Note') {
            notesList.push(task);
        }

        updateTaskCounter(newTaskType);

        // Update the local storage with the edited task data
        saveTasksToLocalStorage();

        // Remove the edit form
        removeElement('pop-up-container');

        // Update the display with the edited task
        displayTasks(newTaskType.toLowerCase() + 's');
    });

    // Append the form elements to the edit form
    taskForm.appendChild(taskTypeSelect);
    taskForm.appendChild(taskDateInput);
    taskForm.appendChild(taskDetailsInput);
    taskForm.appendChild(taskPriorityDiv);
    taskForm.appendChild(saveButton);

    document.body.appendChild(popUpContainer);
}

function displayTasks(tabType) {
    const container = document.getElementById('task-area');
    const noteTab = document.getElementById('note-tab');
    const projectTab = document.getElementById('projects-tab');
    const todoTab = document.getElementById('todo-tab');
    container.innerHTML = '';

    let taskArray = [];
    if (tabType === 'projects') {
        taskArray = projectList;
        projectTab.style.backgroundColor = '#B0E0E6';
        todoTab.style.backgroundColor = '';
        noteTab.style.backgroundColor = '';
    } else if (tabType === 'todo' || tabType === 'To Do' || tabType === 'to dos')  {
        taskArray = todoList;
        todoTab.style.backgroundColor = '#B0E0E6';
        projectTab.style.backgroundColor = '';
        noteTab.style.backgroundColor = '';
    } else if (tabType === 'notes') {
        taskArray = notesList;
        noteTab.style.backgroundColor = '#B0E0E6';
        todoTab.style.backgroundColor = '';
        projectTab.style.backgroundColor = '';
    }

    taskArray.forEach((task) => {
        const taskDiv = document.createElement('div');
        // Create elements to display task details
        const editPicture = new Image();
        editPicture.src = editIcon;
        editPicture.setAttribute('id', 'edit-picture');

        const deletePicture = new Image();
        deletePicture.src = deleteIcon;
        deletePicture.setAttribute('id', 'delete-picture');

        let taskType = task.type;
        const taskDueDate = task.date;
        const taskDetails = task.details;
        var taskUrgencySelected = task.priority;

        const container = document.getElementById('task-area');
        taskDiv.setAttribute('class', 'user-task-div');
        taskDiv.setAttribute('id', 'user-task-' + taskDetails);

        // Setting background color of task to match the urgency
        if (taskUrgencySelected == 'urgent') {
            taskDiv.style.backgroundColor = 'red';
        } else if (taskUrgencySelected == 'medium') {
            taskDiv.style.backgroundColor = 'yellow';
        } else if (taskUrgencySelected == 'relaxed') {
            taskDiv.style.backgroundColor = 'lightblue';
        }

        container.appendChild(taskDiv);

        const taskName = document.createElement('div');
        taskName.setAttribute('id', 'task-name');
        taskName.innerHTML = taskType;

        const taskDetailsDiv = document.createElement('div');
        taskDetailsDiv.setAttribute('id', 'task-details-DOM');
        taskDetailsDiv.innerHTML = taskDetails;

        const taskDueDateDiv = document.createElement('div');
        taskDueDateDiv.setAttribute('id', 'task-due-date-div');
        taskDueDateDiv.innerHTML = 'Due on: ' + taskDueDate;

        const deleteDiv = document.createElement('div');
        deleteDiv.setAttribute('id', 'delete-div');
        deleteDiv.appendChild(deletePicture);
        deletePicture.addEventListener('click', function () {
            deleteTask('user-task-' + taskDetails, taskType, task);
        });

        const editDiv = document.createElement('div');
        editDiv.setAttribute('id', 'edit-div')
        editDiv.appendChild(editPicture);
        editPicture.addEventListener('click', function () {
            editTask(task, taskDiv, taskType);
        });

        taskDiv.appendChild(taskName);
        taskDiv.appendChild(taskDetailsDiv);
        taskDiv.appendChild(taskDueDateDiv);
        taskDiv.appendChild(editDiv);
        taskDiv.appendChild(deleteDiv);
    });

    const projectsTabCounter = document.getElementById('projects-tab-counter');
    const todoTabCounter = document.getElementById('todo-tab-counter');
    const noteTabCounter = document.getElementById('note-tab-counter');

    if (tabType === 'projects') {
       projectTab.click();
       projectsTabCounter.innerHTML = projectList.length;
       if (projectList.length > 0){
        projectsTabCounter.style.display = 'flex';
    } else {
        projectsTabCounter.style.display = 'none';
     }
    } else if (tabType === 'todo' || tabType === 'To Do' || tabType === 'to dos') {
       todoTab.click();
       todoTabCounter.innerHTML = todoList.length;
       if (todoList.length > 0){
        todoTabCounter.style.display = 'flex';
    } else {
        todoTabCounter.style.display = 'none';
     }
    } else if (tabType === 'notes') {
       noteTab.click();
       noteTabCounter.innerHTML = notesList.length;
       if (notesList.length > 0){
        noteTabCounter.style.display = 'flex';
    } else {
        noteTabCounter.style.display = 'none';
     }
    }
}


//function that adds task to the DOM
function addTask(){
    const noteTab = document.getElementById('note-tab');
    const projectTab = document.getElementById('projects-tab');
    const todoTab = document.getElementById('todo-tab');

    const editPicture = new Image();
    editPicture.src = editIcon;
    editPicture.setAttribute('id', 'edit-picture');

    const deletePicture = new Image();
    deletePicture.src = deleteIcon;
    deletePicture.setAttribute('id', 'delete-picture');

    let taskType = document.getElementById('type').value;
    const taskDueDate = document.getElementById('date').value;
    const taskDetails = document.getElementById('details').value;
    const formInput = document.getElementById('task-form');

    var taskUrgency = formInput.elements['task-priority'];
    var taskUrgencySelected = null;

    //getting the value of selected radio button
    for (var i = 0; i < taskUrgency.length; i++){
        if (taskUrgency[i].checked){
            taskUrgencySelected = taskUrgency[i].value;
        }
    };

    //editing value of the type of task
    if (taskType == 'project'){
        taskType = 'Project';
        projectTab.style.backgroundColor = '#B0E0E6';
        todoTab.style.backgroundColor = '';
        noteTab.style.backgroundColor = '';
    };

    if (taskType == 'todo'){
        taskType = 'To Do';
        projectTab.style.backgroundColor = '';
        todoTab.style.backgroundColor = '#B0E0E6';
        noteTab.style.backgroundColor = '';
    };

    if (taskType == 'note'){
        taskType = "Note";
        projectTab.style.backgroundColor = '';
        todoTab.style.backgroundColor = '';
        noteTab.style.backgroundColor = '#B0E0E6';
    };

    const container = document.getElementById('task-area');
    const taskDiv = document.createElement('div');
    taskDiv.setAttribute('class', 'user-task-div');
    taskDiv.setAttribute('id', 'user-task-'+taskDetails);

    //setting background color of task to match the urgency
    if (taskUrgencySelected == 'urgent'){
        taskDiv.style.backgroundColor = 'red';
    };

    if (taskUrgencySelected == 'medium'){
        taskDiv.style.backgroundColor = 'yellow';
    };

    if (taskUrgencySelected == 'relaxed'){
        taskDiv.style.backgroundColor = 'lightblue'
    };

    //creating new task element and adding it to an array
    let timeStamp = new Date().getTime();
    timeStamp = new task(taskType, taskDueDate, taskDetails, taskUrgencySelected);

    if (taskType === 'Project'){
        projectList.push(timeStamp);
    } else if (taskType == 'To Do'){
        todoList.push(timeStamp);
    } else if (taskType == 'Note'){
        notesList.push(timeStamp);
    }

    // After adding a task, save tasks to local storage
    saveTasksToLocalStorage();

    container.appendChild(taskDiv);

    const taskName = document.createElement('div');
    taskName.setAttribute('id', 'task-name');
    taskName.innerHTML = taskType

    const taskDetailsDiv = document.createElement('div');
    taskDetailsDiv.setAttribute('id', 'task-details-DOM');
    taskDetailsDiv.innerHTML = taskDetails;

    const taskDueDateDiv = document.createElement('div');
    taskDueDateDiv.setAttribute('id', 'task-due-date-div');
    taskDueDateDiv.innerHTML = 'Due on: ' + taskDueDate;

    const deleteDiv = document.createElement('div');
    deleteDiv.setAttribute('id', 'delete-div');
    deleteDiv.appendChild(deletePicture);
    deletePicture.addEventListener('click', function(){
        deleteTask('user-task-'+taskDetails, taskType, timeStamp);
    });

    const editDiv = document.createElement('div');
    editDiv.setAttribute('id', 'edit-div')
    editDiv.appendChild(editPicture);
    editPicture.addEventListener('click', function(){
        editTask(timeStamp, taskDiv, taskType);
    });

    taskDiv.appendChild(taskName);
    taskDiv.appendChild(taskDetailsDiv);
    taskDiv.appendChild(taskDueDateDiv);
    taskDiv.appendChild(editDiv);
    taskDiv.appendChild(deleteDiv);

    displayTasks(taskType.toLowerCase() + 's');

    if (taskType === 'projects') {
        projectTab.click();
        projectsTabCounter.innerHTML = projectList.length;
        if (projectList.length > 0){
         projectsTabCounter.style.display = 'flex';
     } else {
        projectsTabCounter.style.display = 'none';
     }
     } else if (taskType === 'todo' || taskType === 'To Do' || taskType === 'to dos') {
        todoTab.click();
        todoTabCounter.innerHTML = todoList.length;
        if (todoList.length > 0){
         todoTabCounter.style.display = 'flex';
     } else {
        todoTabCounter.style.display = 'none';
     }
     } else if (taskType === 'notes') {
        noteTab.click();
        noteTabCounter.innerHTML = notesList.length;
        if (notesList.length > 0){
         noteTabCounter.style.display = 'flex';
     } else {
        notetabCounter.style.display = 'none';
     }
     }

    updateTaskCounter(taskType);

    removeElement('pop-up-container');
};

//function will create a pop up form that allows user to add a new task
function taskPopUp() {

    //setting up the container for the pop up form to add a new task
    const popUpContainer = document.createElement('div');
    popUpContainer.setAttribute('id', 'pop-up-container');
    
    //setting up actual task form
    const taskForm = document.createElement('form');
    taskForm.setAttribute('id', 'task-form');
    popUpContainer.appendChild(taskForm);

    //setting up the close button and a container for it
    const closeButtonContainer = document.createElement('div');
    closeButtonContainer.setAttribute('id', 'close-button-container');
    taskForm.appendChild(closeButtonContainer);

    const closeForm = document.createElement('button');
    closeForm.setAttribute('id', 'close-form');
    closeForm.setAttribute('type', 'button');
    closeForm.innerHTML = 'x';
    closeForm.addEventListener('click', function(){
        removeElement('pop-up-container');
    });

    closeButtonContainer.appendChild(closeForm);
    
    //setting up a container for the questions of the task form
    const questionContainer = document.createElement('div');
    questionContainer.setAttribute('id', 'question-container');

    taskForm.appendChild(questionContainer);

    //creating form questions for the type of task
    const taskType = document.createElement('div');
    taskType.setAttribute('id', 'task-type');

    const taskTypeLabel = document.createElement('label');
    taskTypeLabel.setAttribute('for', 'type');
    taskTypeLabel.innerHTML = "Type of Task: ";

    const taskSelectDiv = document.createElement('div');
    taskSelectDiv.setAttribute('id', 'task-div');

    const taskTypeType = document.createElement('select');
    taskTypeType.setAttribute('id', 'type');
    taskTypeType.setAttribute('name', 'type');

    const project = document.createElement('option');
    project.setAttribute('value', 'project');
    project.innerHTML = 'Project';

    const toDo = document.createElement('option');
    toDo.setAttribute('value', 'todo');
    toDo.innerHTML = 'To Do';

    const note = document.createElement('option');
    note.setAttribute('value', 'note');
    note.innerHTML = 'Note';

    taskType.appendChild(taskTypeLabel);
    taskSelectDiv.appendChild(taskTypeType);
    taskType.appendChild(taskSelectDiv);
    taskTypeType.appendChild(project);
    taskTypeType.appendChild(toDo);
    taskTypeType.appendChild(note);

    questionContainer.appendChild(taskType);

    //creating form questions for the due date of the task
    const taskDate = document.createElement('div');
    taskDate.setAttribute('id', 'task-date');

    const taskDateLabel = document.createElement('label');
    taskTypeLabel.setAttribute('for', 'date');
    taskTypeLabel.setAttribute('id', 'task-type-label');
    taskDateLabel.innerHTML = "Due Date: ";

    const taskDateType = document.createElement('input');
    taskDateType.setAttribute('type', 'date');
    taskDateType.setAttribute('id', 'date');

    taskDate.appendChild(taskDateLabel);
    taskDate.appendChild(taskDateType);

    questionContainer.appendChild(taskDate);

    //creating form questions for the details of the task
    const taskDetails = document.createElement('div');
    taskType.setAttribute('id', 'task-details');

    const taskDetailsLabel = document.createElement('label');
    taskDetailsLabel.setAttribute('for', 'details');
    taskDetailsLabel.innerHTML = 'Details: ';

    const taskDetailsType = document.createElement('input');
    taskDetailsType.setAttribute('type', 'text');
    taskDetailsType.setAttribute('id', 'details');

    taskDetails.appendChild(taskDetailsLabel);
    taskDetails.appendChild(taskDetailsType);

    questionContainer.appendChild(taskDetails);

    //createing form questoins for priority level of task
    const taskPriority = document.createElement('div');
    taskPriority.setAttribute('id', 'task-Priority');

    const taskPriorityUrgentLabel = document.createElement('label');
    const taskPriorityUrgentInput = document.createElement('input');

    taskPriorityUrgentInput.setAttribute('type', 'radio');
    taskPriorityUrgentInput.setAttribute('value', 'urgent');
    taskPriorityUrgentInput.setAttribute('name', 'task-priority')
    taskPriorityUrgentInput.setAttribute('id', 'urgent');
    taskPriorityUrgentLabel.innerHTML = 'Urgent';

    taskPriorityUrgentLabel.appendChild(taskPriorityUrgentInput);

    const taskPriorityMediumLabel = document.createElement('label');
    const taskPriorityMediumInput = document.createElement('input');

    taskPriorityMediumInput.setAttribute('type', 'radio');
    taskPriorityMediumInput.setAttribute('value', 'medium');
    taskPriorityMediumInput.setAttribute('name', 'task-priority')
    taskPriorityMediumInput.setAttribute('id', 'medium');
    taskPriorityMediumLabel.innerHTML = 'Medium';

    taskPriorityMediumLabel.appendChild(taskPriorityMediumInput);

    const taskPriorityRelaxedLabel = document.createElement('label');
    const taskPriorityRelaxedInput = document.createElement('input');

    taskPriorityRelaxedInput.setAttribute('type', 'radio');
    taskPriorityRelaxedInput.setAttribute('value', 'relaxed');
    taskPriorityRelaxedInput.setAttribute('name', 'task-priority')
    taskPriorityRelaxedInput.setAttribute('id', 'relaxed');
    taskPriorityRelaxedLabel.innerHTML = 'No Rush';

    taskPriorityRelaxedLabel.appendChild(taskPriorityRelaxedInput);

    taskPriority.appendChild(taskPriorityUrgentLabel);
    taskPriority.appendChild(taskPriorityMediumLabel);
    taskPriority.appendChild(taskPriorityRelaxedLabel);

    questionContainer.appendChild(taskPriority);

    //setting up submit button for the form
    const submitForm = document.createElement('button');
    submitForm.setAttribute('type', 'submit');
    submitForm.setAttribute('id', 'submit-form');
    submitForm.innerHTML = 'Submit';
    taskForm.addEventListener('submit' , function(e){
        e.preventDefault();
        addTask();
    });

    questionContainer.appendChild(submitForm);

    document.body.appendChild(popUpContainer);

};

//this function creates the main elements of the webpage
function createElements(){
    //main container
    const container = document.createElement('div');
    container.setAttribute('id', 'container');

    //creating sidebar
    const sideBar = document.createElement('div');
    sideBar.setAttribute('id', 'side-bar');

    container.appendChild(sideBar);

    //creating the area where the tasks will show up
    const taskArea = document.createElement('div');
    taskArea.setAttribute('id', 'task-area');

    container.appendChild(taskArea);

    //creating the area on the sidebar where you can navigate to different task types
    const sideBarTasks = document.createElement('div');
    sideBarTasks.setAttribute('id', 'side-bar-tasks');
    sideBar.appendChild(sideBarTasks);

    const projectsTab = document.createElement('div');
    projectsTab.setAttribute('id', 'projects-tab')
    projectsTab.innerHTML = 'Projects';
    let projectsTabCounter = document.createElement('div');
    projectsTabCounter.setAttribute('id', 'projects-tab-counter');
    projectsTabCounter.innerHTML = projectList.length;

    const todoTab = document.createElement('div');
    todoTab.setAttribute('id', 'todo-tab');
    todoTab.innerHTML = 'To Do';
    let todoTabCounter = document.createElement('div');
    todoTabCounter.setAttribute('id', 'todo-tab-counter');
    todoTabCounter.innerHTML = todoList.length;

    const noteTab = document.createElement('div');
    noteTab.setAttribute('id', 'note-tab');
    noteTab.innerHTML = 'Notes';
    let noteTabCounter = document.createElement('div');
    noteTabCounter.setAttribute('id', 'note-tab-counter');

    sideBarTasks.appendChild(projectsTab);
    sideBarTasks.appendChild(todoTab);
    sideBarTasks.appendChild(noteTab);
    projectsTab.appendChild(projectsTabCounter);
    todoTab.appendChild(todoTabCounter);
    noteTab.appendChild(noteTabCounter);

    projectsTab.addEventListener('click', () => {
    displayTasks('projects');
    projectsTab.style.backgroundColor = '#B0E0E6';
    todoTab.style.backgroundColor = '';
    noteTab.style.backgroundColor = '';
    });

    todoTab.addEventListener('click', () => {
    displayTasks('todo');
    todoTab.style.backgroundColor = '#B0E0E6';
    noteTab.style.backgroundColor = '';
    projectsTab.style.backgroundColor = '';
    });

    noteTab.addEventListener('click', () => {
    displayTasks('notes');
    noteTab.style.backgroundColor = '#B0E0E6';
    projectsTab.style.backgroundColor = '';
    todoTab.style.backgroundColor = '';
    });

    //creating the button that allows you to add tasks
    const addButton = document.createElement('button');
    addButton.setAttribute('id', 'add-button');
    addButton.innerHTML = "New Task";

    addButton.addEventListener('click', taskPopUp);

    sideBar.appendChild(addButton);

    return container;
}

document.body.appendChild(createElements());

// Load tasks from local storage when the page loads
loadTasksFromLocalStorage();
// Display the loaded tasks
displayTasks('projects'); // You can specify the appropriate tab here

// Initialize and display the counter on page load
updateTaskCounter('projects');
updateTaskCounter('todo');
updateTaskCounter('notes');
