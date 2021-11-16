let productName = document.getElementById("ProductName");
let ProductCategory = document.getElementById("ProductCategory");
let ProductPrice = document.getElementById("ProductPrice");
let ProductDescription = document.getElementById("ProductDescription");
let addProductBtn = document.getElementById("addProductBtn");
let updateproductBtn = document.getElementById("updateproductBtn");
let searchBar = document.getElementById("searchBar");
let productNameAlert = document.getElementById("productNameAlert");
let productsContainer;
let currentIndex = 0;

////////////////////////////////// loading screen/////////////////////
$(document).ready(() => {
  $("#spinner").fadeOut(500, () => {
    $("#loading").fadeOut(500, () => {
      $("#loading").remove();
      $("body").css("overflow", "auto");
    });
  });
});

if (localStorage.getItem("ourProducts") == null) {
  productsContainer = [];
} else {
  productsContainer = JSON.parse(localStorage.getItem("ourProducts"));
  displayProducts();
}

//Add Product :
addProductBtn.addEventListener("click", () => {
  let product = {
    name: productName.value,
    category: ProductCategory.value,
    price: ProductPrice.value,
    desc: ProductDescription.value,
  };
  productsContainer.push(product);
  localStorage.setItem("ourProducts", JSON.stringify(productsContainer));
  displayProducts();
  clearForm();
});

//Reset Form After Adding
function clearForm() {
  productName.classList.remove("is-invalid");
  productName.classList.remove("is-valid");
  productName.value = "";

  ProductCategory.classList.remove("is-invalid");
  ProductCategory.classList.remove("is-valid");
  ProductCategory.value = "";

  ProductPrice.classList.remove("is-invalid");
  ProductPrice.classList.remove("is-valid");
  ProductPrice.value = "";

  ProductDescription.classList.remove("is-invalid");
  ProductDescription.classList.remove("is-valid");
  ProductDescription.value = "";

  addProductBtn.disabled = true;
  updateproductBtn.disabled = true;
}

//Display Products Table:
function displayProducts() {
  let cartona = ``;
  for (let i = 0; i < productsContainer.length; i++) {
    cartona += `

    <tr>
    <td>${i + 1}</td>
    <td>${productsContainer[i].name}</td>
    <td>${productsContainer[i].category}</td>
    <td>${productsContainer[i].price}</td>
    <td>${productsContainer[i].desc}</td>
    <td>
      <i class="fas fa-edit text-warning fa-lg point" onClick="updateProduct(${i})"></i>
    </td>
    <td>
      <i class="fas fa-trash-alt text-danger fa-lg point" onClick="deleteProduct(${i})"></i>
    </td>
  </tr>
        `;
  }
  document.getElementById("tableBody").innerHTML = cartona;
}

/************** Validation ***********/

// 1 -- Validate Product Name Function:

let counter = 0;
function validationProductName() {
  let regex = /^[A-Z][a-z0-9]{3,10}$/;
  if (regex.test(productName.value)) {
    productName.classList.add("is-valid");
    productName.classList.remove("is-invalid");
    productNameAlert.style.display = "none";
    addProductBtn.disabled = false;
    updateproductBtn.disabled = false;
    counter++;
    return true;
  } else {
    productName.classList.add("is-invalid");
    productName.classList.remove("is-valid");
    productNameAlert.style.display = "block";
    addProductBtn.disabled = true;
    updateproductBtn.disabled = true;
    return false;
  }
}

productName.addEventListener("keyup", validationProductName);
// 2 -- Validate Product category Function:
function validationProductCategory() {
  let regex = /^[A-Z][a-z]{3,8}$/;
  if (regex.test(ProductCategory.value)) {
    ProductCategory.classList.add("is-valid");
    ProductCategory.classList.remove("is-invalid");
    ProductCategoryAlert.style.display = "none";
    addProductBtn.disabled = false;
    updateproductBtn.disabled = false;
    counter++;
    return true;
  } else {
    ProductCategory.classList.add("is-invalid");
    ProductCategory.classList.remove("is-valid");
    ProductCategoryAlert.style.display = "block";
    addProductBtn.disabled = true;
    updateproductBtn.disabled = true;
    return false;
  }
}
ProductCategory.addEventListener("keyup", validationProductCategory);

// 3 -- Validate Product price Function:
function validationProducttPrice() {
  let regex = /^([1-9][0-9][0-9]|[1-9][0-9][0-9][0-9]|10000)$/;
  if (regex.test(ProductPrice.value)) {
    ProductPrice.classList.add("is-valid");
    ProductPrice.classList.remove("is-invalid");
    ProductPriceAlert.style.display = "none";
    addProductBtn.disabled = false;
    updateproductBtn.disabled = false;
    counter++;
    return true;
  } else {
    ProductPrice.classList.add("is-invalid");
    ProductPrice.classList.remove("is-valid");
    ProductPriceAlert.style.display = "block";
    addProductBtn.disabled = true;
    updateproductBtn.disabled = true;
    return false;
  }
}

ProductPrice.addEventListener("keyup", validationProducttPrice);

// 4 -- Validate Product description Function:
function validationProducttDescription() {
  let regex = /^[a-z0-9 .]{3,}$/;
  if (regex.test(ProductDescription.value)) {
    ProductDescription.classList.add("is-valid");
    ProductDescription.classList.remove("is-invalid");
    ProductDescriptionAlert.style.display = "none";
    addProductBtn.disabled = false;
    updateproductBtn.disabled = false;
    counter++;
    return true;
  } else {
    ProductDescription.classList.add("is-invalid");
    ProductDescription.classList.remove("is-valid");
    ProductDescriptionAlert.style.display = "block";
    addProductBtn.disabled = true;
    updateproductBtn.disabled = true;
    return false;
  }
}

ProductDescription.addEventListener("keyup", validationProducttDescription);

function submitMission() {
  if (counter == 4) {
    addProductBtn.disabled = false;
    updateproductBtn.disabled = false;
  }
}

$(".system").change(() => {
  submitMission();
});

//Delete Poduct From Table & Storage Function:
function deleteProduct(index) {
  productsContainer.splice(index, 1);
  localStorage.setItem("ourProducts", JSON.stringify(productsContainer));
  displayProducts();
}

//search Product Function:
function searchProduct(term) {
  let cartona = ``;

  for (let i = 0; i < productsContainer.length; i++) {
    if (productsContainer[i].name.toLowerCase().includes(term.toLowerCase())) {
      cartona += `

    <tr>
    <td>${i + 1}</td>
    <td>${productsContainer[i].name}</td>
    <td>${productsContainer[i].category}</td>
    <td>${productsContainer[i].price}</td>
    <td>${productsContainer[i].desc}</td>
    <td>
      <i class="fas fa-edit text-warning fa-lg point" onClick="updateProduct(${i})"></i>
    </td>
    <td>
      <i class="fas fa-trash-alt text-danger fa-lg point" onClick="deleteProduct(${i})"></i>
    </td>
  </tr>
        `;
    }
  }
  document.getElementById("tableBody").innerHTML = cartona;
}

searchBar.addEventListener("keyup", (e) => {
  searchProduct(e.target.value);
});

//Edit Product Info Function:
function updateProduct(index) {
  currentIndex = index;
  productName.value = productsContainer[index].name;
  ProductCategory.value = productsContainer[index].category;
  ProductPrice.value = productsContainer[index].price;
  ProductDescription.value = productsContainer[index].desc;
  addProductBtn.style.display = "none";
  updateproductBtn.style.display = "block";
}

//Submit Eidt Product Function:
updateproductBtn.addEventListener("click", () => {
  productsContainer[currentIndex].name = productName.value;
  productsContainer[currentIndex].category = ProductCategory.value;
  productsContainer[currentIndex].price = ProductPrice.value;
  productsContainer[currentIndex].desc = ProductDescription.value;
  updateproductBtn.style.display = "none";
  addProductBtn.style.display = "block";
  localStorage.setItem("ourProducts", JSON.stringify(productsContainer));
  displayProducts();
  clearForm();
});

//////////////////////////////// to top

let submitSectionTop = $("#submitSection").offset().top;
$(window).scroll(() => {
  let wScroll = $(window).scrollTop();
  if (wScroll > submitSectionTop - 200) {
    $("#btnUp").fadeIn(500);
  } else {
    $("#btnUp").fadeOut(500);
  }
});

$("#btnUp").click(() => {
  $("html,body").animate({ scrollTop: 0 }, 3000);
});
