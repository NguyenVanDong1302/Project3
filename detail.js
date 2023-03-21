const url = window.location.href;
let id = url.match(/id=(\d+)/)[1];
id = parseInt(id);
let mainData;

async function start() {
  await getCourses(renderCourses);
  //   handleCreateToCart();
  createCourse();
  handleCreateToCart();
  renderListCart();
  handleCart();
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

function renderCourses(dataProduct) {
  const detailText = document.querySelector(".detail-product__title");

  //   console.log(dataProduct.namePrd);
  detailText.innerHTML = `
        <h3>
        ${dataProduct.namePrd}
        </h3>
                        <h5>
                            ${dataProduct.title}
                        </h5>
                        <ul>
                        ${dataProduct.ListDesc.map(
                          (item) => `
                        <li>${item}</li>
                        `
                        ).join(" ")}
                        </ul>
                        <span>
                            ${dataProduct.Composition}
                        </span>
                        <div class="size-chart">
                            <!-- Button trigger modal -->
                            <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                <i class="fa-solid fa-ruler-combined"></i>
                                <span>Sizes chart</span>
                            </button>

                            <!-- Modal -->
                            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                                aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="exampleModalLabel">X</h5>
                                        </div>
                                        <div class="modal-body">
                                            ...
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="product__price">
                            <span class="product-cost">$${
                              dataProduct.Price.cost
                            }.00</span>
                            <span>$${dataProduct.Price.price}.00</span>
                        </div>
                        <div class="product__select__color">
                            <ul>
                                <h4>
                                    Color
                                </h4>
                          <div class="list-select__color">
                                  ${dataProduct.Color.map(
                                    (item) => `
                                    <input type="radio" id="${item}" name="fav_language" value="${item}" d-none>
                                    <label  for="${item}">
                                    <li><span class="${item}"></span></li>
                                    </label>
                                  `
                                  ).join(" ")}
                          </div >
                            </ul>
                        </div>
                        <div class="select-quantity">
                            <div class="select-quantity-item">
                                <span class="">-</span>
                                <span class="quantity__item">
                                <input type=number value='1' /></span>
                                <span class="">+</span>
                            </div>
                            <div class="select-quantity-item btn-add-to-cart btn">
                                Add to cart
                            </div>
                        </div>

                        <div class="table">
                            <ul>
                                <li>
                                    <span> Tag: </span>
                                    <span>
                                    ${dataProduct.Tags.map(
                                      (item) => `
                                    <a href="#">${item}</a> `
                                    ).join(" ")}
                                    </span>
                                </li>
                                <li>
                                    <span>Category:</span>
                                    <a href="#">${dataProduct.Category}</a>
                                </li>
                                <li>
                                    <span>SKU:</span>
                                    <span class="code-product">${
                                      dataProduct.SKU
                                    }</span>
                                </li>
                            </ul>
                        </div>
    `;
}

start();
let dataCart;
async function createCourse(data, callback) {
  fetch("../Json/cart.json")
    .then((response) => response.json())
    .then((data) => {
      dataCart = data;
      // console.log(data);
    })
    .catch((error) => console.error(error));
  //   try {
  //     const response = await fetch("../Json/cart.json");
  //     const data = await response.json();
  //     data = dataCart;
  //     return data;
  //   } catch (error) {
  //     console.error(error);
  //   }
}

function generateID() {
  let idTagPrd = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < 6; i++) {
    idTagPrd += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return idTagPrd;
}
const handleGetCart = () => {
  var dataLocal = [];
  dataLocal = localStorage.getItem("listCart");
  dataLocal = JSON.parse(dataLocal);
  return dataLocal;
};

function handleCreateToCart() {
  let dataLocal = [];
  const addToCart = document.querySelector(".btn-add-to-cart");
  const quantityItem = document.querySelector(".quantity__item input");
  var listColorSelect = document.querySelectorAll(".list-select__color input");
  const countWishlist = document.querySelector(".header-wishlist-count-cart");
  dataLocal = handleGetCart();
  countWishlist.innerHTML = `${dataLocal.length}`;
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
    countWishlist.innerHTML = `${dataLocal.length}`;
  };
}

const handleCart = () => {
  const inputValue = document.querySelector(".product__feature input");
  inputValue.addEventListener("focusout", () => {
    console.log("check focusout");
  });
  inputValue.addEventListener("onchange", () => {
    console.log("check onchange");
  });
  const btnPrev = document.querySelector(".btn-prev-product-incart ");
  const btnNext = document.querySelector(".btn-sum-product-incart ");
  btnPrev.addEventListener("click", () => {
    if (parseInt(inputValue.value) > 1)
      inputValue.value = parseInt(inputValue.value) - 1;
    handleUpdateNumPrd();
  });
  btnNext.addEventListener("click", () => {
    inputValue.value = parseInt(inputValue.value) + 1;
    handleUpdateNumPrd(inputValue.id);
  });

  const handleUpdateNumPrd = (data) => {};
};

const renderListCart = () => {
  let dataLocal = [];
  dataLocal = localStorage.getItem("listCart");
  dataLocal = JSON.parse(dataLocal);
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
                                    <span class="btn-prev-product-incart"><i
                                      class="fa-sharp fa-regular fa-minus"></i></span>
                                   <input type="number" value="${parseInt(
                                     item.quantity
                                   )}" id="kcJsk8">
                                    <span class="btn-sum-product-incart"><i class="fa-light fa-plus"></i></span>
                                  </div>
                                  <div class="feature">
                                    <i class="fa-light fa-trash-can"></i>
                                    <span>Remove</span>
                                  </div>
                                </div>
                            </div>
                                `;
    })
    .join(" ");
};
