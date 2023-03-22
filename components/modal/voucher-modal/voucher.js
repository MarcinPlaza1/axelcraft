const openModalBtn = document.querySelector('.open-modal-btn');
const closeModalBtn = document.querySelector('.close-modal-btn');
const modalVoucher = document.querySelector('.voucher-modal');
const nickInputVoucher = document.getElementById('nick');
const voucherInput = document.getElementById('voucher-code');
const agreeCheckbox = document.getElementById('agree');

const voucherButton = document.querySelector('.voucher-modal__button');

voucherButton.addEventListener('click', () => {
    const modal = document.querySelector('.voucher-modal__success');
    modal.classList.add('active-modal');

    const closeBtn = modal.querySelector('.mini-close-button');

    closeBtn.addEventListener('click', () => {
      clearInputs();
      modal.classList.remove('active-modal');
      modalVoucher.style.display = 'none';
    });
});

function clearInputs() {
  nickInputVoucher.value = '';
  voucherInput.value = '';
  agreeCheckbox.checked = false;
}

openModalBtn.addEventListener('click', () => { modalVoucher.style.display = 'block'; });

closeModalBtn.addEventListener('click', () => {
  clearInputs();
  modalVoucher.style.display = 'none';
});

window.addEventListener('click', (event) => {
  if (event.target === modalVoucher) {
    clearInputs();
    modalVoucher.style.display = 'none';
    modal.classList.remove('active');
  }
});

nickInputVoucher.addEventListener("focus", function () {
  this.classList.add("focused");
});

nickInputVoucher.addEventListener("blur", function () {
  this.classList.remove("focused");
  this.placeholder = "Podaj nick";
});

voucherInput.addEventListener("focus", function () {
  this.classList.add("focused");
});

voucherInput.addEventListener("blur", function () {
  this.classList.remove("focused");
  this.placeholder = "Wprowadź kod vouchera";
});

