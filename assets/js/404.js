// ───────────────────────────────────────────────
// ✅ jQuery: Toggle mobile navbar
// ───────────────────────────────────────────────
$(document).ready(function () {
  $('#menu').click(function () {
    $(this).toggleClass('fa-times'); // change hamburger icon
    $('.navbar').toggleClass('nav-toggle'); // show/hide navbar
  });
});


// ───────────────────────────────────────────────
// 🚫 Optional: Block some DevTools shortcuts
// Note: Not secure, can be bypassed easily.
// ───────────────────────────────────────────────
document.onkeydown = function (e) {
  // F12
  if (e.keyCode === 123) {
    return false;
  }

  // Ctrl + Shift + I
  if (e.ctrlKey && e.shiftKey && e.keyCode === 'I'.charCodeAt(0)) {
    return false;
  }

  // Ctrl + Shift + C
  if (e.ctrlKey && e.shiftKey && e.keyCode === 'C'.charCodeAt(0)) {
    return false;
  }

  // Ctrl + Shift + J
  if (e.ctrlKey && e.shiftKey && e.keyCode === 'J'.charCodeAt(0)) {
    return false;
  }

  // Ctrl + U (view source)
  if (e.ctrlKey && e.keyCode === 'U'.charCodeAt(0)) {
    return false;
  }
};
