// Lấy thanh header
var header = document.querySelector(".header-wrapper");

// Lấy phần tử ở phía trên thanh header
var headerTop = document.querySelector(".header-top");

// Thêm lắng nghe sự kiện scroll
window.addEventListener("scroll", function () {
  if (window.scrollY >= 220) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
});

// var element = document.querySelector(".header-wrapper");
// var offsetTop = element.offsetTop;
// console.log(offsetTop);
