$(function() {
    // #1
    $('li:contains("pine")').text('almonds');
    
    // #2
    $('li.hot').html(function() {
        return '<em>' + $(this).text() + '</em>';
    });
    
    // #3
    $('li#one').remove();
});