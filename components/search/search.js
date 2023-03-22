const searchInput = document.getElementById("searchInput");
const clearText = document.querySelector(".clear-text");
const searchButton = document.getElementById("searchButton");
const searchInputField = document.querySelector("#searchInput");
const searchButtonField = document.querySelector("#searchButton");

[searchInput, clearText].forEach(input => input.addEventListener("input", handleInput));

function handleInput() {
    const displayValue = window.innerWidth < 767 ? "none" : (this.value ? "inline-block" : "none");
    [...document.querySelectorAll(".clear-text")].forEach(text => text.style.display = displayValue);
}

clearText.addEventListener("click", function () {
    searchInput.value = "";
    this.style.display = "none";
});

searchButton.addEventListener("click", function () {
    searchInput.focus();
});

const handleSearch = () => {
    const searchInputValue = searchInputField.value;
    console.log(searchInputValue);
};

searchButtonField.addEventListener("click", handleSearch);

searchInputField.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        searchInput.value = "";
        clearText.style.display = "none";
        handleSearch();
    }
});

searchInput.addEventListener("focus", function () {
    this.placeholder = "";
});

searchInput.addEventListener("blur", function () {
    this.placeholder = "Wyszukiwanie";
});