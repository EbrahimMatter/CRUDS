let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let money = document.querySelectorAll(".money input");
let totalSpan = document.getElementById("total");

let result;
function calcTotal() {
  if (price.value != "") {
    result =
      (+price.value || 0) +
      (+taxes.value || 0) +
      (+ads.value || 0) -
      (+discount.value || 0);
    totalSpan.innerText = `Total: ${result}`;
  }
}

money.forEach((inp) => {
  inp.addEventListener("blur", calcTotal);
});

let create = document.getElementById("create");
let title = document.getElementById("title");
let count = document.getElementById("count");
let category = document.getElementById("category");

let products;
if (localStorage.getItem("product")) {
  products = JSON.parse(localStorage.getItem("product"));
} else {
  products = [];
}

create.addEventListener("click", function (e) {
  e.preventDefault();
  let fields = [title, price, taxes, ads, count, category];
  let valid = true;

  fields.forEach((field) => {
    if (field.value.trim() === "") {
      field.style.border = "2px solid red";
      valid = false;
    } else {
      field.style.border = "2px solid green";
    }
  });

  if (!valid) {
    alert("Please fill in all fields!");
    return;
  }

  let info = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    total: result,
    count: count.value,
    category: category.value,
  };
  if (info.count > 1) {
    for (let i = 0; i < info.count; i++) {
      products.push(info);
    }
  } else {
    products.push(info);
  }
  localStorage.setItem("product", JSON.stringify(products));
  clearData();
  showData();
});

function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  count.value = "";
  category.value = "";
  totalSpan.innerText = "Total: 0";
}

function showData() {
  let tbody = document.getElementById("tbody");
  tbody.innerHTML = "";
  for (let i = 0; i < products.length; i++) {
    let row = `
      <tr>
        <td>${i + 1}</td>
        <td>${products[i].title}</td>
        <td>${products[i].price}</td>
        <td>${products[i].taxes}</td>
        <td>${products[i].ads}</td>
        <td>${products[i].discount}</td>
        <td>${products[i].total}</td>
        <td>${products[i].count}</td>
        <td>${products[i].category}</td>
        <td><button onclick="updateProduct(${i})">Update</button></td>
        <td><button onclick="deleteProduct(${i})">Delete</button></td>
      </tr>
    `;
    tbody.innerHTML += row;
  }
  if (products.length > 0) {
    deleteAll.style.display = "block";
  } else {
    deleteAll.style.display = "none";
  }
}
function deleteProduct(i) {
  products.splice(i, 1);
  localStorage.setItem("product", JSON.stringify(products));
  showData();
}
let deleteAll = document.getElementById("deleteAll");

deleteAll.addEventListener("click", function () {
  products = [];
  localStorage.removeItem("product");
  showData();
});
function updateProduct(index) {
  let product = products[index];

  title.value = product.title;
  price.value = product.price;
  taxes.value = product.taxes;
  ads.value = product.ads;
  discount.value = product.discount;
  count.value = product.count;
  category.value = product.category;

  calcTotal();

  products.splice(index, 1);
  localStorage.setItem("product", JSON.stringify(products));
  showData();
}
