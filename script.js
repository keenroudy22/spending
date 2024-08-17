document.getElementById('addExpenseForm').addEventListener('submit', function(event) {
  event.preventDefault();
  
  const amount = document.getElementById('amount').value;
  if (amount && !isNaN(amount)) {
    fetch('YOUR_WEB_APP_URL', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ amount: parseFloat(amount) })
    })
    .then(response => response.text())
    .then(result => {
      if (result === 'Success') {
        document.getElementById('amount').value = '';
        updateTotal();
      } else {
        alert('Failed to add expense: ' + result);
      }
    })
    .catch(error => console.error('Error:', error));
  } else {
    alert('Please enter a valid amount');
  }
});

function updateTotal() {
  fetch('YOUR_WEB_APP_URL?action=getTotal')
    .then(response => response.json())
    .then(data => {
      document.getElementById('total').textContent = `Total for ${data.month}: $${data.total.toFixed(2)}`;
    })
    .catch(error => {
      document.getElementById('total').textContent = 'Error loading total';
      console.error('Error:', error);
    });
}

window.onload = updateTotal;
