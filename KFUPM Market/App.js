document.addEventListener('DOMContentLoaded', function () {
    const itemListContainer = document.getElementById('itemListContainer');

    // Fetch item data from JSON file
    fetch('items.json')
        .then(response => response.json())
        .then(items => {
            // Initial rendering of items
            items.forEach(item => addItemToList(item));
        })
        .catch(error => console.error('Error fetching item data:', error));

    function addItemToList(item) {
        const itemElement = document.createElement('div');
        itemElement.classList.add('col-4');

        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <h4>${item.name}</h4>
            <p class="date">${item.phoneNumber}</p>
            <p>${item.price}</p>
        `;

        itemListContainer.appendChild(itemElement);
    }

    // Function to add a new item
    function addNewItem(name, phoneNumber, price, image) {
        const newItem = { name, phoneNumber, price, image };
        addItemToList(newItem);
    }
});
