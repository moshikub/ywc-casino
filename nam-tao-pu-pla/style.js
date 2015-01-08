window.i=0;
window.n=1;
window.random;

$(document).ready(function(){
  $(".youwin").hide()
  $(".youlost").hide()
});

$(document).on("click", ".select img",function(){
  $(this).siblings().removeClass("active");
  $(this).parent().siblings().find("img").removeClass("active");
  $(this).addClass("active");
  
});

$(document).on("click", ".play",function(){
  $(".border").removeClass("picture");
  $(".youwin").hide()
  $(".youlost").hide()
  $(this).attr("src","image/play1.png")
  focusFast(i,n,100);
    window.i=0;
    window.n=1;
    $(".play").addClass("disable")
    $(".play").attr("disabled","disabled");
    random = makeid()
});

function focusFast(i,n,time){ 
  setTimeout(function(){ 
    $(".correct").attr("src","image/pic" + n + ".png")
    if (n<7) {   
      if (i==5 & n==random){
        $(".border").addClass("picture");
        checkCorrect(random)
      }
      else {
        if (n==6){
          if (i<3) {time = i*100;}
          else if (i==3) {time = 500}
          else {
            time = 1200;
          }
          i++;
          focusFast(i,1,time);
        }
        else {
          n++;
          focusFast(i,n,time);
        }  
      }
    }
  }, time);  
}

function checkCorrect(random){
  $(".play").removeClass("disable")
  $(".play").removeAttr("disabled","disabled");
  $(".play").attr("src","image/play2.png")
  var i=1;
  while (i<=6){
    var active=$(".select img").eq(i-1).hasClass("active")
    if (active == true){
      if (i==random){       
        $(".youwin").fadeIn(2000);
        return
      }
    }
    i++;
  }
  $(".youlost").fadeIn(2000);
}

function makeid() {
  var possible = "123456";
  var text = Math.floor(Math.random() * possible.length)+1;
  console.log("random" + text)
  return text;
}







 

