if($(".nav").length > 0) {
  var nav = responsiveNav(".nav", {
      navClass: "nav",
      label: "",
      navActiveClass: ""
  });
}

function navLinks() {

  $(window).scroll(function() {
    var windscroll = $(window).scrollTop();
    if (windscroll) {
      $('.content section').each(function(i) {
        if ($(this).position().top <= windscroll) {
          $('.nav li.active').removeClass('active');
          $('.nav li').eq(i).addClass('active');
        }
      });
    } else {
      $('nav li.active').removeClass('active');
      $('nav li:first').addClass('active');
    }

    if(($(window).scrollTop() + $(window).height()) + 30 >= $(document).height()) {
      $('nav li.active').removeClass('active');
      $('nav li:last').addClass('active');
    } 

  });
}

function contactForm() {
  $(".contact form").submit(function(e) {
    e.preventDefault();
    var name,email,subject,msg,dataString;
    name = $(".contact input[name^=\"name\"]").val();
    email = $(".contact input[name^=\"email\"]").val();
    subject = $(".contact input[name^=\"subject\"]").val();
    message = $(".contact textarea[name^=\"message\"]").val();
    dataString = 'name=' + name + '&email=' + email + '&message=' + message;

    if(subject==false) {
      $.ajax({
        type: "POST",
        url: "http://getsimpleform.com/messages/ajax?form_api_token=b5f5dc858da495c26b344e4fa8b484b3",
        dataType: 'jsonp',
        data: dataString,
        success: function() {
          $(".success").css("display","block");
          $(".contact input[type=\"text\"").val("");
          $(".contact input[type=\"email\"").val("");
          $(".contact textarea").val("");
        },
        error: function() {
          $(".error").css("display","block");
        }
      });
    } else {
      $(".error").css("display","block");
      return false;
    }
  });
}

function isElementInViewport(elem) {
    var $elem = $(elem);

    // Get the scroll position of the page.
    var scrollElem = ((navigator.userAgent.toLowerCase().indexOf('webkit') !== -1) ? 'body' : 'html');
    var viewportTop = $(scrollElem).scrollTop();
    var viewportBottom = viewportTop + $(window).height();

    // Get the position of the element on the page.
    var elemTop = Math.round( $elem.offset().top );
    var elemBottom = elemTop + $elem.height();

    return ((elemTop < viewportBottom) && (elemBottom > viewportTop));
}

// Check if it's time to start the animation.
function checkAnimation() {
    var $elem = $('.skillbar');

    // If the animation has already been started
    if ($elem.hasClass('start')) {
      return;
    }

    if (isElementInViewport($elem)) {
        // Start the animation
        $elem.addClass('start');
    }
}

function isElementVisible(el) {
  var $el = $(el);
  var windowTop = $(window).scrollTop(),
      windowBottom = windowTop + $(window).height(),
      elTop = Math.round( $el.offset().top ),
      elBottom = elTop + $el.height();

  return ((elTop < windowBottom) && (elBottom > windowTop));
}

$(document).ready(function(){
  $("html").removeClass("no-trs");
  $(".contact form ol li:nth-child(3)").css("display","none");

  navLinks();

  contactForm();

  $(window).scroll(function() {
    if(isElementVisible($(".skillset"))){
      $(".skillset span").removeClass("not-visible");
    }
  });
});