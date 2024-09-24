class Task {
    constructor(title) {
        this.title = title;
        this.completed = false;
    }
}

class TodoList {
    constructor() {
        this.tasks = this.loadTasks();
        this.render();
    }

    loadTasks() {
        const tasks = localStorage.getItem('tasks');
        return tasks ? JSON.parse(tasks).map(task => Object.assign(new Task(), task)) : [];
    }

    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    addTask(title) {
        const task = new Task(title);
        this.tasks.push(task);
        this.saveTasks();
        this.render();
    }

    toggleTask(index) {
        this.tasks[index].completed = !this.tasks[index].completed;
        this.saveTasks();
        this.render();
    }

    removeTask(index) {
        this.tasks.splice(index, 1);
        this.saveTasks();
        this.render();
    }

    render() {
        const taskList = document.getElementById('taskList');
        taskList.innerHTML = '';
        this.tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.className = task.completed ? 'completed' : '';
            li.innerHTML = `
                <span>${task.title}</span>
                <div>
                    <button class="toggle" data-index="${index}">Toggle</button>
                    <button class="remove" data-index="${index}">Remove</button>
                </div>
            `;
            taskList.appendChild(li);
        });
    }
}

const todoList = new TodoList();

document.getElementById('addTaskBtn').addEventListener('click', () => {
    const taskInput = document.getElementById('taskInput');
    if (taskInput.value.trim()) {
        todoList.addTask(taskInput.value.trim());
        taskInput.value = '';
    }
});

document.getElementById('taskList').addEventListener('click', (e) => {
    if (e.target.classList.contains('toggle')) {
        const index = e.target.dataset.index;
        todoList.toggleTask(index);
    } else if (e.target.classList.contains('remove')) {
        const index = e.target.dataset.index;
        todoList.removeTask(index);
    }
});