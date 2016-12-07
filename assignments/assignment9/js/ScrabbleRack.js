/**
 * AUTHOR:  Sean Perrier
 * EMAIL:   sean_perrier@student.uml.edu
 * FILE:    /assignments/assignment9/js/ScrabbleRack.js
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
 
if (typeof ScrabbleRack == 'undefined') {
    var ScrabbleRack = function(aPlayerId) {
        var playerId = aPlayerId;
        var domElement;
        var scrabbleTiles = [];
        
        function init() {
            domElement = $('<div class="scrabbleRack"><h3>Player ' + (playerId + 1) + '</h3></div>');
            
            //domElement.sortable({items: '.scrabbleTile'}).disableSelection();
            
            return domElement;
        }
        function getDomElement() {
            return domElement;
        }
        function addTile(scrabbleTile) {
            scrabbleTiles.push(scrabbleTile);
            //domElement.sortable('refresh');
            domElement.append(scrabbleTile.getDomElement());
        }
        function removeTile(id = null) {
            if(id === null) {
                // add return random functionality.
            }
            for (var i = 0; i < scrabbleTiles.length; i++) {
                if(scrabbleTiles[i].getId() === id) {
                    return scrabbleTiles.splice(i, 1);
                }
            }
            return null; // No tiles found.
        }
        
        return {
            init: init,
            getDomElement: getDomElement,
            addTile: addTile,
            removeTile: removeTile
        }
    };
}