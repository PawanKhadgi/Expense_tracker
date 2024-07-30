
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const entryForm = document.getElementById('entry-form');
    const entriesList = document.getElementById('entries-list');
    const netBalance = document.getElementById('net-balance');
    const loginContainer = document.getElementById('login-container');
    const expenseTrackerContainer = document.getElementById('expense-tracker-container');
    const userGreeting = document.getElementById('user-greeting');

    let currentUser = null;
    let entries = [];

    const fetchEntries = async () => {
        const response = await fetch(`/entries?user=${currentUser}`);
        const data = await response.json();
        entries = data;
        renderEntries();
    };

    const calculateNetBalance = () => {
        const totalIncome = entries.filter(entry => entry.type === 'income').reduce((acc, entry) => acc + entry.amount, 0);
        const totalExpenses = entries.filter(entry => entry.type === 'expense').reduce((acc, entry) => acc + entry.amount, 0);
        return totalIncome - totalExpenses;
    };

    const renderEntries = () => {
        entriesList.innerHTML = '';
        entries.forEach((entry, index) => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                ${entry.date} - ${entry.description}: $${entry.amount.toFixed(2)} (${entry.type})
                <button class="delete-btn" data-index="${index}">Delete</button>
            `;
            entriesList.appendChild(listItem);
        });
        netBalance.textContent = calculateNetBalance().toFixed(2);
    };

    const addEntry = async (amount, description, date, type) => {
        const response = await fetch('/entries', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user: currentUser, amount: parseFloat(amount), description, date, type })
        });
        const data = await response.json();
        fetchEntries();
    };

    const deleteEntry = async (index) => {
        const response = await fetch(`/entries/${index}?user=${currentUser}`, {
            method: 'DELETE'
        });
        const data = await response.json();
        fetchEntries();
    };

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const userId = document.getElementById('user-id').value;
        currentUser = `${username}-${userId}`;

        userGreeting.textContent = `Hello, ${username}!`;
        loginContainer.style.display = 'none';
        expenseTrackerContainer.style.display = 'block';
        fetchEntries();
    });

    entryForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const amount = document.getElementById('amount').value;
        const description = document.getElementById('description').value;
        const date = document.getElementById('date').value;
        const type = document.getElementById('type').value;

        addEntry(amount, description, date, type);
        entryForm.reset();
    });

    entriesList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-btn')) {
            const index = e.target.getAttribute('data-index');
            deleteEntry(index);
        }
    });
});
