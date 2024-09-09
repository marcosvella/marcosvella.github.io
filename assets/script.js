const localStorageKey = "@petpucrs"

const products = [{
  id: 1,
  name: "Coleira para cachorro",
  price: 49.99,
  thumbnail: "/images/coleira-vermelha.png",
  type: "produto"
},
{
  id: 2,
  name: "Tapete Higiênico",
  price: 79.99,
  thumbnail: "/images/tapete-higienico.png",
  type: "produto"
},
{
  id: 3,
  name: "Tag rastreamento pet",
  price: 199.99,
  thumbnail: "/images/tag-rastreamento.png",
  type: "produto"
},
{
  id: 4,
  name: "Banho",
  price: 99.99,
  thumbnail: "/images/banho.png",
  type: "servico"
},
{
  id: 5,
  name: "Banho e Tosa",
  price: 129.99,
  thumbnail: "/images/tosa.png",
  type: "servico"
},
{
  id: 6,
  name: "Passeio com Guia",
  price: 39.99,
  thumbnail: "/images/passeio.png",
  type: "servico"
}
]

const addToCart = (productId) => {
  const cart = JSON.parse(localStorage.getItem(localStorageKey)) || []

  console.log(cart)
  console.log(productId)

  const product = products.find((product) => product.id === productId)
  if (!product) {
    return
  }

  console.log(product)

  if (cart.some((item) => item.id === product.id)) {
    alert("Produto já adicionado no carrinho. Altere a quantidade no carrinho.")
    return
  }

  product.quantity = 1

  cart.push(product)
  localStorage.setItem(localStorageKey, JSON.stringify(cart))
  alert("Produto adicionado ao carrinho!")
}

const removeFromCart = (index) => {
  const cart = JSON.parse(localStorage.getItem(localStorageKey)) || []
  const newCart = cart.filter((product) => product.id !== index)
  localStorage.setItem(localStorageKey, JSON.stringify(newCart))
  window.location.reload()
}

const renderCart = () => {
  const cart = JSON.parse(localStorage.getItem(localStorageKey)) || []

  if (cart.length === 0) {
    noItemsInCart()
    return
  }

  cart.forEach((product) => {
    renderCartItem(product)
  })

  const finishButton = document.getElementById('finish-button')
  finishButton.classList.remove('d-none')
}

const noItemsInCart = () => {
  const emptyCart = document.getElementById('empty-cart')
  emptyCart.classList.remove('empty-cart')
}

const renderCartItem = (product) => {
  var tr = document.createElement('tr');
  var tdImage = document.createElement('td');
  var img = document.createElement('img');
  img.src = product.thumbnail;
  img.className = "img-thumbnail small-img";
  img.alt = product.name;


  tdImage.appendChild(img);

  var tdName = document.createElement('td');
  tdName.textContent = product.name

  var tdQuantity = document.createElement('td');
  var btnDecrease = document.createElement('button');
  var spanQuantity = document.createElement('span');
  var btnIncrease = document.createElement('button');
  btnDecrease.textContent = '-';
  btnDecrease.onclick = () => changeItemQuantity(product.id, '-');
  btnDecrease.className = "btn btn-secondary btn-sm";
  spanQuantity.textContent = '1';
  spanQuantity.id = product.id;
  spanQuantity.className = "mx-2";
  btnIncrease.textContent = '+';
  btnIncrease.className = "btn btn-secondary btn-sm";
  btnIncrease.onclick = () => changeItemQuantity(product.id, '+');
  tdQuantity.appendChild(btnDecrease);
  tdQuantity.appendChild(spanQuantity);
  tdQuantity.appendChild(btnIncrease);

  var tdPrice = document.createElement('td');
  tdPrice.textContent = product.price;
  tdPrice.id = 'price-' + product.id;

  var tdRemove = document.createElement('td');
  var btnRemove = document.createElement('button');
  btnRemove.textContent = 'Remover';
  btnRemove.className = "btn btn-danger btn-sm";
  tdRemove.appendChild(btnRemove);
  btnRemove.onclick = () => removeFromCart(product.id);

  // Adiciona todas as células à linha
  tr.appendChild(tdImage);
  tr.appendChild(tdName);
  tr.appendChild(tdQuantity);
  tr.appendChild(tdPrice);
  tr.appendChild(tdRemove);

  // Adiciona a linha ao corpo da tabela
  document.getElementById('cart-table').appendChild(tr);
}

const changeItemQuantity = (index, operation) => {
  const cart = JSON.parse(localStorage.getItem(localStorageKey)) || []

  const product = cart.find((product) => product.id === index)
  if (!product) {
    return
  }

  const spanQuantity = document.getElementById(index)
  if (operation === '+') {
    product.quantity++
    spanQuantity.textContent = product.quantity
    const newPrice = product.price * product.quantity
    document.getElementById('price-' + index).textContent = newPrice.toFixed(2)

  }
  if (operation === '-' && product.quantity > 1) {
    product.quantity--
    spanQuantity.textContent = product.quantity
    const newPrice = product.price * product.quantity
    document.getElementById('price-' + index).textContent = newPrice.toFixed(2)
  }

  if (operation === '-' && product.quantity === 1) {
    removeFromCart(index)
    return
  }


  localStorage.setItem(localStorageKey, JSON.stringify(cart))
}