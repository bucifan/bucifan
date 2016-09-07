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

setTimeout(loadScheduleItems, 1000);
var nextFC = false;
var fromLU = false;
var testCount=0;
var gotitCount=0;
var currplayerIndx=0; 
var hintlevel = 1;
var gameResults2016 = [];
var currDisplay = "S";
if (!localStorage.bypassString) localStorage.bypassString = "#"; 
if (!localStorage.NumberOption) localStorage.NumberOption = "0"; 
if (!localStorage.OffDef) localStorage.OffDef = "X";
if (!localStorage.gameResults){
    localStorage.gameResults = JSON.stringify(gameResults2016);
} else {
   gameResults2016 = JSON.parse(localStorage.gameResults);
   for(var i=0;i<gameResults2016.length;i++){
      var scoreHTML ="<span style='font-family: Verdana, Geneva, sans-serif;color:#565e60'>";
      if(parseInt(gameResults2016[i].osusc) > parseInt(gameResults2016[i].oppsc)){
          scoreHTML+=" <b style='color:green'> W </b> ";
      }  else {
          //alert(gameResults2016[i].osuscr);
          //alert(gameResults2016[i].oppscr);
          scoreHTML+=" <b style='color:red'> L </b> ";
      }
      scoreHTML+=" OSU: " +gameResults2016[i].osusc + " " + gameResults2016[i].opp + ": "+gameResults2016[i].oppsc + "</span>";
      $("[data-opinit='"+gameResults2016[i].opp+"']").find(".schtime").html(scoreHTML);
   }
} 
var playerAutoComplete = [];
var rosterHTML="";
for(var i=0;i<players.length;i++){
    playerAutoComplete.push({value: players[i].number +" | "+ players[i].name, data:i});
    rosterHTML+="<tr><td class='nobrk'>"+ players[i].name +"</td><td>"+ players[i].pos +"</td><td>"+ players[i].number +"</td><td>"+ players[i].el +"</td><td>"+ players[i].hgt +"</td>><td>"+ players[i].wgt +"</td>><td class='nobrk'>"+ players[i].from +"</td></tr>";    
} 
$("#rosterTableBody").append(rosterHTML);
var alltktsDT = $("#rosterTable").DataTable({
      "order": [[ 2, "asc"]],
      "paging":   false,
      "columnDefs": [
        { "orderable": false, "targets": 0 }
      ],
      "pageLength": 25
  });
$("div.toolbar").html('<b>Buckeye Players</b>');

$('#rosterlookup').autocomplete({
    lookup: playerAutoComplete,
    onSelect: function (suggestion) {
        //alert('You selected: ' + suggestion.value + ', ' + suggestion.data);
        fromLU=true;
        currplayerIndx = suggestion.data;
        formatFC();
        $("#flashcardmodal").modal('show');
        $('#rosterlookup').val("");
     }
});

$(".gameitem").on('click',function(){
   $(".gamedtl").remove();
   $(this).after("<div class='gamedtl'> OSU <input id='osuscr' class='gscore' /> "+$(this).attr('data-opinit')+" <input id='oppscr' class='gscore' /> </div>");
   $(".gamedtl").append("<div class='closedtl' onclick='closeGameDetails(\""+$(this).attr('data-opinit')+"\");'> close </div>")
   $(".gamedtl").slideDown();
});

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
function getRandomPlayerID(){
   var rdmnn=0;
   switch (localStorage.OffDef) {
      case "X":
        rdmnn = Math.floor((Math.random() *  players.length));
        break;
      case "O":
         rdmnn = Math.floor((Math.random() *  10)); 
         break;
       case "D":  
        rdmnn = Math.floor((Math.random() *  22)) + 10; 
        break;
   }  
   if(localStorage.bypassString.indexOf(rdmnn+";")>0){
        getRandomPlayerID();
    } else{
        return rdmnn;  
    }  
}


function formatFC(){
    hintlevel = 1; 
    if(!fromLU){
      currplayerIndx = getRandomPlayerID();
    }  
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
    if(fromLU){
      $("[data-hlevel]").slideDown();
      fromLU = false;
    }  
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

function clearGameData(){
     gameResults2016 = [];
     localStorage.gameResults = JSON.stringify(gameResults2016);
}
function closeGameDetails(g){
    //alert(g);
    var fnd=false;
    var hasscore = true;
    if($("#oppscr").val().length==0||$("#osuscr").val().length==0){
        hasscore=false;
    }
    
        for (var i = 0; i < gameResults2016.length; i++) {
            if (gameResults2016[i].opp == g) {
                fnd = true;
                if(hasscore){
                  gameResults2016[i].oppsc = $("#oppscr").val();
                  gameResults2016[i].osusc = $("#osuscr").val();
                } else {
                  gameResults2016[i].opp= "OLD";    
                }  
            }
        }
    
    if(!fnd&&hasscore){
      gameResults2016.push({opp: g, oppsc: $("#oppscr").val(), osusc: $("#osuscr").val()});
    }
   localStorage.gameResults = JSON.stringify(gameResults2016);
   if(hasscore){
     var scoreHTML ="<span style='font-family: Verdana, Geneva, sans-serif;color:#565e60'>";
     if(parseInt($("#osuscr").val()) > parseInt($("#oppscr").val())){
          scoreHTML+=" <b style='color:green'> W </b> ";
      }  else {
          scoreHTML+=" <b style='color:red'> L </b> ";
      }
      scoreHTML+=" OSU: " +$("#osuscr").val() + " " + g + ": "+$("#oppscr").val()+ "</span>";
      $("[data-opinit='"+g+"']").find(".schtime").html(scoreHTML);
   } 
   $(".gamedtl").slideUp(); 
}
function togSettings(){
    $(".settings").slideToggle();
}

function switchDisplay(){
    if(currDisplay=="S"){
         $(".schedule2016").slideUp(function(){ $("#rosterDIV").slideDown();});
         $("#playerLookup").hide();
         currDisplay="R";  
    } else {
      $("#rosterDIV").slideUp(function(){ $(".schedule2016").slideDown();});
      currDisplay="S";
       $("#playerLookup").show();
    }
}