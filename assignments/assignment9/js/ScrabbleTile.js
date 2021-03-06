/**
 * AUTHOR:  Sean Perrier
 * EMAIL:   sean_perrier@student.uml.edu
 * FILE:    /assignments/assignment9/js/ScrabbleTile.js
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

if (typeof ScrabbleTile == 'undefined') {
    var ScrabbleTile = function(aLetter, aValue, aId) {
        var tile;
        var letter = aLetter;
        var value = aValue;
        var id = aId;
        
        function init() {
            tile = $('<div id="' + id + '" class="scrabbleTile"><span>' + letter + '</span><span>' + value + '</span></div>');
            tile.draggable({
                revert: true,
                revertDuration: 0,
                addClasses: false
            }
            
            ).disableSelection();
            
            $.data(tile[0], 'jsObject', this);
			
            return tile;
        }
        function getLetter() {
            return letter;
        }
        function getValue() {
            return value;
        }
        function getId() {
            return id;
        }
        return {
            init: init,
            getLetter: getLetter,
            getValue: getValue,
            getId: getId
        }
    };
}