let tasks = [];
let currentFilter = "all";

window.onload = () => {
  loadTasks();
};

function addTask() {
  const input = document.getElementById("taskInput");
  const text = input.value.trim();
  if (!text) return;

  tasks.push({ text, done: false });
  input.value = "";
  saveTasks();
  renderTasks();
}

function toggleTask(index) {
  tasks[index].done = !tasks[index].done;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function setFilter(filter) {
  currentFilter = filter;
  document
    .querySelectorAll(".tabs button")
    .forEach((btn) => btn.classList.remove("active"));
  document.getElementById(`tab-${filter}`).classList.add("active");
  renderTasks();
}

function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  let filteredTasks = [];
  if (currentFilter === "all") {
    filteredTasks = tasks;
  } else if (currentFilter === "pending") {
    filteredTasks = tasks.filter((task) => !task.done);
  } else if (currentFilter === "completed") {
    filteredTasks = tasks.filter((task) => task.done);
  }

  filteredTasks.forEach((task, index) => {
    const li = document.createElement("li");
    if (task.done) li.classList.add("done");

    const span = document.createElement("span");
    span.textContent = task.text;
    span.onclick = () => toggleTask(tasks.indexOf(task));

    const delBtn = document.createElement("button");
    delBtn.textContent = "X";
    delBtn.onclick = () => deleteTask(tasks.indexOf(task));

    li.appendChild(span);
    li.appendChild(delBtn);
    taskList.appendChild(li);
  });
}

function saveTasks() {
  localStorage.setItem("todoTasks", JSON.stringify(tasks));
}

function loadTasks() {
  const stored = localStorage.getItem("todoTasks");
  if (stored) {
    tasks = JSON.parse(stored);
  }
  renderTasks();
}
