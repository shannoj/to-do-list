import _ from 'lodash';
import './style.css';
import { container } from 'webpack';

//function that initializes a task
function task(type, date, details, priority){
    this.type = type;
    this.date = date;
    this.details = details;
    this.priority = priority;
}

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
    addButton.innerHTML = "+";

    sideBar.appendChild(addButton);

    return container;
}

//function will create a pop up form that allows user to add a new task
function taskPopUp () {
    //setting up the container for the pop up form to add a new task
    const popUpContainer = document.createElement('div');
    popUpContainer.setAttribute('id', 'pop-up-container');
    
    const taskForm = document.createElement('form');
    taskForm.setAttribute('id', 'task-form');
    popUpContainer.appendChild(taskForm);

    //creating form questions for the type of task
    const taskType = document.createElement('div');
    taskType.setAttribute('id', 'task-type');

    const taskTypeLabel = document.createElement('label');
    taskTypeLabel.setAttribute('for', 'type');

    const taskTypeType = document.createElement('input');
    taskTypeType.setAttribute('type', '');
    taskTypeType.setAttribute('id', 'type');

    taskType.appendChild(taskTypeLabel);
    taskType.appendChild(taskTypeType);

    taskForm.appendChild(taskType);

    //creating form questions for the due date of the task
    const taskDate = document.createElement('div');
    taskDate.setAttribute('id', 'task-date');

    const taskDateLabel = document.createElement('label');
    taskTypeLabel.setAttribute('for', 'date');

    const taskDateType = document.createElement('input');
    taskDateType.setAttribute('date', '');
    taskDateType.setAttribute('id', 'date');

    taskDate.appendChild(taskDateLabel);
    taskDate.appendChild(taskDateType);

    taskForm.appendChild(taskDate);

    //creating form questions for the details of the task
    const taskDetails = document.createElement('div');
    taskType.setAttribute('id', 'task-details');

    const taskDetailsLabel = document.createElement('label');
    taskDetailsLabel.setAttribute('for', 'details');

    const taskDetailsType = document.createElement('input');
    taskTypeType.setAttribute('details', '');
    taskTypeType.setAttribute('id', 'details');

    taskDetails.appendChild(taskDetailsLabel);
    taskDetails.appendChild(taskDetailsType);

    taskForm.appendChild(taskDetails);

    //createing form questoins for priority level of task
    const taskPriority = document.createElement('div');
    taskPriority.setAttribute('id', 'task-Priority');

    const taskPriorityLabel = document.createElement('label');
    taskPriorityLabel.setAttribute('for', 'Priority');

    const taskPriorityType = document.createElement('input');
    taskPriorityType.setAttribute('type', '');
    taskPriorityType.setAttribute('id', 'Priority');

    taskPriority.appendChild(taskPriorityLabel);
    taskPriority.appendChild(taskPriorityType);

    taskForm.appendChild(taskPriority);

}

document.body.appendChild(createElements());