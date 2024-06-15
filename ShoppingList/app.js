const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clearBtn = document.getElementById("clear");
const itemFilter = document.getElementById("filter");

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

    // Append to list
    itemList.appendChild(liEl);
    checkUI();
    itemInput.value = "";
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
        if (confirm("Are you sure?")) {
            e.target.parentElement.parentElement.remove();
            checkUI();
        }
    }
}

function clearItems() {
    while (itemList.firstChild) {
        itemList.removeChild(itemList.firstChild);
        console.log("clear items");
    }
    checkUI();
}

function checkUI() {
    const items = itemList.querySelectorAll("li");
    if (items.length === 0) {
        clearBtn.style.display = "none";
        itemFilter.style.display = "none";
    } else {
        clearBtn.style.display = "block";
        itemFilter.style.display = "block";
    }
}

// Event Listeners

itemForm.addEventListener("submit", addItem);
itemList.addEventListener("click", removeItem);
clearBtn.addEventListener("click", clearItems);

checkUI();
