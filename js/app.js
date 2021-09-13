const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.images;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `
    <div class="single-product">
      <div>
        <img class="product-image" src=${product.image}></img>
        <h3>${product.title}</h3>
        <p>Category: ${product.category}</p>
        <h5>Rating: ${product.rating.rate}  Totatal rated: ${product.rating.count}</h5>
        <h2>Price: $ ${product.price}</h2>
        <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>
        <button  id="details-btn" class="btn btn-danger">Details</button>
      </div>
    </div>
      `;
    document.getElementById("all-products").appendChild(div);
  }

};

let count = 0;
const addToCart = (id, price) => {
  //console.log('cartID:',id);
  count = count + 1;
  document.getElementById("total-Products").innerText = count;

  updatePrice("price", price);
  updateTaxAndCharge();
  updateTotal(); 
  
};

const getInputValue = (id) => {
  //console.log('inputID:',id);
  const element = document.getElementById(id).innerText;
  //console.log('getInputElement:',element);
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  //console.log('pm:',value);
  const convertedOldPrice = getInputValue(id);
  //console.log('old Price:',convertedOldPrice);
  const convertPrice = parseFloat(value);
  console.log('convertPrice:',convertPrice);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = value.toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  console.log('tax:',priceConverted);
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  else if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  else if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
  else{
    setInnerText("delivery-charge", 20);
    setInnerText("total-tax", priceConverted * 0);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal = ( getInputValue("price") + getInputValue("delivery-charge") +
  getInputValue("total-tax")).toFixed(2);
  document.getElementById("total").innerText = grandTotal;
};
