function contactForm() {
  $(".contact form").submit(function(e) {
    e.preventDefault();
    var name,email,subject,msg,dataString;
    name = $(".contact input[name^=\"name\"]").val();
    email = $(".contact input[name^=\"email\"]").val();
    subject = $(".contact input[name^=\"subject\"]").val();
    message = $(".contact textarea[name^=\"message\"]").val();
    dataString = 'name=' + name + '&email=' + email + '&message=' + message;

    if(subject===false) {
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
  $("html").removeClass("no-js");
  $("html").removeClass("no-trs");
  $(".contact form ol li:nth-child(3)").css("display","none");

  $(".nav-toggle").on("click", function(e) {
    e.preventDefault;
    $(".nav-toggle").toggleClass("active");
    $("main").toggleClass("push");
    
    if($(".push").length) {
      $(".site").css("overflow","hidden");
    }
  });

  /* $("main").on("click", function() {
    if($("main.push").length) {
      $(".push").removeClass("push");
      $(".nav-toggle").removeClass("active");
      $(".site").css(false);
    }
  }); */

  contactForm();

  if($(".skillset").length) {
    $(window).scroll(function() {
      if(isElementVisible($(".skillset"))){
        $(".bar b").removeClass("not-visible");
      }
    });
  }
});