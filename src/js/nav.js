(function($) { // Begin jQuery
  $(function() { // DOM ready

    // Clicking away from dropdown will remove the dropdown class
    $('html').click(function() {
        $('.fdn-header__nav-menu__list').hide();
    });
      
    // Toggle open and close nav styles on click
    $('#fdn-header__nav-mobile__toggle').click(function() {
        $('.fdn-header__nav-menu__list').slideToggle();
    });
      
    // Hamburger to X toggle
    $('#fdn-header__nav-mobile__toggle').on('click', function() {
        this.classList.toggle('fdn-header__nav-mobile__toggle--active');
    });
      
  }); // end DOM ready
})(jQuery); // end jQuery



