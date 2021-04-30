let form = document.getElementById("formCheckout");
let receiver = document.forms["inforForm"]["receiver"];
let email = document.forms["inforForm"]["email"];
let phone = document.forms["inforForm"]["phone"];
let address = document.forms["inforForm"]["address"];
let errReceiver = document.getElementById("err-receiver"),
    errAddress = document.getElementById("err-address"),
    errEmail = document.getElementById("err-email"),
    errPhone = document.getElementById("err-phone");

form.addEventListener("submit", function (e) {
    console.log("e", e);
    e.preventDefault();

    checkInputs();
});

function checkInputs() {
    let information = {};
    let receiverValue = receiver.value.trim();
    let addressValue = address.value.trim();
    let emailValue = email.value.trim();
    let phoneValue = phone.value.trim();
    let testInput = true;

    if (receiverValue === "") {
        setErrorForm(receiver, "Bạn chưa nhập họ tên khách hàng");
        testInput = false;
    } else {
        setSuccessForm(receiver, "");
    }

    if (addressValue === "") {
        setErrorForm(address, "Bạn chưa nhập địa chỉ");
        testInput = false;
    } else {
        setSuccessForm(address, "");
    }

    if (emailValue === "") {
        setErrorForm(email, "Bạn chưa nhập email");
        testInput = false;
    } else if (!isEmail(emailValue)) {
        testInput = false;
        setErrorForm(email, "Email chưa đúng định dạng");
    } else {
        setSuccessForm(email, "");
    }

    if (phoneValue === "") {
        setErrorForm(phone, "Bạn chưa nhập số điện thoại");
        testInput = false;
    } else if (!isPhone(phoneValue)) {
        testInput = false;
        setErrorForm(phone, "Bạn chưa nhập đúng định dạng số điện thoại");
    } else {
        setSuccessForm(phone, "");
    }

    if (
        receiverValue === "" ||
        addressValue === "" ||
        emailValue === "" ||
        phoneValue === "" ||
        testInput === false
    ) {
        return false;
    } else {
        information = {
            receiver: receiverValue,
            add: addressValue,
            email: emailValue,
            phone: phoneValue,
        };
        localStorage.setItem("information", JSON.stringify(information));
        location.assign("payment.html");
    }
}

function setErrorForm(input, message) {
    const formGroup = input.parentElement;
    let errMessage = formGroup.querySelector(".error-message");
    errMessage.innerHTML = message;
    formGroup.className = "form-group error";
}

function setSuccessForm(input, message) {
    const formGroup = input.parentElement;
    let errMessage = formGroup.querySelector(".error-message");

    errMessage.innerHTML = message;
    formGroup.className = "form-group success";
}

function isEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}

function isPhone(phone) {
    return /^[0-9]{10}$/.test(phone);
}
