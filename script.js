// 1. Function to fetch and display the menu
function getMenu() {
    fetch('https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json')
    .then(response => response.json())
    .then(data => {
        const menuContainer = document.getElementById('menu');
        let menuHTML = '<h2>Menu</h2><ul>';
        data.forEach(item => {
            menuHTML += `<li>${item.name} - ${item.price}</li>`;
        });
        menuHTML += '</ul>';
        menuContainer.innerHTML = menuHTML;
    })
    .catch(error => console.error('Error fetching the menu:', error));
}

// 2. Simulate taking an order
function TakeOrder() {
    return new Promise((resolve) => {
        setTimeout(() => {
            const burgers = ['Cheese Burger', 'Chicken Burger', 'Veggie Burger', 'BBQ Burger', 'Spicy Burger'];
            const randomBurgers = [];
            for (let i = 0; i < 3; i++) {
                const randomIndex = Math.floor(Math.random() * burgers.length);
                randomBurgers.push(burgers[randomIndex]);
            }
            resolve({ burgers: randomBurgers });
        }, 2500);
    });
}

// 3. Simulate order preparation
function orderPrep() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ order_status: true, paid: false });
        }, 1500);
    });
}

// 4. Simulate payment
function payOrder() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ order_status: true, paid: true });
        }, 1000);
    });
}

// 5. Thank you function
function thankyouFnc() {
    alert("Thank you for eating with us today!");
}

// Function to handle the full order process
async function processOrder() {
    try {
        await getMenu(); // Display the menu

        const order = await TakeOrder(); // Simulate order being taken
        console.log('Order:', order);

        const preparation = await orderPrep(); // Simulate food preparation
        console.log('Order Preparation:', preparation);

        const payment = await payOrder(); // Simulate payment
        console.log('Payment:', payment);

        if (payment.paid) {
            thankyouFnc(); // Show thank you message after payment
        }
    } catch (error) {
        console.error('Error during the order process:', error);
    }
}

// Call the function to simulate the whole process when the page is loaded
document.addEventListener('DOMContentLoaded', processOrder);
