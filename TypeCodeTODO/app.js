const apiUrl = "https://jsonplaceholder.typicode.com/todos";

const getTodos = function () {
    fetch(apiUrl + "?_limit=5")
        .then((response) => response.json())
        .then((data) => {
            data.forEach((todo) => addTodoToDOM(todo));
        });
};

const addTodoToDOM = function (todo) {
    const div = document.createElement("div");
    div.append(document.createTextNode(todo.title));

    div.setAttribute("data-id", todo.id);
    div.classList.add("todo");

    if (todo.completed) {
        div.classList.add("alert", "alert-success");
    } else {
        div.classList.add("alert", "alert-dark");
    }

    document.getElementById("todo-list").appendChild(div);
};

const createTodo = function (e) {
    e.preventDefault();

    const newTodo = {
        title: e.target.title.value,
        completed: false,
    };

    fetch(apiUrl, {
        method: "POST",
        body: JSON.stringify(newTodo),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
    })
        .then((res) => res.json())
        .then((data) => {
            addTodoToDOM(data);
        });
};

const toggleCompleted = function (e) {
    if (e.target.classList.contains("todo")) {
        updateTodo(
            e.target.dataset.id,
            !e.target.classList.contains("alert-success")
        );
        e.target.classList.toggle("alert-success");
        e.target.classList.toggle("alert-dark");
    }
};

const updateTodo = function (id, completed) {
    fetch(apiUrl + `/${id}`, {
        method: "PUT",
        body: JSON.stringify({ completed }),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
        });
};

const init = () => {
    document.addEventListener("DOMContentLoaded", getTodos);
    document.querySelector("#todo-form").addEventListener("submit", createTodo);
    document
        .querySelector("#todo-list")
        .addEventListener("click", toggleCompleted);
};

init();
