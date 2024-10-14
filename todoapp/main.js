document.addEventListener("DOMContentLoaded", () => {
  const todoInput = document.getElementById("todo-input");
  const addTaskBtn = document.getElementById("add-task-btn");
  const todoList = document.getElementById("todo-list");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  renderTasks();

  addTaskBtn.addEventListener("click", () => {
    const taskText = todoInput.value.trim();

    if (!taskText) {
      return;
    }

    const newTask = {
      id: Date.now(),
      text: taskText,
      done: false,
    };

    tasks.push(newTask);
    todoInput.value = "";

    saveTasks();
    renderTasks();
  });

  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function renderTasks() {
    todoList.innerHTML = "";
    tasks.forEach((task) => {
      const taskElement = document.createElement("li");
      taskElement.setAttribute("data-id", task.id);
      taskElement.textContent = task.text;

      if (task.done) {
        taskElement.classList.add("completed");
      }

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "X";
      deleteBtn.classList.add("delete-btn");
      taskElement.appendChild(deleteBtn);

      todoList.appendChild(taskElement);

      taskElement.addEventListener("click", (e) => {
        if (e.target.tagName === "BUTTON") {
          task.done = !task.done;
          taskElement.classList.toggle("completed");
          saveTasks();
          renderTasks();
        }
      });
      // end of delete button
    });
  }
});
