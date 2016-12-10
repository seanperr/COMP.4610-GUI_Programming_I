/**
 * AUTHOR:  Sean Perrier
 * EMAIL:   sean_perrier@student.uml.edu
 * FILE:    /assignments/assignment9/js/ScrabbleBag.js
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
 
if (typeof ScrabbleBag == 'undefined') {
    var ScrabbleBag = function() {
        var bag;
        var tiles = [];
        
        function init() {
            bag = $('<div id="scrabbleBag"></div>');
            
            bag.droppable({
                accept: '.scrabbleTile',
                drop: function(e, ui) {
                    
                    let tile = ui.draggable.detach();
                    let owner = tile.attr('data-owner');
                    tile.removeAttr('data-owner'); // Remove owner id from tile.
                    
                    // Get the rack that this tile belongs to.
                    let rack = $('.scrabbleRack[data-owner="' + owner + '"]');
                    console.log(owner);
                    
                    // Put 2 new tiles in the rack, and add old tile to bag.
                    newTile1 = removeRandomTile();
                    newTile1.attr('data-owner', owner);
                    newTile2 = removeRandomTile();
                    newTile2.attr('data-owner', owner);
                    
                    rack.append(newTile1, newTile2);
                    addTiles([tile]);
                }
            });
            return bag;
        }
        function empty() {
            tiles = [];
        }
        function addTiles(aTiles) {
            tiles = $.merge(tiles, aTiles);
        }
        
        function removeRandomTile() {
            if(tiles.length == 0) {
                return null;
            }
            var randomIndex = Math.floor(Math.random() * tiles.length);
            var removedTile = tiles.splice(randomIndex, 1)[0];
            return removedTile;
        }
        
        return {
            init: init,
            empty: empty,
            addTiles: addTiles,
            removeRandomTile: removeRandomTile
        }
    };
}