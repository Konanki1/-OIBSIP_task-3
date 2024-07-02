document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
});

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText) {
        const task = {
            id: Date.now(),
            text: taskText,
            completed: false,
            addedAt: new Date().toLocaleString(),
            completedAt: null
        };

        const tasks = getTasks();
        tasks.push(task);
        saveTasks(tasks);
        taskInput.value = '';
        renderTasks();
    }
}

function toggleTaskCompletion(taskId) {
    const tasks = getTasks();
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    tasks[taskIndex].completed = !tasks[taskIndex].completed;
    tasks[taskIndex].completedAt = tasks[taskIndex].completed ? new Date().toLocaleString() : null;
    saveTasks(tasks);
    renderTasks();
}

function deleteTask(taskId) {
    let tasks = getTasks();
    tasks = tasks.filter(task => task.id !== taskId);
    saveTasks(tasks);
    renderTasks();
}

function getTasks() {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
}

function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
    const tasks = getTasks();
    const pendingTasks = document.getElementById('pendingTasks');
    const completedTasks = document.getElementById('completedTasks');

    pendingTasks.innerHTML = '';
    completedTasks.innerHTML = '';

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';
        li.textContent = `${task.text} (Added: ${task.addedAt})`;

        const actions = document.createElement('div');
        actions.className = 'task-actions';

        const completeBtn = document.createElement('button');
        completeBtn.className = 'complete';
        completeBtn.textContent = task.completed ? 'Unmark' : 'Complete';
        completeBtn.onclick = () => toggleTaskCompletion(task.id);
        actions.appendChild(completeBtn);

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete';
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = () => deleteTask(task.id);
        actions.appendChild(deleteBtn);

        li.appendChild(actions);

        if (task.completed) {
            completedTasks.appendChild(li);
        } else {
            pendingTasks.appendChild(li);
        }
    });
}

function loadTasks() {
    renderTasks();
}
