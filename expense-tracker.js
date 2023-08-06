// Sample data to simulate expenses (you'll replace this with server-side data)
let expenses = [];

function addExpense() {
    const name = document.getElementById('name').value;
    const expenseType = document.getElementById('expense-type').value;
    const amount = parseFloat(document.getElementById('amount').value);

    if (isNaN(amount) || amount < 0) {
        alert('Please enter a valid amount.');
        return;
    }

    expenses.push({ name, expenseType, amount });
    document.getElementById('name').value = '';
    document.getElementById('amount').value = '';

    updateExpenseTable();
}

function updateExpenseTable() {
    
    result = document.querySelector('#result');
    const expenseTableBody = document.getElementById('expense-table-body');
    expenseTableBody.innerHTML = '';

    // Calculate and display expenses by person
    const expenseSummary = {};
    expenses.forEach((expense) => {
        const { name, expenseType, amount } = expense;
        if (!expenseSummary[name]) {
            expenseSummary[name] = {
                food: 0,
                travel: 0,
                hotel: 0,
                essentials: 0,
                other:0,
            };
        }
        expenseSummary[name][expenseType] += amount;
    });

    // Display the summary in the table
    for (const name in expenseSummary) {
        const { food, travel, hotel, essentials, other } = expenseSummary[name];
        const total = food + travel + hotel + essentials + other ;
        const row = `<tr>
                        <td>${name}</td>
                        <td>${food}</td>
                        <td>${travel}</td>
                        <td>${hotel}</td>
                        <td>${essentials}</td>
                        <td>${other}</td>
                        <td>${total}</td>
                    </tr>`;
        expenseTableBody.innerHTML+=row;
    }

    const calulateBtn = document.querySelector('#cal');

    calulateBtn.onclick = () => {
        result.innerHTML = '';
        console.log(expenseSummary);

        fetch('/calulate-expenses', {
            method: 'POST',
            body: JSON.stringify(expenseSummary),
            headers: new Headers({
                'Content-Type' : 'application/json',
            })
        })
        .then((res) => res.json())
        .then((data) => {
            // console.log(data);

            renderResult(data);
        })
        .catch((error) => console.log(error));
    }
}

function renderResult(data) {

    total_expenses = data['total'];
    gets_expenses = data['gets'];
    gives_expenses = data['gives'];

    br = document.createElement('br');

    result.innerHTML += `<h2>Total Expenses:</h2>`
    for(var t in total_expenses) {
        result.innerHTML += t + ' : ';
        result.innerHTML += total_expenses[t];
        result.append(br);
    }
    
    result.innerHTML += `<h2>Gets Expenses:</h2>`
    for(var t in gets_expenses) {
        if(gets_expenses[t] > 0) {
            result.innerHTML += t + ' : ';
            result.innerHTML += gets_expenses[t];
            result.append(br);
        }
    }
    
    result.innerHTML += `<h2>Give Expenses:</h2>`
    for(var t in gives_expenses) {
        if(gives_expenses[t] > 0) {
            result.innerHTML += t + ' : ';
            result.innerHTML += gives_expenses[t];
            result.append(br);
        }
    }
    console.log(total_expenses);
    console.log(gets_expenses);
    console.log(gives_expenses);
}


