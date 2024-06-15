const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clearBtn = document.getElementById("clear");
const itemFilter = document.getElementById("filter");
const formBtn = itemForm.querySelector("button");
let isEditMode = false;

function displayItems() {
    const itemsFromStorage = getItemsFromStorage();

    itemsFromStorage.forEach((item) => {
        addItemsToDOM(item);
    });
    checkUI();
}

function onAddItemSubmit(e) {
    e.preventDefault();
    const newItem = itemInput.value;
    if (newItem === "") {
        alert("Please enter a value");
        return;
    }

    // Check if in edit mode
    if (isEditMode) {
        const itemToEdit = itemList.querySelector(".edit-mode");
        removeItemFromStorage(itemToEdit.textContent);
        itemToEdit.classList.remove("edit-mode");
        itemToEdit.remove();
        isEditMode = false;
    } else {
        // Check if item already exists
        if (checkIfItemExists(newItem)) {
            alert("Item already exists");
            return;
        }
    }

    // Add item to DOM
    addItemsToDOM(newItem);

    // Add item to local storage
    addItemToStorage(newItem);

    checkUI();
    itemInput.value = "";
}

function addItemsToDOM(item) {
    const liEl = document.createElement("li");
    liEl.appendChild(document.createTextNode(item));

    const btnEl = createButtonEl("remove-item btn-link text-red");
    liEl.appendChild(btnEl);

    // Append to list
    itemList.appendChild(liEl);

    // return liEl;
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

function addItemToStorage(item) {
    const itemsFromStorage = getItemsFromStorage();

    itemsFromStorage.push(item);
    // Save to local storage
    localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

function getItemsFromStorage() {
    let itemsFromStorage;

    if (localStorage.getItem("items") === null) {
        itemsFromStorage = [];
    } else {
        // Get items from local storage
        itemsFromStorage = JSON.parse(localStorage.getItem("items"));
    }

    return itemsFromStorage;
}

function checkIfItemExists(item) {
    const itemsFromStorage = getItemsFromStorage();

    // if (itemsFromStorage.includes(item)) {
    //     return true;
    // } else {
    //     return false;
    // }
    return itemsFromStorage.includes(item);
}

function onClickItem(e) {
    if (e.target.parentElement.classList.contains("remove-item")) {
        removeItem(e.target.parentElement.parentElement);
    } else {
        setItemToEditMode(e.target);
    }
}

function setItemToEditMode(item) {
    isEditMode = true;

    itemList.querySelectorAll("li").forEach((i) => {
        i.classList.remove("edit-mode");
    });

    item.classList.add("edit-mode");
    formBtn.innerHTML = "<i class='fa-solid fa-pen'></i> Update Item";
    formBtn.style.backgroundColor = "#228B22";
    itemInput.value = item.textContent;
}

function removeItem(item) {
    if (confirm("Are you sure?")) {
        // Remove from DOM
        item.remove();

        // Remove from local storage
        removeItemFromStorage(item.textContent);

        checkUI();
    }
}

function removeItemFromStorage(item) {
    const itemsFromStorage = getItemsFromStorage();
    const updatedItems = itemsFromStorage.filter(
        (i) => i.toLowerCase() !== item.toLowerCase()
    );

    localStorage.setItem("items", JSON.stringify(updatedItems));

    checkUI();
}

function clearItems() {
    while (itemList.firstChild) {
        itemList.removeChild(itemList.firstChild);
        console.log("clear items");
    }

    // Clear from local storage
    localStorage.removeItem("items");

    checkUI();
}

function checkUI() {
    itemInput.value = "";

    const items = itemList.querySelectorAll("li");
    if (items.length === 0) {
        clearBtn.style.display = "none";
        itemFilter.style.display = "none";
    } else {
        clearBtn.style.display = "block";
        itemFilter.style.display = "block";
    }

    isEditMode = false;
    formBtn.innerHTML = "<i class='fa-solid fa-plus'></i> Add Item";
    formBtn.style.backgroundColor = "#007bff";
}

function filterItems(e) {
    const text = e.target.value.toLowerCase();
    const items = itemList.querySelectorAll("li");
    items.forEach((item) => {
        const itemName = item.firstChild.textContent.toLowerCase();
        if (itemName.indexOf(text) !== -1) {
            item.style.display = "flex";
        } else {
            item.style.display = "none";
        }
    });
}

// Init app
function init() {
    // Event Listeners
    itemForm.addEventListener("submit", onAddItemSubmit);
    itemList.addEventListener("click", onClickItem);
    clearBtn.addEventListener("click", clearItems);
    itemFilter.addEventListener("input", filterItems);

    document.addEventListener("DOMContentLoaded", displayItems);

    checkUI();
}

init();
