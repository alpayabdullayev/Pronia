let row = document.getElementById("row2");
let basketArr = getLocalStorage("basket") || [];

function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}

function createCards(
  Productid,
  dataCategory,
  img_url,
  img_url2,
  productName,
  productPrice
) {
  let col = document.createElement("div");
  col.classList.add("col-12", "col-md-6", "col-lg-3", "cardData");
  col.setAttribute("data-category", dataCategory);

  col.innerHTML = `
        <div class="card">
            <div class="product-item">
                <div class="product-img">
                    <a href="shop.html">
                        <img class="primary-img" src="${img_url}" alt="Product Images">
                        <img class="secondary-img" src="${img_url2}" alt="Product Images">
                    </a>
                    <div class="product-add-action">
                        <ul class="d-flex gap-2">
                            <li><a href="#"><i class="fa-regular fa-heart"></i></a></li>
                            <li class="quuickview-btn"><a href="#"><i class="fa-regular fa-eye"></i></a></li>
                            <li class="addToBasket" ><a href=""><i class="fa-solid fa-cart-shopping"></i></a></li>
                        </ul>
                    </div>
                </div>
                <div class="product-content">
                    <a class="product-name" href="shop.html">${productName}</a>
                    <div class="price-box pb-1">
                        <span class="new-price">$${productPrice}</span>
                    </div>
                    <div class="rating-box">
                        <ul class="d-flex">
                            <li><i class="fa fa-star"></i></li>
                            <li><i class="fa fa-star"></i></li>
                            <li><i class="fa fa-star"></i></li>
                            <li><i class="fa fa-star"></i></li>
                            <li><i class="fa fa-star"></i></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `;

  let addToBasket = col.querySelector(".addToBasket");
  addToBasket.onclick = function (e) {
    e.preventDefault();
    if (basketArr.find((x) => x.Productid === Productid)) {
      return;
    }
    let product = {
      Productid,
      dataCategory,
      img_url,
      img_url2,
      productName,
      productPrice,
      count: 1,
    };
    basketArr.push(product);
    setLocalStorage("basket", basketArr);
    console.log("sebetdeki", productName);
    generateBasket();
  };
  row.appendChild(col);
}

async function getProducts() {
  try {
    const response = await fetch("http://localhost:4000/newProducts");
    const data = await response.json();
    data.forEach((element) => {
      createCards(
        element.id,
        element.dataCategory,
        element.image,
        element.image2,
        element.name,
        element.price
      );
    });
  } catch (error) {
    console.error(error);
  }
}



getProducts();
