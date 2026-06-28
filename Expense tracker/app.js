// State tracking variables stored inside memory
let dailyLimit = 20000;
let expensesList = [];

// DOM target mapping handles
const expenseForm = document.getElementById('expense-form');
const budgetLimitInput = document.getElementById('budget-limit-input');
const itemDesc = document.getElementById('item-desc');
const itemAmount = document.getElementById('item-amount');
const itemCategory = document.getElementById('item-category');

const displayBudget = document.getElementById('display-budget');
const displaySpent = document.getElementById('display-spent');
const displayBalance = document.getElementById('display-balance');

const ledgerRows = document.getElementById('ledger-rows');
const gaugeFillBar = document.getElementById('gauge-fill-bar');
const gaugePct = document.getElementById('gauge-pct');

// --- DATABASE CONTEXT LOAD ENGINE ---
window.addEventListener('DOMContentLoaded', () => {
    const storedLimit = localStorage.getItem('wallet_limit');
    const storedExpenses = localStorage.getItem('wallet_expenses');
    
    if (storedLimit) {
        dailyLimit = parseFloat(storedLimit);
        budgetLimitInput.value = dailyLimit;
    }
    if (storedExpenses) {
        expensesList = JSON.parse(storedExpenses);
    }
    
    renderApp();
});

// Update the configuration limit on the fly when modified by the user
budgetLimitInput.addEventListener('input', () => {
    const val = parseFloat(budgetLimitInput.value);
    dailyLimit = val && val > 0 ? val : 0;
    localStorage.setItem('wallet_limit', dailyLimit);
    updateDashboardCalculations();
});

// Intercept form submissions to register new expense data structures
expenseForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const expense = {
        id: Date.now(), // Unique ID timestamp token
        description: itemDesc.value.trim(),
        amount: parseFloat(itemAmount.value),
        category: itemCategory.value
    };
    
    expensesList.push(expense);
    localStorage.setItem('wallet_expenses', JSON.stringify(expensesList));
    
    // Clear out input message field container assets
    itemDesc.value = '';
    itemAmount.value = '';
    
    renderApp();
});

function deleteExpense(id) {
    expensesList = expensesList.filter(item => item.id !== id);
    localStorage.setItem('wallet_expenses', JSON.stringify(expensesList));
    renderApp();
}

function updateDashboardCalculations() {
    // 1. Calculate the summation allocation total spent
    const totalSpent = expensesList.reduce((sum, item) => sum + item.amount, 0);
    const balanceLeft = dailyLimit - totalSpent;
    
    // 2. Format and render numbers into standard localized string representations
    displayBudget.innerText = dailyLimit.toLocaleString('en-US', { minimumFractionDigits: 2 });
    displaySpent.innerText = `₦${totalSpent.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
    displayBalance.innerText = `₦${balanceLeft.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
    
    // 3. Handle Balance Left coloring alerts based on budget thresholds
    if (balanceLeft < 0) {
        displayBalance.style.color = '#f43f5e'; // Alert Warning Red
    } else {
        displayBalance.style.color = '#f8fafc'; // Reset Main Text White
    }
    
    // 4. Compute progress gauge slider bars filling states percentages
    let spendPercentage = dailyLimit > 0 ? ((totalSpent / dailyLimit) * 100) : 0;
    
    if (spendPercentage > 100) {
        spendPercentage = 100;
        gaugeFillBar.style.backgroundColor = '#f43f5e'; // Warning red state
    } else {
        gaugeFillBar.style.backgroundColor = '#10b981'; // Healthy emerald green state
    }
    
    gaugeFillBar.style.width = `${spendPercentage}%`;
    gaugePct.innerText = `${spendPercentage.toFixed(0)}%`;
}

function renderApp() {
    // Empty out existing structural markup rows to avoid replication cycles
    ledgerRows.innerHTML = '';
    
    // Build rows from array records and append to table layout template frame
    expensesList.forEach(item => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${item.description}</td>
            <td><span style="background-color: rgba(56, 189, 248, 0.1); color:#38bdf8; padding: 4px 8px; border-radius:4px; font-size:0.8rem;">${item.category}</span></td>
            <td style="font-weight:600;">₦${item.amount.toLocaleString()}</td>
            <td><button class="delete-btn" onclick="deleteExpense(${item.id})">🗑️</button></td>
        `;
        ledgerRows.appendChild(tr);
    });
    
    updateDashboardCalculations();
}
