"use strict";
function loadJSON() {
    fetch('http://localhost:3000/products').then(response => {
        response.json().then(data => {
            let html = '';
            data.forEach(product => {
                html += `<div class="legacy__items__detail legacy-detail5"><img src="${product.img}" alt="OHUI">
                    <div class="legacy__items__detail__content legacy-content">
                    <h4>${product.productName}</h4><a href="">
                    <p>${product.name}</p></a><span class="price">${product.price}<small>vnd</small></span>
                    </div>
                    <div class="legacy__items__detail__icon">
                    <div class="legacy-cta">
                    <button class='add-to-cart-btn'>Mua hàng</button>
                    <a href=""><i class="fas fa-heart"></i></a><a href=""><i class="fas fa-sync-alt"></i></a>
                    </div>
                    </div>
                    </div>`;
        })
            const productGrid = document.querySelector('.grid__product');
            productGrid.innerHTML = html;
    })
})}
    
loadJSON();