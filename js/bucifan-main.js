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
    TweenLite.to(game1,3,{opacity:1.0});
    TweenLite.to(game2,3,{opacity:1.0, delay:2});
    TweenLite.to(game3,3,{opacity:1.0, delay:3});
    TweenLite.to(game4,3,{opacity:1.0, delay:4});
    TweenLite.to(game5,3,{opacity:1.0, delay:5});
    TweenLite.to(game6,3,{opacity:1.0, delay:6});
    TweenLite.to(game7,3,{opacity:1.0, delay:7});
    TweenLite.to(game8,3,{opacity:1.0, delay:8});
    TweenLite.to(game9,3,{opacity:1.0, delay:9});
    TweenLite.to(game10,3,{opacity:1.0, delay:10});
    TweenLite.to(game11,3,{opacity:1.0, delay:11});
    TweenLite.to(game12,3,{opacity:1.0, delay:12});
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