function FindPosition(oElement)
{
  if(typeof( oElement.offsetParent ) != "undefined")
  {
    for(var posX = 0, posY = 0; oElement; oElement = oElement.offsetParent)
    {
      posX += oElement.offsetLeft;
      posY += oElement.offsetTop;
    }
      return [ posX, posY ];
    }
    else
    {
      return [ oElement.x, oElement.y ];
    }
}
function GetCoordinates(e)
{
  var PosX = 0;
  var PosY = 0;
  var ImgPos;
  ImgPos = FindPosition($("#click-image")[0]);
  if (!e) e = window.event;
  if (e.pageX || e.pageY)
  {
    PosX = e.pageX;
    PosY = e.pageY;
  }
  else if (e.clientX || e.clientY)
    {
      PosX = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
      PosY = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }
  PosX = PosX - ImgPos[0];
  PosY = PosY - ImgPos[1];
  console.log(PosX);
  console.log(PosY);
  var newEle = $('<div class="point"></div>');
  newEle.css("width", "100px");
  newEle.css("height", "100px");
  newEle.css("left", (PosX - newEle.width()/2)+"px");
  newEle.css("top", (PosY - newEle.height()/2)+"px");
  newEle.click(function(ele){
    $(this).remove();
  });
  $("#container").append(newEle);
}


$(document).ready(function(){
  $('img').on('dragstart', function(event) { event.preventDefault(); });
  $("#click-image")[0].onmousedown=GetCoordinates;
});

//http://www.mturk.com/mturk/externalSubmit

function getPoints(){
  var points = [];
  $(".point").each(function(){
    points.push({
      x:$(this).css("left").replace("px",""),
      y:$(this).css("top").replace("px","")
    });
  });
  return points;
}

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1]);
        }
    }
    console.log('Query variable %s not found', variable);
    return null;
}

function postPoints(){
  var assignmentId = getQueryVariable('assignmentId');
  if(assignmentId == "ASSIGNMENT_ID_NOT_AVAILABLE")
    return false; //its a preview

  var data = {
    points: getPoints(),
    hitId: getQueryVariable('hitId')
  };

  $("#data").val(JSON.stringify(data));
  $("#assignmentId").val(assignmentId);

  $("#mturkForm").submit();
}
