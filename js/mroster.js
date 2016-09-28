players.sort(function(a,b){
   return a.number - b.number; 
});

for(var i=0;i<players.length;i++){
  $("#mblRoster").append("<tr><td>"+ players[i].number+"</td><td>"+ players[i].name+"</td><td>"+ players[i].pos+"</td><td>"+ players[i].el+"</td></tr>");
}  