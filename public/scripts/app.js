// Client facing scripts here


$(document).ready(function () {

  let orderCartCookie = localStorage.getItem('order-items');
  let orderCart = orderCartCookie ? JSON.parse(orderCartCookie) : [];
  $('#ordercart-length').text(orderCart.length);

  let clickCount = 0;

  $("button.add").on("click", function () {

    clickCount++;
    $(".click-count").text(`${clickCount}`).css('color', "red");

    const item = JSON.parse($(this).val());
    orderCart.push(item);
    console.log("++++++", item, orderCart);
    localStorage.setItem("order-items", JSON.stringify(orderCart));
  });


  $(".remove").click(function () {
    
    const item = JSON.parse($(this).val());
    console.log(item);

    let orderCart = localStorage.getItem('order-items');
    orderCart = JSON.parse(orderCart);
    console.log(orderCart);

    const index = orderCart.findIndex(x => x.id === item.id);
    if (index < 0) return;
    orderCart.splice(index, 1);


    let cartCount = localStorage.setItem('order-items', JSON.stringify(orderCart));
    $(".click-count").text(`${cartCount}`).css('color', "red");

  });


  let orderItems = localStorage.getItem("order-items");
  let itemsArray = JSON.parse(orderItems);
  
  let itemCounts = {};
  let totalCost = 0;
  
  for (let i = 0; i < itemsArray.length; i++) {
    let currentItem = itemsArray[i];
    
    if (itemCounts[currentItem.name]) {
      itemCounts[currentItem.name]++;
    } else {
      itemCounts[currentItem.name] =  1;
    }
    
    // Add the cost of the current item to the totalCost
    totalCost += parseFloat(currentItem.cost);
  }
  
  // Display the item counts
  for (let itemName in itemCounts) {
    let count = itemCounts[itemName];
    let countElement = $("<div>").text(itemName + ": " + count);
    $(".order-details").append(countElement);
  }
  
  // Display the total cost with two decimal points
  let totalCostElement = $("<div>").text("Total Cost: $" + totalCost.toFixed(2));
  $(".order-details").append(totalCostElement);


  

});