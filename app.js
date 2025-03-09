let totalCalories = 0;
const entryList = document.getElementById('entryList');
const totalDisplay = document.getElementById('totalCalories');

function addEntry() {
    const foodInput = document.getElementById('foodInput');
    const calorieInput = document.getElementById('calorieInput');
    
    const food = foodInput.value;
    const calories = parseInt(calorieInput.value);

    if (food && calories) {
        // Update total
        totalCalories += calories;
        totalDisplay.textContent = totalCalories;

        // Add to list
        const li = document.createElement('li');
        li.textContent = `${food}: ${calories} calories`;
        entryList.appendChild(li);

        // Clear inputs
        foodInput.value = '';
        calorieInput.value = '';

        // Save to localStorage
        saveData();
    }
}

function saveData() {
    const entries = Array.from(entryList.children).map(li => li.textContent);
    localStorage.setItem('calorieEntries', JSON.stringify(entries));
    localStorage.setItem('totalCalories', totalCalories);
}

function loadData() {
    const savedEntries = localStorage.getItem('calorieEntries');
    const savedTotal = localStorage.getItem('totalCalories');
    
    if (savedEntries) {
        const entries = JSON.parse(savedEntries);
        entries.forEach(entry => {
            const li = document.createElement('li');
            li.textContent = entry;
            entryList.appendChild(li);
        });
    }
    
    if (savedTotal) {
        totalCalories = parseInt(savedTotal);
        totalDisplay.textContent = totalCalories;
    }
}

// Load saved data when page loads
window.onload = loadData;

// Register service worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(reg => console.log('Service Worker registered'))
            .catch(err => console.log('Service Worker registration failed:', err));
    });
}