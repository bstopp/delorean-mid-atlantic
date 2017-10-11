(function($) { // Begin jQuery
  $(function() { // DOM ready

     $('html').click(function() {
        $('.header__nav-menu__list').slideUp();
        $('#header__nav-mobile__toggle').removeClass('header__nav-mobile__toggle--active');
     });

     $('.header__nav').click(function(e){
         e.stopPropagation();
     });

     $('#header__nav-mobile__toggle').click(function(e) {
         $('.header__nav-menu__list').slideToggle();
         this.classList.toggle('header__nav-mobile__toggle--active');
     });
      
  }); // end DOM ready
})(jQuery); // end jQuery





