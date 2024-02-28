// open and close cart
// 0000000000000000000000000000000000000000000000
const navCart = document.querySelector(".nav-cart");
const cartMenu = document.querySelector(".cart-menu");
const closeBtn = document.querySelector(".close");

navCart.addEventListener("click", () => {
  cartMenu.style.transform = "translateX(0%)";
});

closeBtn.addEventListener("click", () => {
  cartMenu.style.transform = "translateX(100%)";
});

// defining the products
// 0000000000000000000000000000000000000000000000
let allProducts = [
  {
    id: "1",
    image: "assets/images/menu1.png",
    name: "product name: 1",
    price: "120.00",
  },
  {
    id: "2",
    image: "assets/images/menu2.png",
    name: "product name: 2",
    price: "130.00",
  },
  {
    id: "3",
    image: "assets/images/menu3.png",
    name: "product name: 3",
    price: "193.00",
  },
  {
    id: "4",
    image: "assets/images/menu4.png",
    name: "product name: 4",
    price: "125.00",
  },
  {
    id: "5",
    image: "assets/images/menu5.png",
    name: "product name: 5",
    price: "150.00",
  },
  {
    id: "6",
    image: "assets/images/menu6.png",
    name: "product name: 6",
    price: "160.00",
  },
];

// dynamicly showing the products
// 0000000000000000000000000000000000000000000000
let productWrapper = document.querySelector(".product-wrapper");
let showProduct = allProducts.map((item) => {
  return `<div class="product-card">
  <div class="image">
    <img src="${item.image}" alt="" />
  </div>
  <div class="card-content">
    <h1>${item.name}</h1>
    <h2>$${item.price}</h2>
    <button class="add-to-cart-btn" data-id="${item.id}">Add To Cart</button>
  </div>
</div>`;
});
showProduct = showProduct.join("");
productWrapper.innerHTML = showProduct;

// looping on the buttons
// 0000000000000000000000000000000000000000000000
const addToCarButtons = document.querySelectorAll(".add-to-cart-btn");
const insideCart = document.querySelector(".inside-cart");
const itemNumber = document.querySelector(".item-number");
const empty = document.querySelector(".empty");
let cart = {
  products: [],
  amount: [],
};
// making them global variable for better access
let index;
let product;
let total = 0;

addToCarButtons.forEach((button) => {
  // adding event to the looped buttons
  button.addEventListener("click", (e) => {
    const id = button.dataset.id;
    //get the index of the object from an array of object
    index = allProducts.findIndex((loopVariable) => loopVariable.id === id);
    product = allProducts[index];
    // console.log(product);

    // calling the function
    addingPricing();
    renderProductToCart();
    incrementDecrement();

    // checking the cart not to repeat the products
    let isFound = cart.products.find((element) => {
      if (element.id === id) {
        return true;
      }
      return false;
    });

    if (isFound === false) {
      return;
    } else {
      button.disabled = true;
    }
    //
    cartMenu.style.transform = "translateX(0%)";
    empty.classList.add("hidden");
    //
  });
});

// 0000000000000000000000000000000000000000000000
function renderProductToCart() {
  let insideTheCarts = cart.products.map((insideTheCart) => {
    return `
        <div class="inside-cart-product">
        <div class="image">
          <img src="${insideTheCart.image}" alt="" />
        </div>
        <div class="content">
          <div class="name">
            <h5>${insideTheCart.name}</h5>
          </div>
          <div class="price">
            <h4>${insideTheCart.price}</h4>
          </div>
          <div class="number-of-product">
            <button class="decrease-btn" id = "${insideTheCart.id}"> - </button>
            <h4 class="count-value">1</h4>
            <button class="increase-btn" id = "${insideTheCart.id}">+</button>
          </div>
        </div>
      </div>
        `;
  });
  insideTheCarts = insideTheCarts.join("");
  insideCart.innerHTML = insideTheCarts;
}

// 0000000000000000000000000000000000000000000000
function incrementDecrement() {
  const decreaseBtns = document.querySelectorAll(".decrease-btn");
  const countValues = document.querySelectorAll(".count-value");
  const increaseBtns = document.querySelectorAll(".increase-btn");
  let count = 1;

  // 0000000000000000000000000000000000000000000000
  decreaseBtns.forEach((decreaseBtn) => {
    decreaseBtn.addEventListener("click", () => {
      if (count === 1) {
        return;
      } else {
        count -= 1;
        // console.log(decreaseBtn);
        // console.log(count);
      }
      countValues.forEach((countValue) => {
        countValue.innerHTML = count;
      });
    });
  });
  // 0000000000000000000000000000000000000000000000
  increaseBtns.forEach((increaseBtn) => {
    increaseBtn.addEventListener("click", () => {
      // console.log(product.price);
      console.log(product);
      count += 1;

      countValues.forEach((countValue) => {
        countValue.innerHTML = count;
      });
    });
  });
}
// pricing
// 0000000000000000000000000000000000000000000000
function addingPricing() {
  let addingPrices = cart.amount.push(+product.price);

  cart.amount.forEach((addingPrice) => {
    total += addingPrice;
  });
  const totalPrice = document.querySelector(".total");
  totalPrice.innerText = `$${total}`;

  // pushing the finded products values to empty array
  cart.products.push(product);
  itemNumber.innerText = cart.products.length;
}
