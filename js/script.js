document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('itemForm');
    const itemList = document.getElementById('itemList');
    
    // Function to fetch and display items
    function fetchItems() {
      fetch('http://localhost:3000/items')
        .then(response => response.json())
        .then(items => {
          itemList.innerHTML = '';
          items.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `
              ${item.name} - Quantity: ${item.quantity}
              <button class="deleteBtn" data-id="${item.id}">Delete</button>
            `;
            itemList.appendChild(li);
          });
        });
    }
    
    // Fetch and display items on page load
    fetchItems();
    
    // Event listener for form submission (Create operation)
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      
      const itemName = document.getElementById('itemName').value;
      const itemQuantity = parseInt(document.getElementById('itemQuantity').value);
      
      fetch('http://localhost:3000/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: itemName, quantity: itemQuantity }),
      })
      .then(response => response.json())
      .then(data => {
        fetchItems(); // Refresh items list after adding
        form.reset(); // Clear form inputs
      });
    });
    
    // Event delegation for Delete operation
    itemList.addEventListener('click', function (e) {
      if (e.target.classList.contains('deleteBtn')) {
        const itemId = e.target.getAttribute('data-id');
        
        fetch(`http://localhost:3000/items/${itemId}`, {
          method: 'DELETE',
        })
        .then(response => response.json())
        .then(data => {
          fetchItems(); // Refresh items list after deletion
        });
      }
    });
  });
  