function loadScheduleItems(){
    var game1 = $("#gameitem1");
    var game2 = $("#gameitem2");
    TweenLite.to(game1,3,{opacity:1.0});
    TweenLite.to(game2,3,{opacity:1.0, delay:2});
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