const tableElement = document.querySelector("table");
const tableBody = document.querySelector("tbody");

let back = document.getElementById("back");
back.addEventListener("click", () => {
  window.location.href = "home.html";
});
back.style.padding = "10px";
back.style.backgroundColor = "#cbb157";
back.style.color = "white";
back.style.margin = "5px";

const addedItems = localStorage.getItem("movies");
const parsedItems = JSON.parse(addedItems);

const handleQuantity = (
  increaseButton,
  negativeButton,
  paragraphButton,
  subTotalElement,
  data
) => {
  increaseButton.addEventListener("click", () => {
    // increase the count when the button is clicked
    data.count++;
    paragraphButton.textContent = data.count;
    handleSubTotal(subTotalElement, data);
  });
  negativeButton.addEventListener("click", () => {
    if (data.count > 1) {
      // decrease the count when the button is clicked
      data.count--;
      paragraphButton.textContent = data.count;
      handleSubTotal(subTotalElement, data);
    }
  });
};
const handleSubTotal = (subTotalElement, data) => {
  // when i click on the increase button, the subtotal amount increases as well
  let total = data.price * data.count;
  subTotalElement.textContent = total;
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
        // update local storage with the new storage
        localStorage.setItem("movies", JSON.stringify(parsedItems));
      }
    }
  });
};
const handleTotalAmount = () => {
  const total = parsedItems.reduce((sum, element) => sum + element.subTotal, 0);
  let totalDiv = document.querySelector("tfoot");
  let totalSubRow = document.createElement("tr");
  let totalSubPara = document.createElement("td");
  let totalSubAmount = document.createElement("td");

  totalDiv.style.marginTop = "10px";
  totalSubRow.style.display = "flex";
  totalSubRow.style.justifyContent = "space-around";
  totalSubRow.style.margin = "10px";

  totalSubPara.innerText = "Total";
  totalSubPara.style.fontWeight = "600";

  totalSubAmount.innerText = total;
  totalSubAmount.style.marginLeft = "40px";

  totalSubRow.append(totalSubPara, totalSubAmount);
  totalDiv.appendChild(totalSubRow);
  tableElement.append(totalDiv);
};
handleTotalAmount();
function handleData() {
  parsedItems.forEach((data) => {
    // create the table rows in the DOM
    let tableRow = document.createElement("tr");
    let tableImageDetails = document.createElement("td");
    let images = document.createElement("img");
    let tablePriceDetails = document.createElement("td");
    let tableQuantityDetails = document.createElement("td");
    let quantityDiv = document.createElement("div");
    let negativeButton = document.createElement("button");
    let increaseButton = document.createElement("button");
    let paragraphButton = document.createElement("p");
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
    negativeButton.style.margin = "10px";
    negativeButton.style.width = "20px";
    negativeButton.style.height = "20px";

    images.style.width = "80px";
    images.style.height = "80px";

    handleQuantity(
      increaseButton,
      negativeButton,
      paragraphButton,
      subTotalElement,
      data
    );
    quantityDiv.append(negativeButton, paragraphButton, increaseButton);
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

    tablePriceDetails.innerText = data.price;
    negativeButton.innerText = "-";
    increaseButton.innerText = "+";
    paragraphButton.innerText = 1;
    subTotalElement.innerText = data.subTotal;
    tableImageDetails.appendChild(images);
  });
}
handleData();



// getting the total amount
// get the sub total of each item
// - loop through the parsed array
// - get the subTotal of each element
// - add all the totals together
// add all the subtotals to get one total
