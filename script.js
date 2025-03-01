// script.js
async function getMenu() {
    try {
        let response = await fetch('https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json');
        let menuItems = await response.json();
        
        let menuContainer = document.getElementById("menu-container");
        menuContainer.innerHTML = "";
        
        menuItems.forEach(item => {
            let menuItem = document.createElement("div");
            menuItem.className = "menu-item";
            menuItem.innerHTML = `
                <img src="${item.imgSrc}" alt="${item.name}" />
                <h3>${item.name}</h3>
                <p>$${item.price}</p>
                <button onclick="showOrderScreen('${item.name}')">Order</button>
            `;
            menuContainer.appendChild(menuItem);
        });
    } catch (error) {
        console.error("Error fetching menu:", error);
    }
}

function showOrderScreen(itemName) {
    document.querySelector(".container").style.display = "none";
    document.querySelector(".order-screen").style.display = "block";
    document.getElementById("order-summary").innerText = `You have ordered: ${itemName}`;
}

async function startOrder() {
    try {
        let order = await takeOrder();
        let prepStatus = await orderPrep();
        let paymentStatus = await payOrder();
        
        if (paymentStatus.paid) {
            thankyouFnc();
        }
    } catch (error) {
        console.error("Error in order process:", error);
    }
}

getMenu();
