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
        var domElement;
        var scrabbleTiles = [];
        
        function init() {
            domElement = $('<div id="scrabbleBag"></div>');
            return domElement;
        }
        function empty() {
            scrabbleTiles = [];
        }
        
        function addTile(scrabbleTile) {
            scrabbleTiles.push(scrabbleTile);
            //domElement.append(scrabbleTile.getDomElement());
        }
        
        function removeRandomTile() {
            if(scrabbleTiles.length == 0) {
                return null;
            }
            var randomIndex = Math.floor(Math.random() * scrabbleTiles.length);
            var removedTile = scrabbleTiles.splice(randomIndex, 1)[0];
            return removedTile;
        }
        
        return {
            init: init,
            empty: empty,
            addTile: addTile,
            removeRandomTile: removeRandomTile
        }
    };
}