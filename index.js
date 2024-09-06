let mainDiv = document.getElementById("myDiv");
let cartPage = document.getElementById("cart");
let anchor = document.createElement("a");
// when cart is clicked, we are taken to the cart page
cartPage.addEventListener("click", () => {
  let location = window.location.assign("index.html");
  anchor.setAttribute("href", location);
});
cartPage.appendChild(anchor);

// create the products data
let dataDetails = [
  {
    id: 1,
    image: "images/after.jpg",
    price: 12000,
    count: 1,
    title: "After Movie",
    subTotal: 12000,
  },
  {
    id: 2,
    image: "images/bad-boys.jpg",
    price: 17000,
    count: 1,
    title: "Bad boys Movie",
    subTotal: 17000,
  },
  {
    id: 3,
    image: "images/aqua-man.jpg",
    price: 18000,
    count: 1,
    title: "Aqua Man Movie",
    subTotal: 18000,
  },
  {
    id: 4,
    image: "images/before.jpg",
    price: 15000,
    count: 1,
    title: "Me Before You Movie",
    subTotal: 15000,
  },
  {
    id: 5,
    image: "images/black-swan.jpg",
    price: 13000,
    count: 1,
    title: "Me Before You Movie",
    subTotal: 13000,
  },
  {
    id: 6,
    image: "images/everest.jpg",
    price: 8000,
    count: 1,
    title: "Me Before You Movie",
    subTotal: 8000,
  },
  {
    id: 7,
    image: "images/escape.jpg",
    price: 10000,
    count: 1,
    title: "Me Before You Movie",
    subTotal: 10000,
  },
  {
    id: 8,
    image: "images/fair-play.jpg",
    price: 16000,
    count: 1,
    title: "Me Before You Movie",
    subTotal: 16000,
  },
];

const updateCount = () => {
  let cartIcon = document.getElementById('item-count')
  let itemsInStorage = localStorage.getItem("movies");

  let addedItems = itemsInStorage ? JSON.parse(itemsInStorage) : [];
  // cart is assigned the total number of items in the cart
  cartIcon.innerText = addedItems.length
}
updateCount()

const hanldeAddToCart = (id, addButton) => {
  addButton.addEventListener("click", () => {
    let itemsInStorage = localStorage.getItem("movies");
    // if there are items in local storage, set the addedItems to that parsed version of those items else we put it becomes an empty array.
    let addedItems = itemsInStorage ? JSON.parse(itemsInStorage) : [];
    
    for (let i = 0; i < dataDetails.length; i++) {
        // we find an item with a specific id and add it to the array as well as locl storage.
      if (dataDetails[i].id === id) {
        alert('Item added to cart successfully')
        addedItems.push(dataDetails[i]);
      }
    }
    localStorage.setItem("movies", JSON.stringify(addedItems));
    updateCount()
  });
};

const showItems = () => {
  let divForFourItems;
  dataDetails.forEach((data, index) => {

    // show only 4 items each in a row.
    if (index % 4 === 0) {
      divForFourItems = document.createElement("div");
      divForFourItems.style.display = "flex";
      divForFourItems.style.justifyContent = "center";
      divForFourItems.style.marginBottom = "20px";
      mainDiv.appendChild(divForFourItems);
    }
    const divElement = document.createElement("div");
    let addButton = document.createElement("button");
    addButton.textContent = "Add to cart";
    let id = data.id;
    hanldeAddToCart(id, addButton);
    divElement.style.margin = "10px";
    let image = document.createElement("img");
    image.setAttribute("src", data.image);
    let price = document.createElement("p");
    price.textContent = `UGX ${data.price}`;
    let title = document.createElement("p");
    title.innerText = data.title;
    divElement.append(image, title, price, addButton);
    divForFourItems.appendChild(divElement);
  });
};
showItems();
