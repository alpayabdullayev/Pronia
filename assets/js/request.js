let row = document.getElementById("row");
let basketArr = getLocalStorage("basket") || [];
let bascetCountQuantity = document.querySelector(".count");
let bascetCountQuantityFixed = document.querySelector(".countfix");

let totalCost = 0;

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
    generateBasket();

    let localLength = getLocalStorage("basket").length;
    bascetCountQuantity.textContent = localLength;
    bascetCountQuantityFixed.textContent = localLength;

        totalCost += productPrice; 
        updateTotalCostDisplay();
  };
  row.appendChild(col);
}

async function getProducts() {
  try {
    const res = await axios.get("http://localhost:3000/products");
    const allProducts = res.data;
    // const displayedProducts = allProducts.filter((product) => product.display === true);
    allProducts.forEach((element) => {
      createCards(
        element.id,
        element.dataCategory,
        element.image,
        element.image2,
        element.name,
        element.price
      );
    });
    // const row2 = document.getElementById("row2"); 
    // displayedProducts.forEach((element) => {
    //   createCards(
    //     element.id,
    //     element.dataCategory,
    //     element.image,
    //     element.image2,
    //     element.name,
    //     element.price
    //   );
    // });
  } catch (error) {
    console.error(error);
  }
}

let localLength = getLocalStorage("basket").length;
bascetCountQuantity.textContent = localLength;
bascetCountQuantityFixed.textContent = localLength;

function generateBasket() {
  const offcanvasContentMain = document.getElementById("offcanvasContentMain");
  offcanvasContentMain.innerHTML = "";

  basketArr.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.innerHTML = `
      <div class="miniCard d-flex">
          <div class="card-img">
              <img src="${product.img_url}" alt="">
          </div>
          <div class="cardInfo d-flex flex-column">
              <div class="cardName"><h5>${product.productName}</h5></div>
              <div class="cardCount">
              <span>${product.productPrice} x</span>
              
              <button onclick="decreaseCount(${product.Productid})">-</button><span>${product.count}</span> <button onclick="increaseCount(${product.Productid})">+</button>
              </div>
              
          </div>
          <div class="delete">
              <button class="deleteBtn" data-id="${product.Productid}">X</button>
          </div>
      </div>
      `;

    offcanvasContentMain.appendChild(productDiv);
    const deleteButton = productDiv.querySelector(".deleteBtn");
    deleteButton.addEventListener("click", () => {
      const productId = parseInt(deleteButton.getAttribute("data-id"));
      removeBasket(productId);
    });
  });
}

function increaseCount(productId) {
  const product = basketArr.find((p) => p.Productid === productId);
  if (product) {
    product.count++;
    setLocalStorage("basket", basketArr);
    generateBasket();
    updateTotalCostDisplay();
  }
}

function decreaseCount(productId) {
  const product = basketArr.find((p) => p.Productid === productId);
  if (product && product.count > 1) {
    product.count--;
    setLocalStorage("basket", basketArr);
    generateBasket();
    updateTotalCostDisplay();
  }
}
function removeBasket(productId) {
  basketArr = basketArr.filter((product) => product.Productid !== productId);
  setLocalStorage("basket", basketArr);
  generateBasket();
  updateTotalCostDisplay();
  bascetCountQuantity.textContent = basketArr.length;
  bascetCountQuantityFixed.textContent = basketArr.length;
}

initializeBasket();

function initializeBasket() {
  basketArr = getLocalStorage("basket") || [];
  generateBasket();
  updateTotalCostDisplay();
}

function calculateTotalCost() {
  const totalCost = basketArr.reduce((acc, product) => {
    return acc + product.productPrice * product.count;
  }, 0);

  return totalCost;
}
function updateTotalCostDisplay() {
  const totalCost = calculateTotalCost();
  const discountedTotalCost = calculateDiscountedTotalCost();
  const totalCount = document.querySelector("#totalCost");
  const discountedTotalCount = document.querySelector("#discountedTotalCost");

  if (totalCount) {
    totalCount.textContent = `CEMI ${totalCost.toFixed(2)} AZN`;
  }

  if (discountedTotalCount) {
    discountedTotalCount.textContent = `Endirimli CEMI: ${discountedTotalCost.toFixed(
      2
    )} AZN`;
  }
}
function calculateDiscountedTotalCost() {
  const totalCost = basketArr.reduce((acc, product) => {
    let discountedPrice = product.productPrice;
    if (product.count >= 5) {
      discountedPrice = product.productPrice * 0.8;
    }
    return acc + discountedPrice * product.count;
  }, 0);

  return totalCost;
}

//   const totalCost = calculateTotalCost();
//   let offcanvasEnd = document.getElementById("offcanvasEnd")
//   let totalCount = document.createElement("h5")
//   totalCount.textContent = totalCost
//   offcanvasEnd.appendChild(totalCount)
getProducts();
