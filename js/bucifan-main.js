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
    TweenLite.from(game1,1,{opacity:0.0, y:100});
    TweenLite.from(game2,1,{opacity:0.0, y:100, delay:.5});
    TweenLite.from(game3,1,{opacity:0.0, y:100, delay:1});
    TweenLite.from(game4,1,{opacity:0.0, y:100, delay:1.5});
    TweenLite.from(game5,1,{opacity:0.0, y:100, delay:2});
    TweenLite.from(game6,1,{opacity:0.0, y:100, delay:2.5});
    TweenLite.from(game7,1,{opacity:0.0, y:100, delay:3});
    TweenLite.from(game8,1,{opacity:0.0, y:100, delay:3.5});
    TweenLite.from(game9,1,{opacity:0.0, y:100, delay:4});
    TweenLite.from(game10,1,{opacity:0.0, y:100, delay:4.5});
    TweenLite.from(game11,1,{opacity:0.0, y:100, delay:5});
    TweenLite.from(game12,1,{opacity:0.0, y:100, delay:5.5});
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