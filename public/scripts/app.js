// Client facing scripts here

const orderCart = [];

$(document).ready(function () {
  
  $("button.add").on("click", function () {
    const item = $(this).val();
    console.log(item);
    orderCart.push(item);
    localStorage.setItem('order-items', JSON.stringify(orderCart));
  });

  $(".remove").click(function () {
    const item = $(this).val();
    const index = orderCart.indexOf(item);
    if (index > -1) {
      orderCart.splice(index, 1);
    }
    console.log(orderCart);
  });


});