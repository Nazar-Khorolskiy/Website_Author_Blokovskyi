const API_KEY = 'e1e482d424ee12e552018bc595fcf9f1';

const buyBtn = document.getElementById('open-buy-modal');
const buyBackdrop = document.getElementById('buy-backdrop');
const closeBuyModal = document.getElementById('close-buy-modal');

if (buyBtn) {
    buyBtn.onclick = () => buyBackdrop.classList.add('is-open');
}
if (closeBuyModal) {
    closeBuyModal.onclick = () => buyBackdrop.classList.remove('is-open');
}

const cityInput = document.getElementById('np-city');
const cityResults = document.getElementById('city-results');
const branchInput = document.getElementById('np-branch-input');
const branchResults = document.getElementById('branch-results');
const finalWarehouse = document.getElementById('warehouse-final-value');

let allWarehouses = [];

cityInput.addEventListener('input', async (e) => {
    const value = e.target.value;
    if (value.length < 2) {
        cityResults.style.display = 'none';
        return;
    }

    const response = await fetch('https://api.novaposhta.ua/v2.0/json/', {
        method: 'POST',
        body: JSON.stringify({
            apiKey: API_KEY,
            modelName: "Address",
            calledMethod: "searchSettlements",
            methodProperties: { CityName: value, Limit: "5" }
        })
    });

    const data = await response.json();
    const settlements = data.data[0]?.Addresses || [];

    cityResults.innerHTML = '';
    settlements.forEach(item => {
        const div = document.createElement('div');
        div.className = 'autocomplete-item';
        div.innerText = item.Present;
        div.onclick = () => selectCity(item.DeliveryCity, item.Present);
        cityResults.appendChild(div);
    });
    cityResults.style.display = 'block';
});

async function selectCity(cityRef, cityName) {
    cityInput.value = cityName;
    cityResults.style.display = 'none';
    
    branchInput.disabled = false;
    branchInput.value = '';
    branchInput.placeholder = "Завантаження відділень...";
    branchResults.innerHTML = '';

    const response = await fetch('https://api.novaposhta.ua/v2.0/json/', {
        method: 'POST',
        body: JSON.stringify({
            apiKey: API_KEY,
            modelName: "Address",
            calledMethod: "getWarehouses",
            methodProperties: { CityRef: cityRef }
        })
    });

    const data = await response.json();
    allWarehouses = data.data;
    branchInput.placeholder = "Введіть номер або адресу...";
}

branchInput.addEventListener('input', (e) => {
    const value = e.target.value.toLowerCase();
    
    if (value.length === 0) {
        branchResults.style.display = 'none';
        return;
    }

    const filtered = allWarehouses.filter(w => 
        w.Description.toLowerCase().includes(value) || 
        w.Number.includes(value)
    ).slice(0, 15);

    renderBranches(filtered);
});

function renderBranches(branches) {
    branchResults.innerHTML = '';
    
    if (branches.length === 0) {
        branchResults.style.display = 'none';
        return;
    }

    branches.forEach(warehouse => {
        const div = document.createElement('div');
        div.className = 'autocomplete-item';
        div.innerText = warehouse.Description;
        div.onclick = () => {
            branchInput.value = warehouse.Description;
            finalWarehouse.value = warehouse.Description;
            branchResults.style.display = 'none';
        };
        branchResults.appendChild(div);
    });
    
    branchResults.style.display = 'block';
}

document.addEventListener('click', (e) => {
    if (e.target !== cityInput) cityResults.style.display = 'none';
    if (e.target !== branchInput) branchResults.style.display = 'none';
});

const orderForm = document.getElementById('order-form');
const orderFeedback = document.getElementById('order-feedback');

orderForm.onsubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData(orderForm);

  try {
    const response = await fetch(orderForm.action, {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      orderFeedback.textContent = "Дякуємо! Замовлення прийнято. Автор зв'яжеться з вами.";
      orderForm.reset();
      setTimeout(() => {
        buyBackdrop.classList.remove('is-open');
        orderFeedback.textContent = "";
      }, 3000);
    } else {
      orderFeedback.style.color = "red";
      orderFeedback.textContent = "Помилка відправки. Спробуйте ще раз.";
    }
  } catch (error) {
    orderFeedback.style.color = "red";
    orderFeedback.textContent = "Сталася помилка з'єднання.";
  }
};