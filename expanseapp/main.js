document.addEventListener("DOMContentLoaded", function () {
    const expenseForm = document.getElementById("expense-form");
    const expenseName = document.getElementById("expense-name");
    const expenseAmount = document.getElementById("expense-amount");
    const expenseList = document.getElementById("expense-list");
    const totalAmountDisplay = document.getElementById("total-amount");

    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    let totalAmount = calculateTotal();

    renderExpenses();

    expenseForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = expenseName.value.trim();
        const amount = parseFloat(expenseAmount.value.trim());

        if (
            name.length === 0 ||
            amount.length === 0 ||
            isNaN(amount) ||
            amount < 0
        ) {
            alert("Please enter valid values(valid name and +ve amount)");
            return;
        }

        const expense = {
            id: Date.now(),
            name,
            amount,
        };

        // Add expense to the list and update local storage
        expenses.push(expense);
        saveExpenseToLocal();
        renderExpenses();
        updateTotal();

        // Clear input fields
        expenseName.value = "";
        expenseAmount.value = "";
    });

    function calculateTotal() {
        return expenses.reduce((sum, expense) => sum + expense.amount, 0);
    }

    function saveExpenseToLocal() {
        localStorage.setItem("expenses", JSON.stringify(expenses));
    }

    function updateTotal() {
        totalAmount = calculateTotal();
        totalAmountDisplay.textContent = totalAmount;
    }

    function renderExpenses() {
        updateTotal();
        expenseList.innerHTML = "";
        expenses.forEach((expense) => {
            const item = document.createElement("li");
            item.innerHTML = `
                <span>${expense.name} - $${expense.amount}</span>
                <button class="delete-btn" data-id="${expense.id}">X</button>
            `;
            expenseList.appendChild(item);
        });
    }

    expenseList.addEventListener("click", function (e) {
        if (e.target.tagName === "BUTTON") {
            const id = parseInt(e.target.getAttribute("data-id"));
            expenses = expenses.filter((expense) => expense.id !== id);
            saveExpenseToLocal();
            renderExpenses();
        }
    });
});
