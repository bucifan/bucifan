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
if (!localStorage.NumberOption) localStorage.NumberOption = "0"; 
if (!localStorage.OffDef) localStorage.OffDef = "X"; 
function getRandomPlayerID(){
    var rdmnn = Math.floor((Math.random() *  players.length));
    if(localStorage.bypassString.indexOf(rdmnn+";")>0){
        getRandomPlayerID();
    } else{
      if(localStorage.OffDef == "X"){
        return rdmnn;  
      } else {
        if (localStorage.NumberOption = "O"){
            if(players[rdmnn].OffDef="O"){
                return rdmnn;
            } else {
                getRandomPlayerID();
            }
        } else {
            if(players[rdmnn].OffDef="D"){
                return rdmnn;
            } else {
                getRandomPlayerID();
            }
        }
      }
    }  
}

var currplayerIndx=0; 
function formatFC(){
    hintlevel = 1; 
    currplayerIndx = getRandomPlayerID();
    var rdmnn = Math.floor((Math.random() * 2)+1); ;
    var player = players[currplayerIndx];
    var modalHTML="<div style='height:35px;'><span class='cardcnt'> <a href='javascript:popskip();'>*</a> | number only: <a href='javascript:toggleNumOption();' id='nbrlink'>temp</a> | offense/defense : <a href='javascript:toggleODOption();' id='odlink'>temp</a> |player number: "+ testCount +" | "+gotitCount+" </span></div><div class='cluediv'> <span>";
    var detailsHTML= "<div class='hint' data-hlevel='1'> Position: "+player.pos+" | Eligability: "+player.el+"</div>";
    detailsHTML+= "<div class='hint' data-hlevel='2'> From: "+player.from +" | Height/Weight: " + player.hgt + " / " + player.wgt + "</div>";
    var optionsHTML="<div><button class='btn btn-danger' onclick='showhint();'> hint </button></div>";
    if(localStorage.NumberOption == "1"){
        rdmnn=0;
    }
    if(rdmnn<2){
      modalHTML+=" # </span> " + player.number + "</div>";
      detailsHTML+= "<div class='cluediv hint' data-hlevel='3'> <span>Name: </span> "+player.name+"</div>";
    } else {
       modalHTML+="Name : </span> " + player.name + "</div>";  
       detailsHTML+= "<div class='cluediv hint' data-hlevel='3'><span> # </span>  "+player.number+"</div>";
    }
    $(".modal-body").html(modalHTML + optionsHTML + detailsHTML);
    setOptionsLinks(); 
}
function showhint(){
  if(hintlevel<4){    
    $("[data-hlevel='"+hintlevel+"']").slideDown();
    hintlevel++;
  }  else {
      nextFlashCard();
  }
}
function gotit(){
    gotitCount++;
    $("[data-hlevel]").slideDown();
    setTimeout(nextFlashCard,4000);
}
function skipit(){
    localStorage.bypassString+= currplayerIndx+";";
    nextFlashCard();
}
function clearskip(){
     localStorage.bypassString = "#";
     nextFlashCard();
}
function popskip(){
    alert(localStorage.bypassString + " | " + localStorage.NumberOption+ " | " +localStorage.OffDef);
}
function toggleNumOption(){
    if(localStorage.NumberOption == "0"){
        localStorage.NumberOption = "1";
    } else {
        localStorage.NumberOption = "0";
    }
    setOptionsLinks();
}

function toggleODOption(){
    if(localStorage.OffDef == "X"){
        localStorage.OffDef = "O";
    } else {
        if(localStorage.OffDef == "O"){
           localStorage.OffDef = "D";
        } else {
          localStorage.OffDef= "X";
        }
    }    
    setOptionsLinks();
}

function setOptionsLinks(){
  switch (localStorage.OffDef) {
    case "X":
      $("#odlink").text("off");
      break;
    case "O":
      $("#odlink").text("offense only");
      break;
    case "D":
      $("#odlink").text("defense only");
      break;
  }
   switch (localStorage.NumberOption) {
    case "0":
      $("#nbrlink").text("off");
      break;
    case "1":
      $("#nbrlink").text("on");
      break;
  }
} 

$("#flashcardmodal").on('hidden.bs.modal', function(){
    if(nextFC){
      formatFC();
      $("#flashcardmodal").modal('show');
      nextFC = false;
    }
} );

