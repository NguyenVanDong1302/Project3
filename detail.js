const url = window.location.href;
let id = url.match(/id=(\d+)/)[1];
id = parseInt(id);
let mainData;

async function start() {
  await getCourses(renderCourses);
  await getCourses(renderSlider);
  handleShowBtnAdd();
  createCourse();
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
const handleShowBtnAdd = () => {
  var listColorSelect = document.querySelectorAll(".list-select__color input");
  console.log(listColorSelect);
  for (let i = 0; i < listColorSelect.length; i++) {
    listColorSelect[i].addEventListener("change", () => {
      console.log("heelo");
      const dimiss = document.querySelector(".dimiss");
      dimiss.classList.remove("dimiss");
      dimiss.classList.add("btn-add-to-cart");
      handleCreateToCart();
    });
  }
};

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
                                    <input type="radio" id="${item}" name="fav_language" value="${item}" class="radio-color-product d-none" >
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
                            <div class="select-quantity-item select-quantity-item-2 btn dimiss">
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

const renderSlider = (dataProduct) => {
  const sliderProduct = document.querySelector(".slider-detail-product");
  sliderProduct.innerHTML = `
   <div class="carousel-indicators">
                                <img type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0"
                                    class="active" aria-current="true" aria-label="Slide 1"
                                    src="${dataProduct.imageSlider1}"
                                    alt="">
                                <img type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"
                                    aria-label="Slide 2"
                                    src="${dataProduct.imageSlider2}"
                                    alt="">
                                <img type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"
                                    aria-label="Slide 3"
                                    src="${dataProduct.imageSlider3}"
                                    alt="">
                            </div>
                            <div class="carousel-inner">
                                <div class="carousel-item active">
                                    <img src="${dataProduct.imageSlider1}"
                                        class="d-block w-100" alt="...">
                                </div>
                                <div class="carousel-item">
                                    <img src="${dataProduct.imageSlider2}"
                                        class="d-block w-100" alt="...">
                                </div>
                                <div class="carousel-item">
                                    <img src="${dataProduct.imageSlider3}"
                                        class="d-block w-100" alt="...">
                                </div>
                            </div>
  
  `;
};

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
}
