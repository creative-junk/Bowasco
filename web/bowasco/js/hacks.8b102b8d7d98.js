// ////
// //// Replace dashed line spinners in firefox with image
// if(navigator.userAgent.match(/(Gecko|Firefox)/i)) {
//     $('.filters .filter').css({
//         'background-color': 'red';
//         'background-image': '',
//         'background-size': '100%',
//         'background-position': 'center',
//         'border': '0'
//     });
// }


////
//// Hide video elements until user clicks play button for iOS 7.1
if(navigator.userAgent.match(/(iPhone.*7_1|7_1.*iPhone)/i)) {
    $('video').css('visibility', 'hidden');
    $(document).on('ios71ToggleVid', function() {
        if($('video').css('visibility') == 'visible') {
            $('video').css('visibility', 'hidden');
        } else {
            $('video').css('visibility', 'visible');
        }
    });
    $(document).on('ios71ShowVid', function() {
        $('video').css('visibility', 'visible');
    });
}
