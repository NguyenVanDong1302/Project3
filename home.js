const courseAPI = "./data.json";
const listPrd = document.querySelector(".list-catalog-product");

async function start() {
  const data = await getCourses();
  renderCourses(data);
}

async function getCourses() {
  try {
    const response = await fetch(courseAPI);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

function renderCourses(data) {
  listPrd.innerHTML = data
    .map((result) => {
      console.log(result.id);
      return `
        <div class='catalog-product-item col-6 col-md-3'>
        <div class='catalog-product__image'>
        <a href='./Page/detail.html?id=${result.id}'>
              <img src='${result.imgAvatar1}' alt=''>
              <img src='${
                result.imgAvatar2
              }' alt='' class='catalog-product-image-hover'>
              <div class='product__list__feature'>
                <span class='col-md-4 col-4'>
                  <i class='fa-regular fa-link'></i>
                </span>
                <span class='col-md-4 col-4'>
                  ${
                    result.inCart === true
                      ? "<i class='fa-sharp fa-solid fa-heart'></i>"
                      : "<i class='fa-regular fa-heart'></i>"
                  }
                </span>
                <span class='col-md-4 col-4'>
                  <i class='fa-regular fa-arrows-maximize'></i>
                </span>
              </div>
              </a>
            </div>
          <div class='catalog-product__info'>
            <div class='product__info__name'>
              ${result.namePrd}
            </div>
            <div class='product__select__color'>
              <ul>
                ${result.Color.map(
                  (item, index) => `<li><span class='${item}'></span></li>`
                ).join(" ")}
              </ul>
            </div>
            <div class='product__price'>
              <span class='product-cost'>$${result.Price.cost}</span>
              <span>$${result.Price.price}</span>
            </div>
          </div>
        </div>
      `;
    })
    .join("");
}

start();
