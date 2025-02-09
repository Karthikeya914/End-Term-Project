let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
// API_KEY AND API_URL USED IN THE PROJECT 
const API_KEY = "9b9ad3fd56d44246905762866a550738";
const API_URL = `https://open.er-api.com/v6/latest/`;

let chartInstance = null;

// Adds a new expnse to the list and updates local storage
function addExpense() {
    const name = document.getElementById("expenseName").value;
    const amount = parseFloat(document.getElementById("expenseAmount").value);
    const category = document.getElementById("expenseCategory").value;
    const currency = document.getElementById("currency").value;

    if (!name || isNaN(amount) || amount <= 0) {
        alert("Enter valid expense details");
        return;
    }

    const expense = { id: Date.now(), name, amount, category, currency };
    expenses.push(expense);
    localStorage.setItem("expenses", JSON.stringify(expenses));
    renderExpenses(); // Update UI after adding new entry
}

// Re-draws the expnse list in the table
function renderExpenses() {
    const expenseList = document.getElementById("expenseList");
    expenseList.innerHTML = ""; // Clear the existing list before adding new ones

    expenses.forEach((expense, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${expense.name}</td>
            <td>${expense.amount.toFixed(2)}</td>
            <td>${expense.category}</td>
            <td>${expense.currency}</td>
            <td>
                <button onclick="deleteExpense(${index})">Delete</button>
            </td>
        `;
        expenseList.appendChild(row);
    });

    updateChart(); // Refresh the chart to reflect new expenses
}

// Removes an expense from the list and updates local storage
function deleteExpense(index) {
    expenses.splice(index, 1);
    localStorage.setItem("expenses", JSON.stringify(expenses));
    renderExpenses();
}

// Converts the amount into selected currncy using exchange API
async function convertExpenses() {
    const targetCurrency = document.getElementById("convertToCurrency").value;

    try {
        const response = await fetch(`${API_URL}USD?apikey=${API_KEY}`);
        const data = await response.json();
        const rates = data.rates;

        if (!rates[targetCurrency]) {
            alert("Conversion rate not avialable for selected currency.");
            return;
        }

        expenses = expenses.map(expense => {
            if (!rates[expense.currency]) return expense;
            const convertedAmount = (expense.amount / rates[expense.currency]) * rates[targetCurrency];
            return { ...expense, amount: convertedAmount, currency: targetCurrency };
        });

        localStorage.setItem("expenses", JSON.stringify(expenses));
        renderExpenses(); // Reflect changes on UI
    } catch (error) {
        alert("Error fetching currency rates. Try again later.");
    }
}

// Refreshs the expense chart based on categories
function updateChart() {
    const categories = {};
    expenses.forEach(exp => {
        categories[exp.category] = (categories[exp.category] || 0) + exp.amount;
    });

    const ctx = document.getElementById("expenseChart").getContext("2d");

    if (chartInstance !== null) {
        chartInstance.destroy(); // Prevent chart duplication issue
    }

    chartInstance = new Chart(ctx, {
        type: "pie",
        data: {
            labels: Object.keys(categories),
            datasets: [{
                data: Object.values(categories),
                backgroundColor: ["#ff6384", "#36a2eb", "#ffce56", "#4bc0c0", "#9966ff", "#ff9f40", "#4caf50", "#e91e63"]
            }]
        }
    });
}

// Loads the expnses from localStorage on page refresh
document.addEventListener("DOMContentLoaded", renderExpenses);
