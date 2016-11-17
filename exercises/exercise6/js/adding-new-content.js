$(function() {
    // #1
    $('ul').before('<p>Just updated</p>');
    
    // #2
    $('li.hot').prepend('+ ');
    
    // #3
    var $li = $('<li><em>gluten-free</em> soy sauce</li>');
    $('li:last').after($li);
});