/**
 * AUTHOR:  Sean Perrier
 * EMAIL:   sean_perrier@student.uml.edu
 * FILE:    /assignments/assignment9/js/ScrabblePopup.js
 * 
 * DATE CREATED:  November 30, 2016 10:30 AM
 * DATE MODIFIED: December 05, 2016 2:00 PM
 * 
 * AFFILIATION:
 *   Author is an undergraduate at UMass Lowell majoring in Computer
 *   Science. File was created for UMass Lowell's 'COMP 4610 GUI 
 *   Programming I' course.
 *   
 * FILE DESCRIPTION:
 *   Assignment #9: Implementing a Bit of Scrabble with Drag-and-Drop
 *   
 * COPYRIGHT:
 *   Copyright (c) 2016 by Sean M. Perrier. All rights reserved.
 */

if (typeof ScrabblePopup == 'undefined') {
    var ScrabblePopup = function(aScrabbleManager) {
        var scrabbleManager = aScrabbleManager;
        var popup;
        
        function init() {
            popup = $('<div id="scrabblePopup"></div>');
            
            // Create the window that shows before the game starts.
            let pregamePopup = 
                $('<div id="pregamePopup">' +
                    '<label for="inputNumberOfPlayers">Select Number of Players:</label>' +
                '</div>');
            
            // Create input field for the number of players.
            let inputNumberOfPlayers = $(
                '<select id="inputNumberOfPlayers" name="inputNumberOfPlayers">' +
                    '<option selected>1</option>' +
                    '<option>2</option>' +
                    '<option>3</option>' +
                    '<option>4</option>' +
                '</select>'
            );
            pregamePopup.append(inputNumberOfPlayers);
            inputNumberOfPlayers.selectmenu({style: 'dropdown'});
            
            // Create start game button.
            let startGameBtn = $('<input id="startGameBtn" type="submit">');
            startGameBtn.button({
                label: 'Start Game'
            });
            startGameBtn.click(function(e) {
                aScrabbleManager.start(inputNumberOfPlayers.val());
                popup.addClass('hidden');
                e.preventDefault();
            });
            pregamePopup.append(startGameBtn);
            popup.append(pregamePopup);
            
            return popup;
        }
        return {
            init: init
        }
    };
}