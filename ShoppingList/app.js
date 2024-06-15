const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clearBtn = document.getElementById("clear");

function addItem(e) {
    e.preventDefault();
    const newItem = itemInput.value;
    if (newItem === "") {
        alert("Please enter a value");
        return;
    }

    const liEl = document.createElement("li");
    liEl.appendChild(document.createTextNode(newItem));

    const btnEl = createButtonEl("remove-item btn-link text-red");
    liEl.appendChild(btnEl);

    itemList.appendChild(liEl);
}

function createButtonEl(classes) {
    const btnEl = document.createElement("button");
    btnEl.className = classes;
    const icon = createIconEl("fa-solid fa-xmark");
    btnEl.appendChild(icon);
    return btnEl;
}

function createIconEl(classes) {
    const iconEl = document.createElement("i");
    iconEl.className = classes;
    return iconEl;
}

function removeItem(e) {
    if (e.target.parentElement.classList.contains("remove-item")) {
        e.target.parentElement.parentElement.remove();
    }
}

function clearItems() {
    while (itemList.firstChild) {
        itemList.removeChild(itemList.firstChild);
        console.log("clear items");
    }
}

// Event Listeners

itemForm.addEventListener("submit", addItem);
itemList.addEventListener("click", removeItem);
clearBtn.addEventListener("click", clearItems);
