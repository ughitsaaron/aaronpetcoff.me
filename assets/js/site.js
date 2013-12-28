$(document).ready(function(){
 

  // parallaxing background
  (function($) {
   
    $.fn.parallax = function(options) {

      var windowHeight = $(window).height();

      // Establish default settings
      var settings = $.extend({
          speed        : 0.15
      }, options);

      // Iterate over each object in collection
      return this.each( function() {

        // Save a reference to the element
        var $this = $(this);

        // Set up Scroll Handler
        $(document).scroll(function(){

          var scrollTop = $(window).scrollTop();
            var offset = $this.offset().top;
            var height = $this.outerHeight();

          // Check if above or below viewport
      if (offset + height <= scrollTop || offset >= scrollTop + windowHeight) {
        return;
      }

      var yBgPosition = Math.round((offset - scrollTop) * settings.speed);

        // Apply the Y Background Position to Set the Parallax Effect
        $this.css('background-position', 'center ' + yBgPosition + 'px');
                
        });
      });
    }
  }(jQuery));
  
  // set parallax to page elements
  var page = $('.scroll');
  page.parallax({ speed : 0.2 });
  
  // sticky nav
  var stickyRibbonTop = $('#nav').offset().top;
  
  $(window).scroll(function(){

    // check if window has scrolled passed the nav
    if( $(window).scrollTop() >= stickyRibbonTop) {

      // if true then fix the nav to the top of the window
      $('#nav').css({position: 'fixed', top: '0px', boxShadow: "0px 0px 6px rgba(0,0,0,.35)"});

    } else {
      // if false then leave nav where it is
        $('#nav').css({position: 'static', top: '0px', boxShadow: "none"});
    }
  });
});

// Contact Form
$(document).ready(function(){
    $(".subject").hide();
});

$("#emailForm").submit(function(e){
  e.preventDefault();
  var name = $("#name").val();
  var email = $("#email").val();
  var text = $("#text").val();
  var dataString = 'name=' + name + '&email=' + email + '&text=' + text;

  function isValidEmail(emailAddress) {
    var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
    return pattern.test(emailAddress);
  };

  if ($('#subject').val().length != 0) {
    return false;
  } 
 
  if (isValidEmail(email) && (text.length > 100) && (name.length > 1)){
    $.ajax({
      type: "POST",
      url: "http://getsimpleform.com/messages?form_api_token=b5f5dc858da495c26b344e4fa8b484b3",
      data: dataString,
      success: function(){
        $('.success').fadeIn(500);
        $('.btn').fadeOut(500);
      }
    });
  } else{
    $('.error').fadeIn(500);
  }
 
  return false;
});