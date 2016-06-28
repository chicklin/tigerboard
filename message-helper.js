// get the message body
var body = $('#body');

// replace .gifv links with video tags
var links = body.find("a[href$='.gifv']");
links.replaceWith(function() {
  var href = $(this)[0].href;
  return '<video controls muted autoplay loop><source type="video/webm" src="' + href.replace('.gifv', '.webm') + '"><source type="video/mp4" src="' + href.replace('.gifv', '.mp4') + '"></video>';
});

// replace .webm links with video tags
var links = body.find("a[href$='.webm']");
links.replaceWith(function() {
  var href = $(this)[0].href;
  return '<video controls muted autoplay loop><source type="video/webm" src="' + href + '"></video>';
});

// replace imgur .gif img tags with .gifv video tags
var gifs = body.find("img[src$='.gif']").filter(function(index, element) {
  if(element.src.match('^https?:\/\/.*imgur.com\/.*\.gif$')) {
    return true;
  } else {
    return false;
  }
});
gifs.replaceWith(function() {
  $(this).prev('a.hilink').css('display', 'none');
  var src = $(this)[0].src;
  return '<video controls muted autoplay loop><source type="video/webm" src="' + src.replace('.gif', '.webm') + '"><source type="video/mp4" src="' + src.replace('.gif', '.mp4') + '"></video>';
});
