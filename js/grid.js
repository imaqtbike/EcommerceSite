"use strict";
const productGrid = document.querySelector('.grid__product');
let products = [];
eventListeners();

//all event listeners
function eventListeners() {
    window.addEventListener('DOMContentLoaded', () => {
        loadJSON();
        loadCart();
    });
    productGrid.addEventListener('click', purchaseProduct);
}

//load json file into grid display
function loadJSON() {
    fetch('http://localhost:3000/products').then(response => {
        response.json().then(data => {
            let html = '';                  
            data.forEach(product => {
                html += `<div class="legacy__items__detail" '><img class='product__img' src="${product.img}" alt="OHUI">
                    <div class="legacy__items__detail__content legacy-content">
                    <h4 class='product__name'>${product.productName}</h4><a href="">
                    <p class='product__category'>${product.name}</p></a><span class="price">${product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}<small>vnd</small></span>
                    </div>
                    <div class="legacy__items__detail__icon">
                    <div class="legacy-cta">
                    <button class='add-to-cart-btn'>Mua hàng</button>
                    <a href=""><i class="fas fa-heart"></i></a><a href=""><i class="fas fa-sync-alt"></i></a>
                    </div>
                    </div>
                    </div>`;
            });
             productGrid.innerHTML = html;
        });
    });
}


function purchaseProduct(e) {
    if (e.target.classList.contains('add-to-cart-btn')) {
        let product = e.target.parentElement.parentElement.parentElement;
        getProductInfo(product);
    }
}


//get product info after add-cart btn is clicked
function getProductInfo(product) {
    let productInfo = {
        name: product.querySelector('.product__name').textContent,
        imgSrc: product.querySelector('.product__img').src,
        category: product.querySelector('.product__category').textContent,
        price: parseInt(product.querySelector('.price').textContent),
        count: 1,
    };
    pushItemInArray(productInfo);
}

function pushItemInArray(item) {
    if (products.length === 0) {
        products.push(item);
        alert(`Đã thêm thành công sản phẩm vào giỏ hàng!`)
        localStorage.setItem('products', JSON.stringify(products));
        return;
    }
    for (let i = 0; i <= products.length; i++) {
        if (products[i].name === item.name) {
            products[i].count++;
            localStorage.setItem('products', JSON.stringify(products));
            return;
        } else if (i === products.length - 1) {
            products.push(item);
            alert(`Đã thêm thành công sản phẩm vào giỏ hàng!`)
            localStorage.setItem('products', JSON.stringify(products));
            return;
        }
    }
    products.push(item);
}