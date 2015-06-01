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

function postPoints(){
  var vars = [], hash;
  var q = document.URL.split('?')[1];
  if(q != undefined){
    q = q.split('&');
    for(var i = 0; i < q.length; i++){
      hash = q[i].split('=');
      vars.push(hash[1]);
      vars[hash[0]] = hash[1];
    }
  }

  var assignmentId = hash['assignmentId'];
  if(assignmentId == "ASSIGNMENT_ID_NOT_AVAILABLE") return; //its a preview
  var data = {
    points: getPoints(),
    hitId: hash['hitId']
  };

  //do something better here!

  /*
  $.ajax(
    {
        url: "http://www.mturk.com/mturk/externalSubmit?assignmentId=" + assignmentId,
        type: "POST",
        data: {data:JSON.stringify(data)},
        success:function(data, textStatus, jqXHR) 
        {
            console.log('posted!')
        },
        error: function(jqXHR, textStatus, errorThrown) 
        {
            console.log('posted! failed!')    
        }
    });
  */
}