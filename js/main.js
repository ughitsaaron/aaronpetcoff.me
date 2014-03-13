var nav = responsiveNav(".nav", {
    navClass: "nav",
    label: "",
    navActiveClass: ""
});

function navLinks() {

  $(window).scroll(function() {
    var windscroll = $(window).scrollTop();
    if (windscroll >= 100) {
      $('.content section').each(function(i) {
        if ($(this).position().top <= windscroll - 20) {
          $('.nav li.active').removeClass('active');
          $('.nav li').eq(i).addClass('active');
        }
      });

    } else {
      $('nav li.active').removeClass('active');
      $('nav li:first').addClass('active');
    }

  }).scroll();
}

$(document).ready(function(){
  $("html").removeClass("no-trs");

  navLinks();
});