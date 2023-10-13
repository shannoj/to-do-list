import _ from 'lodash';
import './style.css';

function createElements(){
    const container = document.createElement('div');
    container.setAttribute('id', 'container');

    const sideBar = document.createElement('div');
    sideBar.setAttribute('id', 'side-bar');

    container.appendChild(sideBar);

    const taskArea = document.createElement('div');
    taskArea.setAttribute('id', 'task-area');

    container.appendChild(taskArea);

    const sideBarTasks = document.createElement('div');
    sideBarTasks.setAttribute('id', 'side-bar-tasks');
    sideBar.appendChild(sideBarTasks);

    const addButton = document.createElement('button');
    addButton.setAttribute('id', 'add-button');
    addButton.innerHTML = "+";

    sideBar.appendChild(addButton);

    return container;
}

document.body.appendChild(createElements());