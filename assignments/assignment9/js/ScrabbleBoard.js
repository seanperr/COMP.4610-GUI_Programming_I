/**
 * AUTHOR:  Sean Perrier
 * EMAIL:   sean_perrier@student.uml.edu
 * FILE:    /assignments/assignment9/js/ScrabbleBoard.js
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

if (typeof ScrabbleBoard == 'undefined') {
    var ScrabbleBoard = function() {
        var domElement;
        var scrabbleBoardSpaces = [];
        var newLetters = {};
        
        function init() {
            domElement = $('<table id="scrabbleBoard"></table>');
            
            for(var x = 0; x < 15; x++) {
                row = $('<tr></tr>');
                
                for(var y = 0; y < 15; y++) {
                    var bonus = '';
                    
                    if(x % 4 == 1 && y % 4 == 1) {
                        bonus = 'Lx3';
                    }
                    if(x == y || x + y == 14) {
                        bonus = 'Wx2';
                    }
                    if(x % 7 == 0 && y % 7 == 0) {
                        bonus = 'Wx3';
                    }
                    if((x % 8 == 3 && y % 7 == 0) ||
                       (x % 7 == 0 && y % 8 == 3) ||
                       ((x == 2 || x == 6 || x == 8 || x == 10) &&
                        (y == 6 || y == 8))) {
                        bonus = 'Lx2';
                                   
                    }
                    scrabbleBoardSpaces.push([bonus]);
                    var cell = $('<td class="scrabbleBoardSpace ' + bonus +'"></td>');
                    
                    cell.droppable({
                        accept: '.scrabbleTile',
                        drop: function(e, ui) {
                            if ($(this).children().length === 0) {
                                var a = ui.draggable.detach();
                                a.removeAttr('style');
                                a.appendTo(this);
                            }   
                        }
                    });
                    row.append(cell);
                }
                domElement.append(row);
            }
            return domElement;
        }
        
        function getNewWords() {
            
        }
        
        return {
            init: init,
            getNewWords: getNewWords
        }
    };
}