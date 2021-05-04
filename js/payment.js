'use strict'
let infoReceiver = document.querySelector(".customer-receiver span"),
    infoAdd = document.querySelector(".customer-address span"),
    infoEmail = document.querySelector(".customer-email span"),
    infoPhone = document.querySelector(".customer-phone span");
let tableCustomer = document.querySelector(".payment-complete__content__info__product table");
let totalText = document.querySelector(".payment-complete__content__info__product__total .price");

let infoCustomer = JSON.parse(localStorage.getItem("information")) || {},
    infoTotals = JSON.parse(localStorage.getItem("products"));

showCustomer(infoCustomer);
showCart(infoTotals);
updateCartTotal();
function showCustomer(data) {
    infoReceiver.innerHTML = data.receiver;
    infoAdd.innerHTML = data.add;
    infoEmail.innerHTML = data.email;
    infoPhone.innerHTML = data.phone;
}

function showCart(data) {
    let tableInfoRow = document.querySelector('.table__body')
    infoTotals.forEach((product) => {
        let rowItem = document.createElement('tr');
        rowItem.innerHTML = `<td><img src="${product.imgSrc}" alt='product image'></td>
                  <td>${product.name}</td>
                  <td><span class='cart-price'>${product.price}.000 vnd</span></td>
                  <td>      
                    <input name='product' class="product__quantity" type="number" min='1' max='100' value='${product.count}'>
                  </td>
                  <td><span class='cart-total-value'>${(parseInt(product.price) * product.count)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}.000 vnd
                  </span></td>
               `;
        tableInfoRow.appendChild(rowItem)
    })
}


function onBackInforPage() {
    location.href = "grid.html";
}

function onCheckout() {
    alert("Thanh toán thành công");
    products = [];
    infoCustomer = {};
    localStorage.setItem("products", JSON.stringify(products));
    localStorage.setItem("information", JSON.stringify(infoCustomer));
    location.href = "index.html";
}
