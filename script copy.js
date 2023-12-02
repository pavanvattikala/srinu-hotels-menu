const menu = [
  {
    id: 1,
    title: "Chiken Biriyani",
    category: "Biriyani",
    price: 230,
    desc: `Very good chiken biriyani`,
  },
  {
    id: 2,
    title: "Chiken Biriyani",
    category: "Biriyani",
    price: 230,
    desc: `Very good chiken biriyani`,
  },
  {
    id: 3,
    title: "Chiken Biriyani",
    category: "Biriyani",
    price: 230,
    desc: `Very good chiken biriyani`,
  },
  {
    id: 4,
    title: "Chiken Biriyani",
    category: "Biriyani",
    price: 230,
    desc: `Very good chiken biriyani`,
  },
];

const section = document.querySelector(".section-center");
const btnContainer = document.querySelector(".btn-container");

const categories = menu.reduce(
  (values, item) => {
    if (!values.includes(item.category)) {
      values.push(item.category);
    }
    return values;
  },
  ["All"]
);

const categoryList = () => {
  const categoryBtns = categories
    .map((category) => {
      return `<button class="btn btn-outline-dark btn-item" data-id=${category}>${category}</button>`;
    })
    .join("");

  btnContainer.innerHTML = categoryBtns;
  const filterBtns = document.querySelectorAll(".btn-item");

  //filter menu
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const category = e.currentTarget.dataset.id;
      console.log(category);
      const menuCategory = menu.filter((menuItem) => {
        if (menuItem.category === category) {
          return menuItem;
        }
      });
      if (category === "All") {
        menuList(menu);
      } else {
        menuList(menuCategory);
      }
    });
  });
};

const menuList = (menuItems) => {
  let displayMenu = menuItems.map((item) => {
    return `<div class="menu-items col-lg-6 col-sm-12">
          <div class="menu-info">
            <div class="menu-title">
              <h4>${item.title}</h4>
              <h4 class="price"> ₹${item.price}</h4>
            </div>
            <div class="menu-text">
              ${item.desc}
            </div>
          </div>
        </div>
  `;
  });
  displayMenu = displayMenu.join("");
  section.innerHTML = displayMenu;
};

menuList(menu);
categoryList();
