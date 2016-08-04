function loadScheduleItems(){
    var game1 = $("#gameitem1");
    var game2 = $("#gameitem2");
    var game3 = $("#gameitem3");
    var game4 = $("#gameitem4");
    var game5 = $("#gameitem5");
    var game6 = $("#gameitem6");
    var game7 = $("#gameitem7");
    var game8 = $("#gameitem8");
    var game9 = $("#gameitem9");
    var game10 = $("#gameitem10");
    var game11 = $("#gameitem11");
    var game12 = $("#gameitem12");
    TweenLite.to(game1,1,{opacity:1.0});
    TweenLite.to(game2,1,{opacity:1.0,  delay:.5});
    TweenLite.to(game3,1,{opacity:1.0,  delay:1});
    TweenLite.to(game4,1,{opacity:1.0,  delay:1.5});
    TweenLite.to(game5,1,{opacity:1.0,  delay:2});
    TweenLite.to(game6,1,{opacity:1.0,  delay:2.5});
    TweenLite.to(game7,1,{opacity:1.0,  delay:3});
    TweenLite.to(game8,1,{opacity:1.0,  delay:3.5});
    TweenLite.to(game9,1,{opacity:1.0,  delay:4});
    TweenLite.to(game10,1,{opacity:1.0,  delay:4.5});
    TweenLite.to(game11,1,{opacity:1.0,  delay:5});
    TweenLite.to(game12,1,{opacity:1.0,  delay:5.5});
}
/*
$(document).on('ready', function () {

    $("#loader").introLoader({
        animation: {
            name: 'lettersLoader',
            onAfter: loadScheduleItems,
            options: {
                ease: "easeInOutCirc",
                style: 'light',
                delayBefore: 100,
                delayAfter: 0,
                exitTime: 100,
                loaderText: 'Go Buckeyes! 2014 National Football Champions!',
                lettersDelayTime: 0
            }
        },
        spinJs: {
            lines: 13, // The number of lines to draw 
            length: 20, // The length of each line 
            width: 10, // The line thickness 
            radius: 30, // The radius of the inner circle 
            corners: 1, // Corner roundness (0..1) 
            color: '#fff', // #rgb or #rrggbb or array of colors 
        }
    });

}); */
setTimeout(loadScheduleItems, 1000);
var nextFC = false;
var testCount=0;
var gotitCount=0;
function startFlashCards(){
  testCount=0;
  formatFC();
  $("#flashcardmodal").modal('show');
}
function nextFlashCard(){
     nextFC =true;
     testCount++; 
     $("#flashcardmodal").modal('hide');
}
var hintlevel = 1;
if (!localStorage.bypassString) localStorage.bypassString = "#"; 
function getRandomPlayerID(){
    var rdmnn = Math.floor((Math.random() * 2)+1);
    if(localStorage.bypassString.indexOf(rdmnn+";")>0){
        getRandomPlayerID();
    } else{
      return rdmnn;
    }  
}

function formatFC(){
    hintlevel = 1; 
    var rdmpick = Math.floor((Math.random() * players.length));
    var rdmnn = getRandomPlayerID();
    var player = players[rdmpick];
    var modalHTML="<div><span class='cardcnt'> player number: "+ testCount +" | "+ gotitCount+" </span></div><div class='cluediv'> <span>";
    var detailsHTML= "<div class='hint' data-hlevel='1'> Position: "+player.pos+"</div>";
    detailsHTML+= "<div class='hint' data-hlevel='2'> From: "+player.from +" | Height/Weight: " + player.hgt + " / " + player.wgt + "</div>";
    var optionsHTML="<div><button class='btn btn-danger' onclick='showhint();'> hint </button></div>";
    if(rdmnn<2){
      modalHTML+=" # </span> " + player.number + "</div>";
      detailsHTML+= "<div class='hint' data-hlevel='3'> Name: "+player.name+"</div>";
    } else {
       modalHTML+="Name : </span> " + player.name + "</div>";  
       detailsHTML+= "<div class='hint' data-hlevel='3'> Number: "+player.number+"</div>";
    }
    $(".modal-body").html(modalHTML + optionsHTML + detailsHTML);
    
}
function showhint(){
  $("[data-hlevel='"+hintlevel+"']").slideDown();
  hintlevel++;
}
function gotit(){
    gotitCount++;
    $("[data-hlevel]").slideDown();
}

$("#flashcardmodal").on('hidden.bs.modal', function(){
    if(nextFC){
      formatFC();
      $("#flashcardmodal").modal('show');
      nextFC = false;
    }
} );
