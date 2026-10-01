// Mobile menu drawer. Opening and closing is handled by the popover attribute;
// this closes it after tapping a link (same-page links don't reload the page)
// and adds a fallback for browsers without popover support.
(function () {
  var menu = document.getElementById('menu');
  if (!menu) return;
  var supported = typeof menu.showPopover === 'function';
  function hide() {
    if (supported) menu.hidePopover();
    else menu.classList.remove('is-open');
  }
  menu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', hide);
  });
  if (!supported) {
    document.querySelectorAll('[popovertarget="menu"]').forEach(function (button) {
      button.addEventListener('click', function () {
        if (button.getAttribute('popovertargetaction') === 'hide') hide();
        else menu.classList.toggle('is-open');
      });
    });
  }
})();
