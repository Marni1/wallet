
const incomeSection = document.querySelector('.income-area');
const expenseSection = document.querySelector('.expenses-area')
const addTransactionPanel = document.querySelector('.add-transaction-panel')
const avilableMoney = document.querySelector('.avilable-money');


const transactionNameInput = document.querySelector('#name');
const selectCategory = document.querySelector('#category');
const amountInput = document.querySelector('#amount');



const addTransactionBtn = document.querySelector('.add-transaction');
const saveBtn = document.querySelector('.save');
const cancleBtn = document.querySelector('.cancle');
const deleteBtns = document.getElementsByClassName('delete');
const deleteAllBtn = document.querySelector('.delete-all');

const lightBtn = document.querySelector('.light');
const darkBtn = document.querySelector('.dark')

let root = document.documentElement;
let ID = 0;
let categoryIcon;
let selectedCategory;
let moneyArr = [0]

const showPanel = () => {
    addTransactionPanel.style.display = 'flex'
}
const closePanel = () => {
    addTransactionPanel.style.display = 'none'
    clearInputs();
}
const checkForm = () => {
    if (transactionNameInput.value !== '' && amountInput.value !== '' && selectCategory.value !== 'none') {
        createNewTransaction();
    } else {
        alert('Wypełnij wszystkie pola!')
    }
}

const clearInputs = () => {
    transactionNameInput.value = ''
    amountInput.value = ''
    selectCategory.selectedIndex = 0;
}
const handleCategory = () => {
    selectedCategory = selectCategory.options[selectCategory.selectedIndex].text
}
const createNewTransaction = () => {
    const newTransaction = document.createElement('div');
    checkCategory(selectedCategory);
    newTransaction.classList.add('transaction');
    newTransaction.setAttribute('id', ID);
    newTransaction.innerHTML =
        `<p class="transaction-name">${categoryIcon}${transactionNameInput.value}</p>
        <p class="transaction-amount">${amountInput.value} zł
        <button class="delete" onclick="deleteTransaction(${ID})">
        <i class="fas fa-times"></i></button></p>`

    amountInput.value > 0 ? incomeSection.appendChild(newTransaction) && newTransaction.classList.add('income') : expenseSection.appendChild(newTransaction) && newTransaction.classList.add('expense')
    moneyArr.push(Number(amountInput.value))
    countMoney(moneyArr)
    closePanel();
    ID++;
    clearInputs();
}

const checkCategory = transaction => {
    switch (transaction) {
        case '[ + ] Przychód':
            categoryIcon = '<i class="fas fa-money-bill-wave"></i>'
            break;
        case '[ - ] Zakupy':
            categoryIcon = '<i class ="fas fa-cart-arrow-down"></i>';
            break;
        case '[ - ] Jedzenie':
            categoryIcon = '<i class = "fas fa-hamburger"></i>'
            break;
        case '[ - ] Kino':
            categoryIcon = '<i class="fa-solid fa-film"></i>';
    }
}

const countMoney = (money) => {
    const newMoney = money.reduce((acc, el) => {
        return acc + el

    })
    avilableMoney.textContent = `${newMoney} zł`
}

const deleteTransaction = (id) => {
    const transactionToDelete = document.getElementById(id)

    const transactionAmount = parseFloat(transactionToDelete.childNodes[2].innerText);
    const indexOftransaction = moneyArr.indexOf(transactionAmount);
    moneyArr.splice(indexOftransaction, 1);
    countMoney(moneyArr);
    transactionToDelete.remove();
}

const deleteAllTransactions = () => {
    incomeSection.innerHTML = '<h3>Przychód</h3>';
    expenseSection.innerHTML = '<h3>Wydatki</h3>';
    avilableMoney.textContent = '0zł'
    moneyArr = [0];
}
const changeStyleToLight = () => {
    root.style.setProperty('--first-color', '#f9f9f9');
    root.style.setProperty('--second-color', '#14161f');
    root.style.setProperty('--border-color', 'rgba(0,0,0, .2');
}
const changeStyleToDark = () => {
    root.style.setProperty('--first-color', '#14161f');
    root.style.setProperty('--second-color', '#f9f9f9');
    root.style.setProperty('--border-color', 'rgba(255,255,255, .4');
}

addTransactionBtn.addEventListener('click', showPanel);
cancleBtn.addEventListener('click', closePanel);
saveBtn.addEventListener('click', checkForm);
deleteAllBtn.addEventListener('click', deleteAllTransactions);
lightBtn.addEventListener('click', changeStyleToLight);
darkBtn.addEventListener('click', changeStyleToDark);
