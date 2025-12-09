const input = document.querySelector("#input");
const addElement = document.querySelector(".addButton");
const tasksContainer = document.querySelector("#task__container");
const allButton = document.querySelector("#all");
const activeButton = document.querySelector("#active");
const completedButton = document.querySelector("#completed");

const tasks = [];

let taskId = 1;

const add = () => {
  const todoText = input.value;
  const task = {
    id: taskId,
    text: todoText,
    isComplete: false,
  };

  tasks.push(task);
  taskId++;
  clearInput();
  renderTasks();
};

const filterTasks = (filtertype) => {
  let filteredTasks = [];

  if (filtertype === "active") {
    filteredTasks = tasks.filter((task) => task.isComplete === false);
  }

  if (filtertype === "completed") {
    filteredTasks = tasks.filter((task) => task.isComplete === true);
  }

  if (filtertype === "all") {
    filteredTasks = tasks;
  }

  renderFilteredTasks(filteredTasks);
};

const renderFilteredTasks = (filteredStatus) => {
  let html = "";
  filteredStatus.forEach((task) => {
    html = html + createTaskElement(task);
  });
  tasksContainer.innerHTML = html;
};

const noTask = () => {
  if (tasks.length === 0) {
    tasksContainer.innerHTML = `<div class="statusText">
            <p>No tasks yet. Add one above!</p>
          </div>`;
  }
};
const renderTasks = () => {
  let taskElementHTML = "";
  tasks.forEach((task) => {
    const taskElement = createTaskElement(task);
    taskElementHTML += taskElement;
  });

  tasksContainer.innerHTML = taskElementHTML;
};
const toggleComplete = (id) => {
  const task = tasks.find((t) => t.id === id);
  task.isComplete = !task.isComplete;
  renderTasks();
};
const createTaskElement = (task) => {
  return ` <div class="task">
              <div class="buttons">
              <input type="checkbox" name="checkbox" 
              class="task__checkbox" 
              ${task.isComplete && "checked"}
              onclick="toggleComplete(${task.id})"/>
              <p class="task__text">${task.text}</p></div>
              <button class="task__delete" onclick="deleteTask(${
                task.id
              })">Delete</button>
            </div>`;
};

const clearInput = () => {
  input.value = "";
};
const deleteTask = (id) => {
  const newTasks = tasks.filter((task) => task.id !== id);
  tasks.length = 0;
  tasks.push(...newTasks);
  renderTasks();
  noTask();
};
const buttonColor = () => {
  allButton.innerHTML = `<button class="button1" style="background-color: #3c82f6; color: white;">All</button>`;
  activeButton.innerHTML = `<button class="button2">Active</button>`;
  completedButton.innerHTML = `<button class="button3">Completed</button>`;
};
const buttonColorr = () => {
  activeButton.innerHTML = `<button class="button2" style="background-color: #3c82f6; color: white;">Active</button>`;
  completedButton.innerHTML = `<button class="button3">Completed</button>`;
  allButton.innerHTML = `<button class="button1" style="background-color: #f0f0f0; color: black;">All</button>`;
};
const buttonColorrr = () => {
  completedButton.innerHTML = `<button class="button3" style="background-color: #3c82f6; color: white;">Completed</button>`;
  allButton.innerHTML = `<button class="button1" style="background-color: #f0f0f0; color: black;">All</button>`;
  activeButton.innerHTML = `<button class="button2">Active</button>`;
};
noTask();

addElement.addEventListener("click", add);
allButton.addEventListener("click", () => filterTasks("all"));
activeButton.addEventListener("click", () => filterTasks("active"));
completedButton.addEventListener("click", () => filterTasks("completed"));
