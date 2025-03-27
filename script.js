
// mostrando o sidebar ao clickar no menu mobile

const mobile = document.querySelector('.menu-toggle');
const mobileLink = document.querySelector('.sidebar');

mobile.addEventListener("click", function(){
    mobile.classList.toggle("is-active");
    mobileLink.classList.toggle("active");
})

// fechar sidebar ao clickar

mobileLink.addEventListener("click", function(){
    const menuBars = document.querySelector(".is-active");
    if(window.innerWidth<=1020 && menuBars) {
    mobile.classList.toggle("is-active");
    mobileLink.classList.toggle("active");
    }
})

profile = document.querySelector('.profile-login');

document.querySelector('#user-btn').onclick = () =>{
  profile.classList.toggle('active');
}

// mmovimento para os lados do menu favoritos da casa
var step = 100;
var stepFilter = 60;
var scrolling = true;

$(".back").bind("click", function(e){
    e.preventDefault();
    $(".destaque-wrapper").animate({
        scrollLeft: "-=" + step + 'px'
    });
});

$(".next").bind("click", function(e){
    e.preventDefault();
    $(".destaque-wrapper").animate({
        scrollLeft: "+=" + step + 'px'
    });
});

// movimento para os lados da categoria de menus

$(".back-menus").bind("click", function(e){
    e.preventDefault();
    $(".filter-wrapper").animate({
        scrollLeft: "-=" + stepFilter + "px"
    })
})

$(".next-menus").bind("click", function(e){
    e.preventDefault();
    $(".filter-wrapper").animate({
        scrollLeft: "+=" + stepFilter + "px"
    })
})

// Carrrinho de compras
// cart popup

function toggleCartPopup(){
    const cartPopup = document.getElementById('cart-popup');
    cartPopup.classList.toggle('active');
}

// Close Cart Popup
function closeCart(){
    const cartPopup = document.getElementById('cart-popup');
    cartPopup.classList.remove('active');
}

// add cart button
function addToCart(itemName, itemPrice){
    const cartItems = document.getElementById('cart-items').getElementsByTagName('tbody')[0];
    const existingItem = Array.from(cartItems.getElementsByTagName('tr')).find(item=>item.cells[0].textContent === itemName);
    if(existingItem) {
      const itemCount = parseInt(existingItem.querySelector('.item-count').textContent) + 1;
      existingItem.querySelector('.item-count').textContent = itemCount;
      const itemTotal = parseFloat(existingItem.querySelector('.item-total').textContent) + parseFloat(itemPrice);
      existingItem.querySelector('.item-total').textContent = itemTotal.toFixed(2);
    } else {
      const newRow = cartItems.insertRow();
      newRow.innerHTML = `
        <td>${itemName}</td>
        <td class='item-count'>1</td>
        <td class='item-price'>${itemPrice}</td>
        <td class='item-total'>${itemPrice}</td>
        <td><button class='remove-item-btn'><i class="bi bi-trash3"></i></button></td>
      `;
    }
    updateCartCountAndTotal();
  }
  
  // remove item from cart
document.addEventListener('click', function(event){
    if(event.target.tagName === 'I' && event.target.parentNode.classList.contains('remove-item-btn')){
      const row = event.target.closest('tr');
      row.remove();
      updateCartCountAndTotal();
    }
  });
  
  function saveCartToLocalStorage() {
    const cartData = [];
    document.querySelectorAll('#cart-items tbody tr').forEach(row => {
      cartData.push({
        name: row.cells[0].textContent,
        quantity: parseInt(row.cells[1].textContent),
        price: parseFloat(row.cells[2].textContent)
      });
    });
    localStorage.setItem('cart', JSON.stringify(cartData));
  }
  
  // Modifique a função updateCartCountAndTotal
  function updateCartCountAndTotal() {
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');
    const cartItems = document.querySelectorAll('#cart-items tbody tr');
    let totalCount = 0;
    let total = 0;
    
    cartItems.forEach(item => {
      const itemCount = parseInt(item.querySelector('.item-count').textContent);
      const itemTotal = parseFloat(item.querySelector('.item-total').textContent);
      totalCount += itemCount;
      total += itemTotal;
    });
    
    cartCount.textContent = totalCount;
    cartTotal.textContent = total.toFixed(2);
    saveCartToLocalStorage(); // Salva automaticamente no localStorage
  }