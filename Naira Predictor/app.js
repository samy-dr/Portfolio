const pricingDatabase = {
    bread: { pastPrice: 350, presentPrice: 1200, unit: "Loaves" },
    rice: { pastPrice: 22000, presentPrice: 85000, unit: "Bags (50kg)" },
    fuel: { pastPrice: 145, presentPrice: 650, unit: "Litres" },
    data: { pastPrice: 1000, presentPrice: 1500, unit: "GB of Data" },
    food: { pastPrice: 800, presentPrice: 3500, unit: "Plates of Food" },
    movie: { pastPrice: 1500, presentPrice: 6000, unit: "Movie Tickets" },
    fees: { pastPrice: 45000, presentPrice: 180000, unit: "Terms of School Fees" }
};

const budgetInput = document.getElementById('budget-input');
const itemSelect = document.getElementById('item-select');
const pastQty = document.getElementById('past-quantity');
const presentQty = document.getElementById('present-quantity');
const pastUnit = document.getElementById('past-unit');
const presentUnit = document.getElementById('present-unit');
const insightText = document.getElementById('insight-text');
const usdBanner = document.getElementById('usd-banner');
// Target our new progress bar layout variables
const powerBar = document.getElementById('power-bar');
const strengthPct = document.getElementById('strength-percentage');

function calculatePurchasingPower() {
    const budget = parseFloat(budgetInput.value);
    const selectedItem = itemSelect.value;
    
    if (!budget || budget <= 0) {
        pastQty.innerText = "0";
        presentQty.innerText = "0";
        usdBanner.innerHTML = `Global Valuation: <b>$0.00 USD</b>`;
        powerBar.style.width = "0%";
        strengthPct.innerText = "0%";
        insightText.innerText = "Enter a valid budget above zero to see computations.";
        return;
    }

    const exchangeRate = 1400.00; 
    const dollarsValue = (budget / exchangeRate).toFixed(2);
    usdBanner.innerHTML = `Global Purchasing Value: Real-time calculation shows your budget is equivalent to <b>$${parseFloat(dollarsValue).toLocaleString()} USD</b> today.`;

    const commodity = pricingDatabase[selectedItem];
    
    const itemsInPast = (budget / commodity.pastPrice).toFixed(1);
    const itemsInPresent = (budget / commodity.presentPrice).toFixed(1);

    pastQty.innerText = itemsInPast;
    presentQty.innerText = itemsInPresent;
    
    pastUnit.innerText = commodity.unit;
    presentUnit.innerText = commodity.unit;

    const dropPercentage = (((itemsInPast - itemsInPresent) / itemsInPast) * 100).toFixed(0);
    
    // --- ANIMATED GRAPHIC LOGIC PIPELINE ---
    // Calculate the remaining retention percentage value asset strength
    const remainingStrength = (100 - dropPercentage);
    powerBar.style.width = `${remainingStrength}%`;
    strengthPct.innerText = `${remainingStrength}%`;
    // ----------------------------------------
    
    insightText.innerHTML = `Your ₦${budget.toLocaleString()} can buy <b style="color:#ef4444;">${itemsInPresent}</b> ${commodity.unit.toLowerCase()} today. In 2020, that exact same bill would have gotten you <b style="color:#10b981;">${itemsInPast}</b> units! That is an approximate purchasing drop of <b style="color:#ef4444;">${dropPercentage}%</b>.`;
}

budgetInput.addEventListener('input', calculatePurchasingPower);
itemSelect.addEventListener('change', calculatePurchasingPower);

calculatePurchasingPower();
