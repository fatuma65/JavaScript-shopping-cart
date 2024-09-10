const tableElement = document.querySelector("table");
const tableBody = document.querySelector("tbody");

// implement a button that goes back to the previous page
let back = document.getElementById("back");
back.addEventListener("click", () => {
  window.location.href = "index.html";
});
back.style.padding = "10px";
back.style.backgroundColor = "#cbb157";
back.style.color = "white";
back.style.margin = "5px";

const addedItems = localStorage.getItem("movies");
if (addedItems === "[]") {
  const errorElement = document.createElement("h4");
  errorElement.innerText = "There are no items in cart yet";
  tableBody.appendChild(errorElement);
  console.log("There are no items stored");
}
// make items gotten from local storage into their original format(array)
const parsedItems = JSON.parse(addedItems);

const handleQuantity = (
  increaseButton,
  decreaseButton,
  quantity,
  subTotalElement,
  data
) => {
  increaseButton.addEventListener("click", () => {
    // increase the quantity when the button is clicked
    data.count++;
    quantity.textContent = data.count;
    handleSubTotal(subTotalElement, data);
  });
  decreaseButton.addEventListener("click", () => {
    if (data.count > 1) {
      // decrease the count when the button is clicked
      data.count--;
      quantity.textContent = data.count;
      handleSubTotal(subTotalElement, data);
    }
  });
};
const handleSubTotal = (subTotalElement, data) => {
  // when i click on the increase button, the subtotal amount increases as well
  data.subTotal = data.price * data.count;
  subTotalElement.textContent = `USD ${data.subTotal}`;
  handleTotalAmount();
  localStorage.setItem("movies", JSON.stringify(parsedItems));
};

const handleRemove = (removeButton, tableRow, id) => {
  removeButton.addEventListener("click", () => {
    // loop through the array from local storage to find the selected item
    for (let i = 0; i < parsedItems.length; i++) {
      if (parsedItems[i].id === id) {
        // remove the item with the id
        parsedItems.splice(i, 1);
        console.log("Item has been removed");
        tableRow.remove();
        handleTotalAmount()
        // update local storage with the new storage
        localStorage.setItem("movies", JSON.stringify(parsedItems));
      }
    }
  });
};

const handleTotalAmount = () => {
  // calculating the total amount of all the products in the cart
  const total = parsedItems.reduce((sum, element) => sum + element.subTotal, 0);
  let totalAmount = document.querySelector("#totalAmounts");
  totalAmount.textContent = `USD ${total}`;
  totalAmount.style.color = 'red'
  totalAmount.style.fontWeight = 'bold'
};

const initializingTotalAmount = () => {
  let totalSubAmount = document.createElement("td");
  let totalDiv = document.querySelector("tfoot");
  let totalSubRow = document.createElement("tr");
  let totalSubPara = document.createElement("td");

  totalSubAmount.id = "totalAmounts";

  totalDiv.style.marginTop = "10px";
  totalSubRow.style.display = "flex";
  totalSubRow.style.justifyContent = "space-around";
  totalSubRow.style.margin = "10px";

  totalSubPara.innerText = "Total";
  totalSubPara.style.fontWeight = "600";

  totalSubRow.append(totalSubPara, totalSubAmount);
  totalDiv.appendChild(totalSubRow);
  tableElement.append(totalDiv);

  totalSubAmount.style.marginLeft = "40px";

  handleTotalAmount();
};

initializingTotalAmount();

function handleData() {
  parsedItems.forEach((data) => {
    // create the table rows in the DOM
    let tableRow = document.createElement("tr");
    let tableImageDetails = document.createElement("td");
    let images = document.createElement("img");
    let tablePriceDetails = document.createElement("td");
    let tableQuantityDetails = document.createElement("td");
    let quantityDiv = document.createElement("div");
    let decreaseButton = document.createElement("button");
    let increaseButton = document.createElement("button");
    let quantity = document.createElement("p");
    let subTotalElement = document.createElement("td");

    let removeButton = document.createElement("button");
    removeButton.innerText = "remove";
    removeButton.style.marginTop = "30px";
    removeButton.style.marginRight = "10px";
    removeButton.style.backgroundColor = "#e27b65";
    removeButton.style.color = "white";
    removeButton.style.border = "none";
    removeButton.style.padding = "8px";
    removeButton.style.fontWeight = "600";
    let id = data.id;
    handleRemove(removeButton, tableRow, id);
    quantityDiv.style.display = "flex";
    quantityDiv.style.alignItems = "center";
    quantityDiv.style.justifyContent = "center";
    increaseButton.style.margin = "10px";
    increaseButton.style.width = "20px";
    increaseButton.style.height = "20px";
    decreaseButton.style.margin = "10px";
    decreaseButton.style.width = "20px";
    decreaseButton.style.height = "20px";

    images.style.width = "80px";
    images.style.height = "80px";

    handleQuantity(
      increaseButton,
      decreaseButton,
      quantity,
      subTotalElement,
      data
    );
    quantityDiv.append(decreaseButton, quantity, increaseButton);
    tableQuantityDetails.appendChild(quantityDiv);
    tableRow.append(
      tableImageDetails,
      tablePriceDetails,
      tableQuantityDetails,
      subTotalElement,
      removeButton
    );
    tableBody.appendChild(tableRow);

    images.setAttribute("src", data.image);

    tablePriceDetails.innerText = `USD ${data.price}`;
    decreaseButton.innerText = "-";
    increaseButton.innerText = "+";
    quantity.innerText = data.count;
    subTotalElement.innerText = `USD ${data.subTotal}`;
    tableImageDetails.appendChild(images);

    localStorage.setItem("movies", JSON.stringify(parsedItems));
  });
}
handleData();