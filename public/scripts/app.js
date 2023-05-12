// Client facing scripts here

// When the page loads, get the order items from local storage
$(document).ready(function () {
  let orderCartCookie = localStorage.getItem("order-items");
  let orderCart = orderCartCookie ? JSON.parse(orderCartCookie) : [];
  $("#ordercart-length").text(orderCart.length);

  let clickCount = 0;

  // When the add button is clicked, increment the clickCount and update the orderCart in localStorage
  $("button.add").on("click", function () {
    clickCount++;
    $(".click-count").text(`${clickCount}`).css("color", "red");

    const item = JSON.parse($(this).val());
    orderCart.push(item);
    localStorage.setItem("order-items", JSON.stringify(orderCart));
  });

  // When the remove button is clicked, decrement the clickCount and update the orderCart in localStorage
  $(".remove").click(function () {
    const item = JSON.parse($(this).val());
    console.log(item);

    clickCount--; // Decrement the clickCount

    let orderCart = localStorage.getItem("order-items");
    orderCart = JSON.parse(orderCart);
    console.log(orderCart);

    // Find the index of the item to remove
    const index = orderCart.findIndex((x) => x.id === item.id);
    if (index < 0) return;
    orderCart.splice(index, 1);

    // Update the orderCart in localStorage
    localStorage.setItem("order-items", JSON.stringify(orderCart)); // Update the orderCart in localStorage

    if (clickCount < 1) {
      $(".click-count").text("").css("color", "red"); // If clickCount is less than one, hide the text
    } else {
      $(".click-count").text(`${clickCount}`).css("color", "red"); // Otherwise, display the updated clickCount
    }
  });

  $(".confirm").on("click", function () {
    const order_id = parseInt($(this).val());
    $.ajax({
      url: "/restaurant/confirm",
      method: "POST",
      data: JSON.stringify({ order_id: order_id }),
      contentType: "application/json",
    });
    window.location.reload();
  });

  // When the "Ready" button is clicked, send a POST request to the server
  $(".ready").on("click", function () {
    const order_id = parseInt($(this).val());

    console.log("complete order id", typeof order_id);
    // Send a POST request to the server
    $.ajax({
      url: "/restaurant/complete",
      method: "POST",
      data: JSON.stringify({ order_id: order_id }),
      contentType: "application/json",
    });
    window.location.reload();
  });

  // Create a payload to send to the server
  let orderItems = localStorage.getItem("order-items");
  let itemsArray = JSON.parse(orderItems);

  let itemCounts = {};
  let totalCost = 0;

  // Count the number of each item
  for (let i = 0; i < itemsArray.length; i++) {
    let currentItem = itemsArray[i];

    if (itemCounts[currentItem.name]) {
      itemCounts[currentItem.name]++;
    } else {
      itemCounts[currentItem.name] = 1;
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
  let totalCostElement = $("<div>").text(
    "Total Cost: $" + totalCost.toFixed(2)
  );
  $(".order-details").append(totalCostElement);

  let payload = createPayload();
  $("#send-order").click(() => {
    // Create a variable to store the order data
    const orderData = {
      orderCart: orderCart,
      totalCost: totalCost.toFixed(2),
    };
    console.log("order data", payload);
    // Make an AJAX POST request to send the order data
    $.ajax({
      url: "/order", // Replace with your actual endpoint URL
      method: "POST",
      data: JSON.stringify(payload),
      contentType: "application/json",
      success: function (response) {
        orderCart = [];
        console.log("sucess", response);
        // Clear the order items from local storage
        localStorage.removeItem("order-items");

        // Clear the click count and update the displayed value
        clickCount = 0;
        $(".click-count").text(clickCount).css("color", "black");

        // Clear any displayed order details
        $(".order-details").empty();

        console.log("Order sent successfully");
        window.location.reload();
      },
      // Handle errors
      error: function (xhr, status, error) {
        console.log("Error submitting form:", error);
        console.log("Status code:", xhr.status);
        console.log("Error message:", xhr.responseText);
      },
    });
  });

  $;
});

// Create a payload to send to the server
const createPayload = () => {
  let orderItems = localStorage.getItem("order-items");
  let itemsArray = JSON.parse(orderItems);

  let payload = {};
  let orderCart = {};
  let totalCost = 0;

  // Loop through the itemsArray and add each item to the orderCart
  for (let i = 0; i < itemsArray.length; i++) {
    let currentItem = itemsArray[i];

    // If the item is already in the orderCart, increment the quantity and cost
    if (orderCart[currentItem.id]) {
      orderCart[currentItem.id]["quantity"]++;
      orderCart[currentItem.id]["cost"] += parseFloat(currentItem.cost);
      // Otherwise, add the item to the orderCart
    } else {
      orderCart[currentItem.id] = {
        id: currentItem.id,
        name: currentItem.name,
        quantity: 1,
        cost: parseFloat(currentItem.cost),
      };
    }
    // Add the cost of the current item to the totalCost
    totalCost += parseFloat(currentItem.cost);
  }
  // Display the item counts
  payload = {
    orderCart: orderCart,
    totalCost: totalCost.toFixed(2),
  };

  return payload;
};
