(function($) {
  $.fn.getShares = function(el, svc, url) {

    $.ajax({
      url: svc + url,
      dataType:"jsonp",
      type:"GET",
      success:function(data) {
        el.text(data.count);
      }
    });
  };
})(jQuery);

$(document).ready(function() {
  var tw, fb;

  tw = "http://urls.api.twitter.com/1/urls/count.json?url=";
  fb = "http://graph.facebook.com/?id=";
});