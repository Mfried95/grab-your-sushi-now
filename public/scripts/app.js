// Client facing scripts here

const orderCart = [];

$(document).ready(function () {
  $("button.add").on("click", function () {
    const item = JSON.parse($(this).val());
    orderCart.push(item);
    localStorage.setItem("order-items", JSON.stringify(orderCart));
  });

  $(".remove").click(function () {
    const item = $(this).val();
    const index = orderCart.indexOf(item);
    if (index > -1) {
      orderCart.splice(index, 1);
      localStorage.setItem("order-items", JSON.stringify(orderCart));
      localStorage.removeItem(item); // Remove the item from the local storage
    }
  });


  let orderItems = localStorage.getItem("order-items");
  
  // parse the JSON string into an array of objects
  let itemsArray = JSON.parse(orderItems);
  
  // loop through the array to access each object
  for (let i = 0; i < itemsArray.length; i++) {
    let currentItem = itemsArray[i];
  
    // create a new div element for the current item
    let itemDiv = $("<div>");
  
    // set the div's content to the properties of the currentItem object
    itemDiv.append("<h3>" + currentItem.name + "</h3>");
    itemDiv.append("<p>Cost: $" + currentItem.cost + "</p>");
    
    // append the itemDiv to the "order-details" section
    $(".order-details").append(itemDiv);
  }
});