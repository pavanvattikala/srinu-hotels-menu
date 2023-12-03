const section = document.querySelector(".section-center");
const btnContainer = document.querySelector(".btn-container");

// Function to fetch menu data from menu.json
const fetchMenuData = async () => {
  try {
    const response = await fetch("menu.json");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching menu data:", error);
  }
};

// Update menuList function to accept menuItems as a parameter
const menuList = (menuItems) => {
  let displayMenu = menuItems.map((item) => {
    if (item.price) {
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
    } else if (item.price_full || item.price_single) {
      return `<div class="menu-items col-lg-6 col-sm-12">
  <div class="menu-info">
    <div class="menu-title">
      <h4>${item.title}</h4>

      ${(() => {
        if (item.price_single && item.price_full) {
          return `<h4 class="price"> ₹${item.price_single} (Single) <br> ${item.price_full} (Full)</h4>`;
        } else if (item.price_single) {
          return `<h4 class="price"> ₹${item.price_single} (Single)</h4>`;
        } else if (item.price_full) {
          return `<h4 class="price"> ₹${item.price_full} (Full)</h4>`;
        } else {
          return ""; // No prices, empty string
        }
      })()}

    </div>
    <div class="menu-text">
      ${item.desc}
    </div>
  </div>
</div>`;
    } else {
      return `<div class="menu-items col-lg-6 col-sm-12">
            <div class="menu-info">
              <div class="menu-title">
                <h4>${item.title}</h4>
                <h4 class="price"> ₹${item.price_AC} (AC) <br> ₹${item.price_Non_AC} (Non-AC)</h4>
              </div>
              <div class="menu-text">
                ${item.desc}
              </div>
            </div>
          </div>
    `;
    }
  });

  displayMenu = displayMenu.join("");
  section.innerHTML = displayMenu;
};

// Function to update category buttons
const categoryList = (categories, menu) => {
  const categoryBtns = categories
    .map((category) => {
      return `<button class="btn btn-outline-dark btn-item" data-id=${category}>${category}</button>`;
    })
    .join("");

  btnContainer.innerHTML = categoryBtns;
  const filterBtns = document.querySelectorAll(".btn-item");

  // filter menu
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

// Call the loadMenu function to initialize the menu
const loadMenu = async () => {
  const menuData = await fetchMenuData();
  if (menuData) {
    menuList(menuData);
    const categories = menuData.reduce(
      (values, item) => {
        if (!values.includes(item.category)) {
          values.push(item.category);
        }
        return values;
      },
      ["All"]
    );
    categoryList(categories, menuData);
  }
};

// Call the loadMenu function to initialize the menu
loadMenu();
