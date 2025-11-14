let draggedTask = null;


function loadTasks() {
const boardData = JSON.parse(localStorage.getItem('kanbanBoard')) || {todo: [], doing: [], done: []};
['todo', 'doing', 'done'].forEach(status => {
const column = document.getElementById(status);
column.innerHTML = '';
boardData[status].forEach(taskText => {
const task = createTaskElement(taskText);
column.appendChild(task);
});
});
}


function saveTasks() {
const boardData = {todo: [], doing: [], done: []};
['todo', 'doing', 'done'].forEach(status => {
const tasks = document.getElementById(status).children;
boardData[status] = Array.from(tasks).map(t => t.innerText.replace('×','').trim());
});
localStorage.setItem('kanbanBoard', JSON.stringify(boardData));
}


function createTaskElement(text) {
const task = document.createElement('div');
task.className = 'task';
task.draggable = true;
task.innerText = text;
const removeBtn = document.createElement('span');
removeBtn.innerText = ' ×';
removeBtn.style.float = 'right';
removeBtn.style.cursor = 'pointer';
removeBtn.onclick = () => { task.remove(); saveTasks(); };
task.appendChild(removeBtn);


task.addEventListener('dragstart', () => { draggedTask = task; task.classList.add('dragging'); });
task.addEventListener('dragend', () => { draggedTask = null; task.classList.remove('dragging'); saveTasks(); });


return task;
}


function addTask(columnId) {
const taskText = prompt('Enter task:');
if (taskText) {
const task = createTaskElement(taskText);
document.getElementById(columnId).appendChild(task);
saveTasks();
}
}


['todo', 'doing', 'done'].forEach(id => {
const column = document.getElementById(id);
column.addEventListener('dragover', e => e.preventDefault());
column.addEventListener('drop', () => {
if (draggedTask) {
column.appendChild(draggedTask);
saveTasks();
}
});
});


loadTasks();