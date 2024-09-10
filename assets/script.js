const localStorageKey = "@petpucrs"
const localStorageUserKey = "@petpucrs-user"
const localStorageLoggedUserKey = "@petpucrs-logged-user"

const products = [{
  id: 1,
  name: "Coleira para cachorro",
  price: 49.99,
  thumbnail: "/images/coleira-vermelha.png",
  type: "produto",
  hasVariants: true
},
{
  id: 2,
  name: "Tapete Higiênico",
  price: 79.99,
  thumbnail: "/images/tapete-higienico.png",
  type: "produto",
  hasVariants: false
},
{
  id: 3,
  name: "Tag rastreamento pet",
  price: 199.99,
  thumbnail: "/images/tag-rastreamento.png",
  type: "produto",
  hasVariants: true
},
{
  id: 4,
  name: "Banho",
  price: 99.99,
  thumbnail: "/images/banho.png",
  type: "servico",
  hasVariants: false
},
{
  id: 5,
  name: "Banho e Tosa",
  price: 129.99,
  thumbnail: "/images/tosa.png",
  type: "servico",
  hasVariants: false
},
{
  id: 6,
  name: "Passeio com Guia",
  price: 39.99,
  thumbnail: "/images/passeio.png",
  type: "servico",
  hasVariants: false
}
]

const addToCart = (productId) => {
  const cart = JSON.parse(localStorage.getItem(localStorageKey)) || []

  const product = products.find((product) => product.id === productId)
  if (!product) {
    return
  }

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

const updatePetPreviewImg = () => {
  var imageUrl = document.getElementById('petImageUrl').value;
  document.getElementById('imagePreview').src = imageUrl || 'https://via.placeholder.com/300';
}

const bindCreateUserEventListener = () => {
  document.getElementById('userForm').addEventListener('submit', function (event) {
    event.preventDefault();

    // Collect user data
    const user = {
      name: document.getElementById('inputName').value,
      email: document.getElementById('inputEmail').value,
      phone: document.getElementById('inputPhone').value,
      password: document.getElementById('inputPassword').value,
      birthdate: document.getElementById('inputBirthdate').value,
      cpf: document.getElementById('inputCPF').value
    };

    if (user.name && user.email && user.password && user.birthdate && user.cpf) {
      const usersInLocalStorage = JSON.parse(localStorage.getItem(localStorageUserKey)) || [];
      if (usersInLocalStorage.some((u) => u.email === user.email)) {
        alert('Usuário já cadastrado com esse e-mail.');
        return;
      }

      usersInLocalStorage.push(user);
      localStorage.setItem(localStorageUserKey, JSON.stringify(usersInLocalStorage));
      alert('Usuário cadastrado com sucesso!');
      window.location.href = '/login.html';
    } else {
      alert('Por favor, preencha todos os campos obrigatórios.');
    }
  })
}

const bindLoginEventListener = () => {
  document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();

    var email = document.getElementById('inputEmail').value;
    var password = document.getElementById('inputPassword').value;

    const usersInLocalStorage = JSON.parse(localStorage.getItem(localStorageUserKey)) || [];
    const user = usersInLocalStorage.find((u) => u.email === email && u.password === password);

    if (user) {
      alert('Login efetuado com sucesso!');
      localStorage.setItem(localStorageLoggedUserKey, JSON.stringify(user));
      window.location.href = '/minha-conta.html';
    } else {
      alert('Usuário ou senha inválidos.');
    }
  })
}

const bindCreatePetEventListener = () => {
  document.getElementById('petForm').addEventListener('submit', function (event) {
    event.preventDefault();
    console.log('chegei aqui')
    const loggedUser = JSON.parse(localStorage.getItem(localStorageLoggedUserKey));
    if (!loggedUser) {
      alert('Nenhum usuário logado');
      return;
    }

    console.log(loggedUser)
    const pet = {
      name: document.getElementById('petName').value,
      type: document.getElementById('petType').value,
      breed: document.getElementById('petBreed').value,
      imageUrl: document.getElementById('petImageUrl').value,
    };

    if (pet.name && pet.type && pet.breed && pet.imageUrl) {
      if (loggedUser.pets) {
        loggedUser.pets.push(pet);
      }
      else {
        loggedUser.pets = [pet];
      }

      localStorage.setItem(localStorageLoggedUserKey, JSON.stringify(loggedUser));
      const users = JSON.parse(localStorage.getItem(localStorageUserKey));
      const updatedUsers = users.map((u) => u.email === loggedUser.email ? loggedUser : u);
      localStorage.setItem(localStorageUserKey, JSON.stringify(updatedUsers));

      alert('Pet cadastrado com sucesso!');
      window.location.href = '/minha-conta.html';

    } else {
      alert('Por favor, preencha todos os campos obrigatórios.');
    }
  })
}

const renderPets = () => {
  const loggedUser = JSON.parse(localStorage.getItem(localStorageLoggedUserKey));
  if (!loggedUser || !loggedUser.pets) {
    return;
  }


  loggedUser.pets.forEach((pet) => {
    renderPetItem(pet);
  })
}

const renderPetItem = (pet) => {
  const table = document.getElementById('petsTable');
  const tr = document.createElement('tr');

  const tdImage = document.createElement('td');
  const img = document.createElement('img');
  img.src = pet.imageUrl;
  img.className = "img-thumbnail small-img";
  img.alt = "Pet " + pet.name;
  tdImage.appendChild(img);

  const tdName = document.createElement('td');
  tdName.textContent = pet.name;

  const tdBtn = document.createElement('td');
  const btn = document.createElement('button');
  btn.textContent = 'Remover Pet';
  btn.className = "btn btn-danger btn-sm";
  btn.onclick = () => removePet(pet.name);
  tdBtn.appendChild(btn);

  tr.appendChild(tdImage);
  tr.appendChild(tdName);
  tr.appendChild(tdBtn);

  table.appendChild(tr);
}

const removePet = (petName) => {
  const loggedUser = JSON.parse(localStorage.getItem(localStorageLoggedUserKey));
  if (!loggedUser || !loggedUser.pets) {
    return;
  }

  const checkAlert = confirm('Deseja realmente remover o pet ' + petName + '?');
  if (!checkAlert) {
    return;
  }

  const updatedPets = loggedUser.pets.filter((pet) => pet.name !== petName);
  loggedUser.pets = updatedPets;

  localStorage.setItem(localStorageLoggedUserKey, JSON.stringify(loggedUser));
  const users = JSON.parse(localStorage.getItem(localStorageUserKey));
  const updatedUsers = users.map((u) => u.email === loggedUser.email ? loggedUser : u);
  localStorage.setItem(localStorageUserKey, JSON.stringify(updatedUsers));

  alert('Pet removido com sucesso!');

  window.location.reload();
}

const isLoggedIn = () => {
  const loggedUser = JSON.parse(localStorage.getItem(localStorageLoggedUserKey));
  if (!loggedUser) {
    return window.location.href = '/login.html';
  }

  return window.location.href = '/minha-conta.html';
}

const notImplemented = () => {
  alert('Funcionalidade não implementada');
}

const logout = () => {
  localStorage.removeItem(localStorageLoggedUserKey);
  window.location.href = '/index.html';
}