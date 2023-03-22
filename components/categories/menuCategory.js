const categories = document.querySelectorAll(".category");
const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get("category");
if (category) {
  const categoryLink = document.getElementById(category);
  const subcategories = categoryLink.nextElementSibling;
  categories.forEach((c) => {
    const link = c.querySelector(".category-link");
    const subs = c.querySelector(".subcategories");
    if (link !== categoryLink) {
      subs.classList.remove("open");
      link.classList.remove("open");
    }
  });
  subcategories.classList.add("open");
  categoryLink.classList.add("open");
}

categories.forEach((category) => {
  const categoryLink = category.querySelector(".category-link");
  const subcategories = category.querySelector(".subcategories");
  categoryLink.addEventListener("click", (event) => {
    event.preventDefault();
    categories.forEach((c) => {
      const link = c.querySelector(".category-link");
      const subs = c.querySelector(".subcategories");
      if (link !== categoryLink) {
        subs.classList.remove("open");
        link.classList.remove("open");
      }
    });
    subcategories.classList.toggle("open");
    categoryLink.classList.toggle("open");
  });
});

