
/*<div className="legacy__items__detail legacy-detail5"><img src="./assets/images/product5.jpg" alt="OHUI">
    <div className="legacy__items__detail__content legacy-content">
        <h4>OHUI</h4><a href="">
        <p>Mỹ phẩm Châu Âu</p></a><span className="price">335.000<small>vnd</small></span>
    </div>
    <div className="legacy__items__detail__icon">
        <div className="legacy-cta">
            <button>Mua hàng</button>
            <a href=""><i className="fas fa-heart"></i></a><a href=""><i className="fas fa-sync-alt"></i></a>
        </div>
    </div>
</div>*/

///load product grid from JSON file
function loadJSON() {
    fetch('http://localhost:3000/products')
        .then(response => response.json())
        .then(data => {
            let html = '';
            data.forEach(product => {
                console.log(product)
            })
        })
}