const navToggle = document.querySelector('.header-nav-toggle');
const icon = navToggle.querySelector('i');
let navExpanded = false;

function toggleNavExpanded() {
  navExpanded = !navExpanded;

  navToggle.setAttribute('aria-expanded', navExpanded);
  document.body.classList.toggle('nav-expanded', navExpanded);
}

function toggleIconClasses() {
  if (navExpanded) {
    icon.classList.remove('fa-bars');
    icon.classList.add('fa-times');
  } else {
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
  }
}

navToggle.addEventListener('click', () => {
  toggleNavExpanded();
  toggleIconClasses();
});
