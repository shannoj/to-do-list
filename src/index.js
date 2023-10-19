import _ from 'lodash';
import './style.css';
import editIcon from './editIcon.png';
import deleteIcon from './deleteIcon.png';

let projectList = [];
let notesList = [];
let todoList = [];

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

function deleteTask(taskId, taskType, timeStamp){
        // Remove the task from the respective list
        if (taskType === 'Project') {
            projectList = projectList.filter(task => task !== timeStamp);
        } else if (taskType === 'To Do') {
            todoList = todoList.filter(task => task !== timeStamp);
        } else if (taskType === 'Note') {
            notesList = notesList.filter(task => task !== timeStamp);
        }
    
        // Remove the task from the DOM
        removeElement(taskId);
};

// Create a function to handle the editing of a task
function editTask(task, taskDiv) {
    // Create an edit form
    //const editForm = document.createElement('form');

    // Populate the form with existing task details
    // For example, you can use task.type, task.date, and task.details to set the form input values

    // Add input fields for editing
    //const editTypeInput = document.createElement('input');
    //editTypeInput.setAttribute('type', 'text');
    //editTypeInput.value = task.type;

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
    taskType.value = task.type;

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
    taskDateType.value = task.date

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
    taskDetailsType.value = task.details;

    taskDetails.appendChild(taskDetailsLabel);
    taskDetails.appendChild(taskDetailsType);

    questionContainer.appendChild(taskDetails);

    //createing form questoins for priority level of task
    const taskPriority = document.createElement('div');
    taskPriority.setAttribute('id', 'task-Priority');
    taskPriority.value = task.priority;

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

    const saveButton = document.createElement('button');
    saveButton.textContent = 'Save';

    // Add an event listener to the save button
    saveButton.addEventListener('click', function() {
        // Update the task object with the edited details
        task.type = editTypeInput.value;
        task.date = taskDateType.value;
        task.details = taskDetailsType.value;

        // Remove the edit form
        taskDiv.removeChild(editForm);

        // Update the display with the edited task
        displayTasks(tabType);
    });

    document.body.appendChild(popUpContainer);

    //

    /* const editDateInput = document.createElement('input');
    editDateInput.setAttribute('type', 'date');
    editDateInput.value = task.date;

    const editDetailsInput = document.createElement('input');
    editDetailsInput.setAttribute('type', 'text');
    editDetailsInput.value = task.details;
    */
    // Add a save button to submit the edited task

    /*
    // Append input fields and save button to the edit form
    editForm.appendChild(editTypeInput);
    editForm.appendChild(editDateInput);
    editForm.appendChild(editDetailsInput);
    editForm.appendChild(saveButton);

    // Replace the taskDiv contents with the edit form
    taskDiv.innerHTML = '';
    taskDiv.appendChild(editForm);
    */
}

function displayTasks(tabType){
    const container = document.getElementById('task-area');
    container.innerHTML = '';

  let taskArray = [];
  if (tabType === 'projects') {
    taskArray = projectList;
  } else if (tabType === 'todo') {
    taskArray = todoList;
  } else if (tabType === 'notes') {
    taskArray = notesList;
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
    const formInput = document.getElementById('task-form');
    var taskUrgencySelected = task.priority;

    const container = document.getElementById('task-area');
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
        deleteTask('user-task-'+taskDetails, taskType, task);
    });

    const editDiv = document.createElement('div');
    editDiv.setAttribute('id', 'edit-div')
    editDiv.appendChild(editPicture);
    editPicture.addEventListener('click', function(){
        editTask(task, taskDiv);
    });

    taskDiv.appendChild(taskName);
    taskDiv.appendChild(taskDetailsDiv);
    taskDiv.appendChild(taskDueDateDiv);
    taskDiv.appendChild(editDiv);
    taskDiv.appendChild(deleteDiv);

    removeElement('pop-up-container');
  });

  console.log(projectList);
  console.log(todoList);
  console.log(notesList);
};

//function that adds task to the DOM
function addTask(){
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
    };

    if (taskType == 'todo'){
        taskType = 'To Do';
    };

    if (taskType == 'note'){
        taskType = "Note";
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
        editTask(timeStamp, taskDiv);
    });

    taskDiv.appendChild(taskName);
    taskDiv.appendChild(taskDetailsDiv);
    taskDiv.appendChild(taskDueDateDiv);
    taskDiv.appendChild(editDiv);
    taskDiv.appendChild(deleteDiv);

    displayTasks(taskType.toLowerCase() + 's');

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

    const todoTab = document.createElement('div');
    todoTab.setAttribute('id', 'todo-tab');
    todoTab.innerHTML = 'To Do';

    const noteTab = document.createElement('div');
    noteTab.setAttribute('id', 'note-tab');
    noteTab.innerHTML = 'Notes';

    sideBarTasks.appendChild(projectsTab);
    sideBarTasks.appendChild(todoTab);
    sideBarTasks.appendChild(noteTab);

    projectsTab.addEventListener('click', () => {
    displayTasks('projects');
    });

    todoTab.addEventListener('click', () => {
    displayTasks('todo');
    });

    noteTab.addEventListener('click', () => {
    displayTasks('notes');
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

