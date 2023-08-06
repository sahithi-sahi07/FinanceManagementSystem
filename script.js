
// Welcome Page
var welcomePage = document.getElementById("welcome-page");
var nextButton = document.getElementById("next-button");
var financeManagement = document.getElementById("finance-management");
var totalBalanceDisplay = document.getElementById("total-balance");
var goalList = document.getElementById("goal-list");
var incomeDisplay = document.getElementById("income-display");
var transactionNameInput = document.getElementById("transaction-name");
var transactionAmountInput = document.getElementById("transaction-amount");
var transactionCategoryInput = document.getElementById("transaction-category");
var addTransactionButton = document.getElementById("add-transaction");
var transactionList = document.getElementById("transaction-list");
var filterCategoryInput = document.getElementById("filter-category");
var filterNameInput = document.getElementById("filter-name");
var chartSection = document.getElementById("chart-section");
var incomeChart = document.getElementById("income-chart");

nextButton.onclick = function() {
    console.log('called');

    var financialGoals = document.getElementById("financial-goals").value;
    var income = parseInt(document.getElementById("income").value);

    if (financialGoals && income) {

        welcomePage.style.display = "none";
        financeManagement.style.display = "block";

        goals = financialGoals.split(",").map(function(goal) {
            return goal.trim();
        });
        incomeDisplay.textContent = "Rs." + income.toLocaleString();
        updateGoalList();
        updateTotalBalance();
        updateTransactionList();
        updateChart();
    }
};

addTransactionButton.addEventListener("click", function() {
    var name = transactionNameInput.value;
    var amount = parseFloat(transactionAmountInput.value);
    var category = transactionCategoryInput.value;

    if (name && amount && category) {
        var transaction = {
            name: name,
            amount: amount,
            category: category
        };

        transactions.push(transaction);
        updateTotalBalance();
        updateTransactionList();
        updateChart();

        transactionNameInput.value = "";
        transactionAmountInput.value = "";
        transactionCategoryInput.value = "income";
    }
});

filterCategoryInput.addEventListener("change", function() {
    updateTransactionList();
});

filterNameInput.addEventListener("input", function() {
    updateTransactionList();
});


// Functions for the Welcome Page
var goals = [];
var transactions = [];
var totalBalance = 0;

function updateGoalList() {
    goalList.innerHTML = "";
    for (var i = 0; i < goals.length; i++) {
        var goalItem = document.createElement("li");
        goalItem.textContent = goals[i];
        goalList.appendChild(goalItem);
    }
}

function updateTotalBalance() {
    totalBalance = transactions.reduce(function(acc, transaction) {
        if (transaction.category === "income") {
            return acc + transaction.amount;
        } else if (transaction.category === "expense") {
            return acc - transaction.amount;
        } else if (transaction.category === "savings") {
            return acc; // No change for savings category
        }
        return acc; // Add a default return value for other categories
    }, 0);

    totalBalanceDisplay.textContent = "Total Balance: $" + totalBalance.toLocaleString();
}

function updateTransactionList() {
    var categoryFilter = filterCategoryInput.value;
    var nameFilter = filterNameInput.value.toLowerCase();

    transactionList.innerHTML = "";

    var filteredTransactions = transactions.filter(function(transaction) {
        if (categoryFilter === "all" || transaction.category === categoryFilter) {
            return transaction.name.toLowerCase().includes(nameFilter);
        }
    });

    filteredTransactions.forEach(function(transaction) {
        var row = document.createElement("tr");

        var nameCell = document.createElement("td");
        nameCell.textContent = transaction.name;
        row.appendChild(nameCell);

        var amountCell = document.createElement("td");
        amountCell.textContent = "$" + transaction.amount.toLocaleString();
        row.appendChild(amountCell);

        var categoryCell = document.createElement("td");
        categoryCell.textContent = transaction.category;
        row.appendChild(categoryCell);

        var deleteCell = document.createElement("td");
        var deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", function() {
            var index = transactions.indexOf(transaction);
            if (index > -1) {
                transactions.splice(index, 1);
                updateTotalBalance();
                updateTransactionList();
                updateChart();
            }
        });
        deleteCell.appendChild(deleteButton);
        row.appendChild(deleteCell);

        transactionList.appendChild(row);
    });
}

function updateChart() {
    if (transactions.length === 0) {
        chartSection.style.display = "none";
        return;
    }

    chartSection.style.display = "block";

    var income = transactions.filter(function(transaction) {
        return transaction.category === "income";
    }).reduce(function(acc, transaction) {
        return acc + transaction.amount;
    }, 0);

    var expense = transactions.filter(function(transaction) {
        return transaction.category === "expense";
    }).reduce(function(acc, transaction) {
        return acc + transaction.amount;
    }, 0);

    var savings = transactions.filter(function(transaction) {
        return transaction.category === "savings";
    }).reduce(function(acc, transaction) {
        return acc + transaction.amount;
    }, 0);

    var data = {
        labels: ["Income", "Expense", "Savings"],
        datasets: [{
            data: [income, expense, savings],
            backgroundColor: ["#4CAF50", "#F44336", "#2196F3"],
            
        }]
    };

    var options = {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
            position: "right"
        }
    };

    incomeChart = new Chart(incomeChart, {
        type: "doughnut",
        data: data,
        options: options
    });
}

function showWelcomePage() {
    var loginPage = document.getElementById("login-page");
    var welcomePage = document.getElementById("welcome-page");
    loginPage.style.display = "none";
    welcomePage.style.display = "block";
}


