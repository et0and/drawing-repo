var request = new XMLHttpRequest();
var url ='https://api.are.na/v2/channels/capcaptcha?per=1000';
request.open('GET', url, true);

request.onload = function() {
  if (request.status >= 200 && request.status < 400) {
    // Success!
    var data = JSON.parse(request.responseText);

    data.contents.forEach(function(c) {
      var div = document.createElement('div');

      div.className = 'entry';
      if (c.class === 'Text') {
        var text = c.content_html;
        div.innerHTML = text ;
      } else if (c.class === 'Image') {
        div.innerHTML = '<a href="' + c.image.original.url + '" target="_blank"><img src="' + c.image.display.url + '"></a><div class="caption">' + c.title + '</div>';
      }
      document.getElementById('entries').insertBefore(div, document.getElementById('entries').childNodes[0]);

      var anchors = document.getElementById('entries').getElementsByTagName('a');
      for (var i = 0; i < anchors.length; i++){
        anchors[i].setAttribute('target', '_blank');
      }

    });
  } else {
    // We reached our target server, but it returned an error
  }
};

request.onerror = function() {
  // There was a connection error of some sort
};

request.send();

// function formatDate(date) {
//   var monthNames = [
//     "January", "February", "March",
//     "April", "May", "June", "July",
//     "August", "September", "October",
//     "November", "December"
//   ];

//   var day = date.getDate();
//   var monthIndex = date.getMonth();
//   var year = date.getFullYear();

//   return day + ' ' + monthNames[monthIndex] + ' ' + year;
// }
