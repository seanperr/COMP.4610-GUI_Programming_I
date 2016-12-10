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
        var rack;
        var playerId = aPlayerId;
        
        function init() {
            rack = $('<div class="scrabbleRack hidden" data-owner="' + playerId + '">' +
                '<div class="rackLabel"><h3>Player ' + (playerId + 1) + '</h3></div>' +
                '<div class="rackDrop"></div></div>');
            rack.find('.rackDrop').droppable({
                addClasses: false,
                accept: '.scrabbleTile', // Accept only tiles.
                drop: function(e, ui) {  // Called when rack is dropped on.
                    
                    // Remove the tile from the DOM.
                    let tile = ui.draggable.detach();
                    
                    // Add owner id to tile.
                    tile.attr('data-owner', playerId);
                    
                    // Reattach the tile to the DOM, but in this rack.
                    tile.appendTo(this);
                    tile.css({top: '0', left: '0'}); // Reset position.
                  
                }
             });
            return rack;
        }
        
        function addTiles(aTiles) { console.log('a');
            for(let i = 0; i < aTiles.length; i++) {
                aTiles[i].attr('data-owner', playerId);
                rack.find('.rackDrop').append(aTiles[i]);
            }
        }
        
        function getRack() {
			return rack;
		}
        
        return {
            init: init,
            addTiles: addTiles,
			getRack: getRack
        }
    };
}