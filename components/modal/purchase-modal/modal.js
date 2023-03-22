const btns = document.querySelectorAll("#myBtn");
const span = document.querySelector(".close");
const overlay = document.querySelector("#modal-overlay");
const input = document.querySelector('input[type="range"]');
const output = document.querySelector('.quantity-value');
const paymentButtons = document.querySelectorAll('.payment-btn');
const quantityInput = document.querySelector('.quantity-input input');
const quantityValue = document.querySelector('.quantity-value');
const totalPriceButton = document.querySelector('.total-price');
const nickInput = document.querySelector('.nick-input');
const emailInput = document.querySelector('.email-input');
const termsCheckbox = document.querySelector('#terms-of-service-checkbox');
const buyNowBtn = document.querySelector('.buy-now-btn')

const showModal = () => {
  overlay.style.display = "block";
};

const hideModal = () => {
  quantityInput.value = 1;
  quantityValue.textContent = 1;
  paymentButtons.forEach(b => b.classList.remove('active'));
  overlay.style.display = "none";

  hideSmsElements();
};

let selectedPaymentPrice = 0;

const updateTotalPrice = () => {
  const quantity = parseInt(quantityValue.textContent);
  const totalPrice = quantity * selectedPaymentPrice;
  totalPriceButton.textContent = `${totalPrice} PLN`;
};

buyNowBtn.addEventListener('click', () => {
  const modal = document.querySelector('.payment-modal');
  modal.classList.add('active-modal');

  const closeBtn = modal.querySelector('.mini-close-button');

  closeBtn.addEventListener('click', () => {
    modal.classList.remove('active-modal')
    hideModal();
  });
});

btns.forEach(btn => {
  btn.addEventListener("click", showModal);
});

span.addEventListener("click", hideModal);

window.addEventListener('click', event => {
  if (event.target === overlay) {
    overlay.style.display = 'none';
    hideModal();
  }
});

input.addEventListener('input', () => {
  output.textContent = input.value;
  updateTotalPrice();
});

quantityInput.addEventListener('input', () => {
  quantityValue.textContent = quantityInput.value;
  updateTotalPrice();
})

const przelewButton = document.querySelector('#przelew');
const smsButton = document.querySelector('#sms');
const pscButton = document.querySelector('#psc');
const smsText = document.querySelector('.sms-text');
const smsCode = document.querySelector('.sms-code');
const smsCodeText = document.querySelector('.sms-code-text');

function hideSmsElements() {
  smsText.style.display = 'none';
  smsCode.style.display = 'none';
  smsCodeText.style.display = 'none';
}

przelewButton.addEventListener('click', () => {
  const przelewPrice = parseInt(document.querySelector('#przelew-price').textContent);
  if (przelewPrice >= 20) {
    quantityInput.disabled = false;
    quantityInput.max = 50;
    if (quantityInput.value > 50) {
      quantityInput.value = 50;
      quantityValue.textContent = '50';
    }
  } else {
    quantityInput.disabled = false;
    quantityInput.max = '';
  }
  updateTotalPrice();

  hideSmsElements();
});

smsButton.addEventListener('click', () => {
  quantityInput.disabled = true;
  quantityInput.value = 1;
  quantityValue.textContent = '1';
  updateTotalPrice();

  hideSmsElements();

  smsText.style.display = 'block';
  smsCode.style.display = 'inline-block';
  smsCodeText.style.display = 'block';
});

pscButton.addEventListener('click', () => {
  const pscPrice = parseInt(document.querySelector('#psc-price').textContent);
  if (pscPrice >= 20) {
    quantityInput.disabled = false;
    quantityInput.max = 30;
    if (quantityInput.value > 30) {
      quantityInput.value = 30;
      quantityValue.textContent = '30';
    }
  } else {
    quantityInput.disabled = false;
    quantityInput.max = '';
  }
  updateTotalPrice();

  hideSmsElements();
});


paymentButtons.forEach(button => {
  button.addEventListener('click', () => {
    const buttonPrice = parseInt(button.querySelector('.price').textContent.slice(0, -3));
    if (buttonPrice === 0) {
      button.disabled = true;
      button.classList.remove('active');
      paymentButtons.forEach(b => {
        if (parseInt(b.querySelector('.price').textContent.slice(0, -3)) !== 0) {
          b.disabled = false;
        }
      });
      quantityInput.disabled = false;
      quantityInput.max = '';
      quantityInput.value = 0;
      quantityValue.textContent = '0';
    } else {
      button.disabled = false;
      button.classList.remove('disabled')
      if (button.classList.contains('active')) {
        const activeButton = document.querySelector('.payment-btn:not([disabled]).active');
        if (activeButton) {
          activeButton.click();
        }
        quantityInput.disabled = true;
        if (button === przelewButton) {
          quantityInput.max = 50;
        } else if (button === pscButton) {
          quantityInput.max = 30;
        }
        quantityInput.value = 1;
        quantityValue.textContent = '1';
      } else {
        quantityInput.disabled = false;
        quantityInput.max = '';
      }
      paymentButtons.forEach(b => {
        if (parseInt(b.querySelector('.price').textContent.slice(0, -3)) === 0 && b !== button) {
          b.disabled = true;
        } else {
          b.disabled = false;
        }
      });
      paymentButtons.forEach(b => b.classList.remove('active'));
      button.classList.add('active');
      selectedPaymentPrice = buttonPrice;
      quantityInput.dispatchEvent(new Event('input'));
      if (button === przelewButton || button === pscButton) {
        quantityInput.value = 1;
        quantityValue.textContent = '1';
      }
      if (button === przelewButton || button === pscButton) {
        const buttonPrice = parseInt(button.querySelector('.price').textContent.slice(0, -3));
        if (buttonPrice >= 20) {
          quantityInput.disabled = false;
          if (button === przelewButton) {
            quantityInput.max = 50;
          } else if (button === pscButton) {
            quantityInput.max = 30;
          }
        } else {
          quantityInput.disabled = true;
          quantityInput.max = '';
          quantityInput.value = 1;
          quantityValue.textContent = '1';
        }
      } else if (button === smsButton) {
        quantityInput.disabled = true;
        quantityInput.max = '';
        quantityInput.value = 1;
        quantityValue.textContent = '1';
      }
    }
  });
});