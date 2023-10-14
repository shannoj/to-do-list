import _ from 'lodash';
import './style.css';

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
    console.log('hello');
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
        removeElement('pop-up-container')
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
    taskDateType.setAttribute('type', '');
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

    //creating the button that allows you to add tasks
    const addButton = document.createElement('button');
    addButton.setAttribute('id', 'add-button');
    addButton.innerHTML = "New Task";

    addButton.addEventListener('click', taskPopUp);

    sideBar.appendChild(addButton);

    return container;
}

document.body.appendChild(createElements());

