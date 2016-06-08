var client = new WindowsAzure.MobileServiceClient(
    "https://bucifanschedule.azure-mobile.net/",
    "HsHTwBVpXHRvMdJGSvhsgUOZtPjdFd77"
);
var schDisplayed = false;
var editID = 9999;
var selectedYear = $("#selYear").val();
$("#selYear").on('change', function(){
    selectedYear = $("#selYear").val();
    alert(selectedYear);
})

function getSchedule() {
    var schHTML = "<table ><tr><th colspan='4'> "+selectedYear+" Schedule</th></tr>";
    $.getJSON("http://bucifanSchedule.azure-mobile.net/api/footballseason?year="+selectedYear, function (data) {
        for (i = 0; i < data.length;i++) {
            schHTML += "<tr data-localid='" + i + "' data-serverid='" + data[i].id + "' ><td><a href='javascript:editGame("+i+")' class='btn btn-default' >edit</a></td>"
            schHTML+="<td data-gamedate='"+i+"'>" + data[i].GameDateTime + "</td><td data-gameopp='"+i+"'>" + data[i].Opponet + "</td><td data-gameloc='"+i+"'>";
            schHTML += data[i].Location + "</td></tr>";
        }
        $("#schedule").html(schHTML+"</table>");
        if(!schDisplayed){
          $("#schedule").slideDown();
          schDisplayed=true;
       }
    });
 }
 
function addScheduleGame(){
  //build form
  var schHTML = "<table><tr><td><b>Year:</b></td><td> <input id='newYear'></td></tr>";
  schHTML += "<tr><td><b>Opponet:</b> </td><td> <input id='newOpp'></td></tr>";
  schHTML += "<tr><td><b>Date:</b> </td><td> <input id='newDate'></td></tr>";
  schHTML += "<tr><td><b>Location:</b> </td><td> <input id='newLoc'></td></tr></table>";
  schHTML+="<a href='javascript:addGame();' class='btn btn-default' >Add Game</a>" 
  $("#schedule").html(schHTML);
  if(!schDisplayed){
    $("#schedule").slideDown();
     schDisplayed=true;
  }
}
 
function addGame(){
  var scheduleTbl = client.getTable('Schedule');
  if(($("#newYear").val()!="")&&($("#newOpp").val()!="")&&($("#newDate").val()!="")){
    var scheduleTbl = client.getTable('Schedule');  
    //alert('ok');
    scheduleTbl.insert({
       Year: $("#newYear").val(),
       Sport: "Football",
       Opponet: $("#newOpp").val(),
       GameDateTime: $("#newDate").val()
    }).done(function(result){
       alert("Add Complete" + JSON.stringify(result));
       $("input").val("");
    }, function(err){
       alert("Error:"+ err)
    });
  } else {
    alert("Need Year, Opponet and Date")
  }
}

function editGame(i){
    if(editID==i){
        //do update
        var dbid = $("[data-localid='"+ i + "']").attr('data-serverid');
        alert(dbid); 
        var scheduleTbl = client.getTable('Schedule');  
        scheduleTbl.update({
          id: dbid,
          Year: selectedYear,
          GameDateTime: $('#editGD').val(),
          Opponet: $('#editOPP').val(),
          Location: $('#editLOC').val()
        }).done(function(result){
          alert("Eit complete: " + JSON.stringify(result));
          $("[data-gamedate='"+i+"']").html($('#editGD').val());
          $("[data-gameopp='"+i+"']").html($('#editOPP').val()); 
          $("[data-gameloc='"+i+"']").html($('#editLOC').val());
        }, function(err){
          alert("Update Error:"+ err)
        });
    } else {
        editID=i;
        var cgdt = $("[data-gamedate='"+i+"']").text();
        var copp=   $("[data-gameopp='"+i+"']").text(); 
        var cloc=   $("[data-gameloc='"+i+"']").text(); 
        $("[data-gamedate='"+i+"']").html("<input id='editGD' value='"+cgdt+"'/>");
        $("[data-gameopp='"+i+"']").html("<input id='editOPP' value='"+copp+"'/>"); 
        $("[data-gameloc='"+i+"']").html("<input id='editLOC' value='"+cloc+"'/>");        
    }
}