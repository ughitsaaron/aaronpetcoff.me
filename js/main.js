(function() {

  function isElementVisible(el) {
    // use for running skillbar animation

    var $el = $(el);
    var windowTop = $(window).scrollTop(),
        windowBottom = windowTop + $(window).height(),
        elTop = Math.round( $el.offset().top ),
        elBottom = elTop + $el.height();

    return ((elTop < windowBottom) && (elBottom > windowTop));
  }

  function contactForm() {
    // validates and submits contact form

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

  function showSidebar() {
    // reveals hidden sidebar
    var $navBtn,
        $main,
        $site,
        $contact;

    // define all our elements
    $navBtn = $(".nav-toggle");
    $main = $("main");
    $site = $(".site");
    $contact = $(".contact"); // we'll hide the contact form when the sidebar shows

    $navBtn.click(function(e) {
      // when you click on the nav button the sidebar is revealed
      e.preventDefault();
      $navBtn.toggleClass("active");
      $main.toggleClass("push");
      $contact.toggleClass("push");
      $site.toggleClass("screen");
    });
  }

  function runBars() {
    if($(".skillset").length) {
      $(window).scroll(function() {
        if(isElementVisible($(".skillset"))){
          $(".bar b").removeClass("not-visible");
        }
      });
    }
  }

  $(document).ready(function(){
    $("html").removeClass("no-js");
    $("html").removeClass("no-trs");
    $(".contact form ol li:nth-child(3)").addClass("hide");


    /* $("main").on("click", function() {
      if($("main.push").length) {
        $(".push").removeClass("push");
        $(".nav-toggle").removeClass("active");
        $(".site").css(false);
      }
    }); */

    contactForm();
    showSidebar();
    runBars();
  });
})();