$(function() {
    // #1
    var backgroundColor = $('li#one').css('background-color');
    
    // #2
    $('ul').append('<p>Color was: ' + backgroundColor + '</p>');
    
    // #3
    $('li').css({
        'background-color': '#c5a996',
        'border': '1px solid #ffffff',
        'color': '#000000',
        'text-shadow': 'none',
        'font-family': 'Georgia'
    });
});