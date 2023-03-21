async function start() {
  handleGetCart();
  handleCreateToCart();
  renderListCart();
  handleCart();

  handleShowSumProduct();
}

async function getCourses(callback) {
  try {
    await fetch("../data.json")
      .then((response) => {
        return response.json();
      })
      .then((callback) => {
        const dataProduct = callback.find((item) => item.id == id);
        mainData = dataProduct;
        return dataProduct;
      })
      .then(callback);
  } catch {}
}

function generateID() {
  let idTagPrd = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const charactersLength = characters.length;
  for (let i = 0; i < 6; i++) {
    idTagPrd += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return idTagPrd;
}



const handleShowSumProduct = () => {
  const countWishlist = document.querySelector(".header-wishlist-count-cart");
  dataLocal = handleGetCart();
  if (dataLocal != null) {
    let sum = 0;
    for (let i = 0; i < dataLocal.length; i++) {
      sum += dataLocal[i].quantity;
    }
    countWishlist.innerHTML = `${sum}`;
  } else {
    countWishlist.innerHTML = `0`;
  }
};

function handleCreateToCart() {
  let dataLocal = [];
  const addToCart = document.querySelector(".btn-add-to-cart");
  const quantityItem = document.querySelector(".quantity__item input");
  var listColorSelect = document.querySelectorAll(".list-select__color input");
  dataLocal = handleGetCart();

  if (addToCart != null) {
    addToCart.onclick = function () {
      quantity = parseInt(quantityItem.value);
      dataLocal = handleGetCart();
      let Color = "";
      for (const radioButton of listColorSelect) {
        if (radioButton.checked) {
          Color = radioButton.value;
          break;
        }
      }
      let newData = {
        idTagPrd: generateID(),
        Name: mainData.namePrd,
        Price: mainData.Price.price,
        Image: mainData.imgAvatar1,
        idProduct: id,
        quantity,
        Color,
      };
      if (dataLocal === null) {
        dataLocal = [newData];
      } else {
        let checkPrd = false;
        for (let i = 0; i < dataLocal.length; i++) {
          if (dataLocal[i].idProduct === id && dataLocal[i].Color === Color) {
            dataLocal[i].quantity += parseInt(newData.quantity);
            checkPrd = true;
            break;
          }
        }

        if (!checkPrd) {
          dataLocal.push(newData);
        }
      }
      localStorage.setItem("listCart", JSON.stringify(dataLocal));
      handleShowSumProduct();
    };
  }
}

const handleGetCart = () => {
  var dataLocal = [];
  dataLocal = localStorage.getItem("listCart");
  dataLocal = JSON.parse(dataLocal);
  return dataLocal;
};

const handleCart = () => {
  const btnOfCvCart = document.querySelector(".btn-toggle-offcanvas-cart");
  btnOfCvCart.addEventListener("click", () => {
    renderListCart();
  });
};
const handleUpQuanity = (id) => {
  dataLocal = handleGetCart();
  id.value++;
  for (let i = 0; i < dataLocal.length; i++) {
    if (dataLocal[i].idTagPrd === id.id) {
      console.log(dataLocal[i].quantity);
      dataLocal[i].quantity++;
      break;
    }
  }
  localStorage.setItem("listCart", JSON.stringify(dataLocal));
  renderListCart();
};
const handleDownQuanity = (id) => {
  dataLocal = handleGetCart();
  id.value--;
  for (let i = 0; i < dataLocal.length; i++) {
    if (dataLocal[i].idTagPrd === id.id) {
      if (dataLocal[i].quantity > 1) {
        dataLocal[i].quantity--;
      }
    }
  }
  localStorage.setItem("listCart", JSON.stringify(dataLocal));
  renderListCart();
};

const handleRemoveItemCart = (id) => {
  // console.log(id);
  dataLocal = handleGetCart();
  newDataLocal = dataLocal.filter((item) => item.idTagPrd !== id.id);
  localStorage.setItem("listCart", JSON.stringify(newDataLocal));
  renderListCart();
};

const handleShowSubTotal = () => {
  const listTotal = document.querySelector(".offcanvas-items-2");
  dataLocal = handleGetCart();
  let ValueTotal = 0;
  for (let i = 0; i < dataLocal.length; i++) {
    // console.log(dataLocal[i]);
    ValueTotal +=
      parseInt(dataLocal[i].Price) * parseInt(dataLocal[i].quantity);
  }
  listTotal.innerHTML = `
                      <div class="offcanvas-item">
                        <span>
                            Subtotal:
                        </span>
                        <bdi><span class="woocommerce-Price-currencySymbol">$</span>${ValueTotal}.00</bdi>
                    </div>
                    <div class="offcanvas-item">
                        <span>Total:</span>
                        <bdi><span class="woocommerce-Price-currencySymbol">$</span>${ValueTotal}.00</bdi>
                    </div>`;
};
const renderListCart = () => {
  handleShowSubTotal();
  let dataLocal = [];
  dataLocal = handleGetCart();
  const ListPrdCart = document.querySelector(".list-product-in-cart");
  ListPrdCart.innerHTML = dataLocal
    .map((item) => {
      return `
      <div class="product-item">
      <div class="product__item">
      <div class="product__img col-3">
      <img src="${item.Image}"
      alt="" class="col-lg-12 col-12">
      </div>
      <div class="product__info col-5">
      <h4>${item.Name}</h4>
      <span class="color">Color: ${item.Color}</span>
      <span class="price">
      Price: <bdi><span class="woocommerce-Price-currencySymbol">$</span>${
        item.Price
      }.00</bdi>
      </span>
                              </div>
                              <div class="total__price col-3">
                                <bdi><span class="woocommerce-Price-currencySymbol">$</span>${
                                  parseInt(item.Price) * parseInt(item.quantity)
                                }.00</bdi>
                                </div>
                                </div>
                                
                                <div class="product__feature">
                                <div class="feature">
                                <span class="btn-prev-product-incart-${
                                  item.idTagPrd
                                }" onclick="handleDownQuanity(${
        item.idTagPrd
      })"><i
                                class="fa-sharp fa-regular fa-minus"></i></span>
                                <input type="number" value="${parseInt(
                                  item.quantity
                                )}" id="${item.idTagPrd}">
                                     <span class="btn-sum-product-incart " onclick="handleUpQuanity(${
                                       item.idTagPrd
                                     })"><i class="fa-light fa-plus"></i></span>
                                      </div>
                                      <div class="feature btn-remove-item-cart" onclick="handleRemoveItemCart(${
                                        item.idTagPrd
                                      })">
                                          <i class="fa-light fa-trash-can"></i>
                                         <span>Remove</span>
                                      </div>
                                </div>
                                </div>
                                `;
    })
    .join(" ");
};

start();
