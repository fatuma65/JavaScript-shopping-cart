const tableElement = document.querySelector("table");
const tableBody = document.querySelector("tbody");

let dataDetails = [
  {
    image: "The Hobbit movie",
    price: 12000,
    increase: "+",
    decrease: "-",
    count: 1,
    subTotal: 12000,
  },
  {
    image: "Bad boys movie",
    price: 17000,
    increase: "+",
    decrease: "-",
    count: 1,
    subTotal: 12000,
  },
  {
    image: "Aqua Man movie",
    price: 18000,
    increase: "+",
    decrease: "-",
    count: 1,
    subTotal: 12000,
  },
];
const handleQuantity = (
  increaseButton,
  negativeButton,
  paragraphButton,
  data
) => {
  increaseButton.addEventListener("click", () => {
    data.count++;
    paragraphButton.textContent = data.count;
  });
  negativeButton.addEventListener("click", () => {
    data.count--;
    paragraphButton.textContent = data.count;
  });
};
function handleData() {
  dataDetails.forEach((data) => {
    console.log(data);

    let tableRow = document.createElement("tr");
    let tableImageDetails = document.createElement("td");
    let images = document.createElement("td");
    let tablePriceDetails = document.createElement("td");
    let tableQuantityDetails = document.createElement("td");
    let quantityDiv = document.createElement("div");
    let negativeButton = document.createElement("button");
    let increaseButton = document.createElement("button");
    let paragraphButton = document.createElement("p");
    let subTotalElement = document.createElement("td");

    quantityDiv.style.display = "flex";
    quantityDiv.style.alignItems = "center";
    quantityDiv.style.justifyContent = "center";
    increaseButton.style.margin = "10px";
    increaseButton.style.width = "20px";
    increaseButton.style.height = "20px";
    negativeButton.style.margin = "10px";
    negativeButton.style.width = "20px";
    negativeButton.style.height = "20px";

    handleQuantity(increaseButton, negativeButton, paragraphButton, data);

    quantityDiv.append(negativeButton, paragraphButton, increaseButton);
    tableQuantityDetails.appendChild(quantityDiv);
    tableRow.append(
      tableImageDetails,
      tablePriceDetails,
      tableQuantityDetails,
      subTotalElement
    );
    tableBody.appendChild(tableRow);

    images.textContent = data.image;
    tablePriceDetails.innerText = data.price;
    negativeButton.innerText = data.decrease;
    increaseButton.innerText = data.increase;
    paragraphButton.innerText = data.count;
    subTotalElement.innerText = data.subTotal;

    tableImageDetails.appendChild(images);
  });
}
handleData();
