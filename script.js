const input = document.querySelector("#input");
const addElement = document.querySelector(".addButton");
const tasksContainer = document.querySelector("#task__container");

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
  console.log(taskElementHTML);
  tasksContainer.innerHTML = taskElementHTML;
};

const createTaskElement = (task) => {
  return ` <div class="task">
              <div class="buttons"><input type="checkbox" name="checkbox" class="task__checkbox" ${
                task.isComplete && "checked"
              }/>
              <p class="task__text">${task.text}</p></div>
              <button class="task__delete">Delete</button>
            </div>`;
};

const clearInput = () => {
  input.value = "";
};

noTask();
addElement.addEventListener("click", add);
