let mainDiv = document.getElementById("myDiv");
let cartPage = document.getElementById("cart");
let anchor = document.createElement("a");
// when cart button is clicked, we are taken to the cart page
cartPage.addEventListener("click", () => {
  let location = window.location.assign("cart.html");
  anchor.setAttribute("href", location);
});
cartPage.appendChild(anchor);

const fetchProductData = async () => {
  try {
  const response = await fetch("https://fakestoreapi.com/products");
  const productData = await response.json();
  return productData;
  }
  catch (error) {
    const errorElement = document.createElement('p')
    errorElement.style.textAlign = 'center'
    errorElement.innerText = 'Please check your internet connection'
    mainDiv.appendChild(errorElement)
    console.log('An error has occured', error)
  }
};

const updateCount = () => {
  let cartIcon = document.getElementById("item-count");
  let itemsInStorage = localStorage.getItem("movies");

  let addedItems = itemsInStorage ? JSON.parse(itemsInStorage) : [];
  // cart is assigned the total number of items in the cart
  cartIcon.innerText = addedItems.length;
};
updateCount();

// Function to show an alert when item is added or exists in the cart
const showAlert = (alertMessage) => {
  const alertItems = document.querySelector(".alert");
  const message = document.getElementById("message");
  message.innerText = alertMessage;
  alertItems.style.display = "flex";
  alertItems.style.justifyContent = "space-around";
  const alertButton = document.querySelector("#alertButton");
  alertButton.style.padding = "0px";

  alertButton.addEventListener("click", () => {
    alertItems.style.display = "none";
  });
};
const hanldeAddToCart = (id, data, addButton) => {
  addButton.addEventListener("click", () => {
    let itemsInStorage = localStorage.getItem("movies");
    // If items exist in local storage, change them into their original
    // array and assign to the variable, else we assign it with an empty array.
    let addedItems = itemsInStorage ? JSON.parse(itemsInStorage) : [];
    let isItemAlreadyInCart = false;

    for (let i = 0; i < addedItems.length; i++) {
      if (addedItems[i].id === id) {
        // if an item already exists, we show an alert message
        let alertMessage = "Item already exists in the cart";
        showAlert(alertMessage);
        isItemAlreadyInCart = true;
      }
    }
    if (!isItemAlreadyInCart) {
      let newItem = {
        id: data.id,
        image: data.image,
        price: Math.floor(data.price),
        count: 1,
        title: data.title,
        subTotal: Math.floor(data.price),
      };
      if (newItem) { 
        addedItems.push(newItem);
        let alertMessage = "Item has been added sucessfully";
        showAlert(alertMessage);
      }
    }

    localStorage.setItem("movies", JSON.stringify(addedItems));
    updateCount();
  });
};

// function to show rating stars on each product
const getRatingStars = (rating) => {
  const wholeStars = Math.floor(rating);
  const halfStars = rating % 1 >= 0.5;
  const emptyStars = 5 - Math.ceil(rating);

  let stars = "";

  // We loop through the length of whole stars and add a full icon to each whole number.
  for (let i = 0; i < wholeStars; i++) {
    stars += "<i class='bx bxs-star'></i>";
  }

  if (halfStars) {
    stars += "<i class='bx bxs-star-half'></i>";
  }

  for (let i = 0; i < emptyStars; i++) {
    stars += "<i class='bx bx-star'></i>";
  }

  return stars;
};
const showItems = async () => {
  const products = await fetchProductData();
  let divForFourItems;
  products.forEach((data, index) => {
    // show only 4 products each in a row.
    if (index % 4 === 0) {
      divForFourItems = document.createElement("div");
      divForFourItems.style.display = "flex";
      divForFourItems.style.justifyContent = "center";
      divForFourItems.style.marginBottom = "10px";
      mainDiv.appendChild(divForFourItems);
    }

    // reducing the length of the product title
    let titleLength = 29;
    let dataTitle = `${data.title}`;
    let tranculatedTitle = dataTitle.substring(0, titleLength);

    const divElement = document.createElement("div");
    divElement.style.width = "300px";
    divElement.style.height = "490px";
    let addButton = document.createElement("button");
    addButton.textContent = "Add to cart";
    let id = data.id;
    hanldeAddToCart(id, data, addButton);
    divElement.style.margin = "5px";
    let image = document.createElement("img");
    image.style.width = "100%";
    image.setAttribute("src", data.image);
    let category = document.createElement("p");
    category.textContent = data.category;
    let rating = document.createElement("div");
    const ratingStars = getRatingStars(data.rating.rate);
    rating.innerHTML = ratingStars;
    rating.style.color = "#FFB200";
    let price = document.createElement("p");
    price.style.color = "red";
    price.textContent = `USD ${data.price}`;
    let title = document.createElement("p");
    title.innerText = tranculatedTitle;
    divElement.append(image, category, title, price, rating, addButton);
    divForFourItems.appendChild(divElement);
    divForFourItems.appendChild(divElement);
  });
};
showItems();
