window.i=0;
window.n=1;
window.random;
window.setValue;

$(document).ready(function(){
  $(".youwin").hide()
  $(".youlost").hide()
  $(".select img").eq(0).addClass("active");
});

$(document).on("click", ".select img",function(){  
  if ($(".play").hasClass("disable") == false) {
    $(this).siblings().removeClass("active");
    $(this).parent().siblings().find("img").removeClass("active");
    $(this).addClass("active");
  }
  
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

$(document).on("keydown" ,function(event){
  var i=1;
  while (i<=6){
    var active=$(".select img").eq(i-1).hasClass("active")
    if (active == true){
      if(event.keyCode == 67 || event.keyCode == 99) {
        window.random = i;
      }
      else if(event.keyCode == 86 || event.keyCode == 118) {
        if (i == 6) {
          window.random = i-1
        }
        else if (i == 1) {
          window.random = i+1
        }
        else {
          window.random = window.random + 1;
        }
      }
    }
    i++;
    // console.log(window.random + "window")
  }  
});

function focusFast(i,n,time){ 
  setTimeout(function(){ 
    $(".correct").attr("src","image/pic" + n + ".png")
    if (n<7) {   
      if (i==4 & n==random){
        $(".border").addClass("picture");
        checkCorrect(random)
      }
      else {
        if (n==6){
          if (i<3) {time = i*100;}
          else if (i==3) {time = 800}
          // else {
          //   time = 1000;
          // }
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
  // console.log("random" + text)
  return text;
}







 

