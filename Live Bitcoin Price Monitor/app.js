let selectedCurrency = "ngn";

async function fetchLivePrices() {
    try {
        const response = await fetch('data.json', { cache: "no-store" });
        if (!response.ok) throw new Error("Syncing...");
        
        const data = await response.json();
        
        // Update timestamps and base core USD metrics
        document.getElementById('timestamp').innerText = data.timestamp;
        document.getElementById('btc-usd').innerText = data.btc.usd;
        document.getElementById('eth-usd').innerText = data.eth.usd;
        
        // Handle contextual asset dropdown swapping for Bitcoin
        const btcLabel = document.getElementById('btc-converted-label');
        const btcPrice = document.getElementById('btc-converted-price');
        
        // Handle contextual asset dropdown swapping for Ethereum
        const ethLabel = document.getElementById('eth-converted-label');
        const ethPrice = document.getElementById('eth-converted-price');

        if (selectedCurrency === "ngn") {
            btcLabel.innerText = "Bitcoin (NGN)";
            btcPrice.innerText = data.btc.ngn;
            
            ethLabel.innerText = "Ethereum (NGN)";
            ethPrice.innerText = data.eth.ngn;
        } else if (selectedCurrency === "eur") {
            btcLabel.innerText = "Bitcoin (EUR)";
            btcPrice.innerText = data.btc.eur;
            
            ethLabel.innerText = "Ethereum (EUR)";
            ethPrice.innerText = data.eth.eur;
        }
        
    } catch (error) {
        console.log("Waiting for backend synchronization...", error);
    }
}

document.getElementById('currency-select').addEventListener('change', (event) => {
    selectedCurrency = event.target.value;
    fetchLivePrices();
});

fetchLivePrices();
setInterval(fetchLivePrices, 2000);
