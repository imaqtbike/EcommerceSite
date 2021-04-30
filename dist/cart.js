'use strict';
const deleteButton = document.getElementsByClassName('delete--item');
const cartValue = document.querySelector('.cart__value');
const tableBody = document.querySelector('.table__body');
const totalValue = document.querySelector('.total__value');


function loadCart() {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    if (products.length === 0) {
        let process = document.querySelector('.process')
        process.innerHTML = '';
        let cartContent = document.querySelector('.cart__content');
        cartContent.innerHTML = `<div class="cart__content__nothing">
        <h1>Chưa có sản phẩm nào</h1>
        <a href="./grid.html">MUA SẮM</a>
    </div>`;
    }
    let cartTotalItem = document.querySelector('.cart__value');
    cartTotalItem.textContent = products.length;
    products.forEach((product, index) => {
        let cartItem = document.createElement('tr');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `<td><img src="${product.imgSrc}" alt='product image'></td>
                  <td>${product.name}</td>
                  <td><span class='cart-price'>${product.price}.000 vnd</span></td>
                  <td>
                    <button data-action="remove" id="btn-remove">-</button>
                    <input name='product' class="product__quantity" id='product__quantity-${index}' type="number" min='1' max='100' value='${product.count}'>
                    <button data-action="add" id='btn-add'>+</button>
                  </td>
                  <td><span class='cart-total-value'>${(parseInt(product.price) * product.count)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}.000 vnd
                  </span></td>
                  <td>
                    <button class="delete--item"><i class="far fa-trash-alt"></i></button>
                  </td>`;
        tableBody.appendChild(cartItem);
    });
    listenersForButton();
    updateCartTotal();
}

const listenersForButton = () => {
    const increaseButton = document.querySelectorAll('#btn-add');
    const decreaseButton = document.querySelectorAll('#btn-remove');
    for (let i = 0; i < increaseButton.length; i++) {
        increaseButton[i].addEventListener('click', (e) => {
            updateQuantity(e, i);
        });
    }
    ;
    for (let i = 0; i < decreaseButton.length; i++) {
        decreaseButton[i].addEventListener('click', (e) => {
            updateQuantity(e, i);
        });
    }
};

const updateQuantity = (e, index) => {
    const handleButtons = e.target.dataset.action;
    let products = JSON.parse(localStorage.getItem('products'));
    if (handleButtons === 'add') {
        let quantity = document.getElementById(`product__quantity-${index}`);
        quantity = products[index].count++;
    }
    if (handleButtons === 'remove') {
        let quantity = document.getElementById(`product__quantity-${index}`);
        quantity = products[index].count--;
        if (products[index].count <= 0) {
            products.splice(products.indexOf(products[index]), 1);
        }
    }
    localStorage.setItem('products', JSON.stringify(products));
    tableBody.innerHTML = '';
    loadCart();
};

function updateCartTotal() {
    let total = 0;
    let products = JSON.parse(localStorage.getItem('products'));
    total = products.reduce((acc, cur) => acc + cur.price * cur.count, 0);
    let totalValue = document.querySelector('.total__value');
    totalValue.textContent = `${total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}.000 vnd`
}