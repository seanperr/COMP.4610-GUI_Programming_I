/**
 * AUTHOR:  Sean Perrier
 * EMAIL:   sean_perrier@student.uml.edu
 * FILE:    /assignments/assignment9/js/ScrabbleScores.js
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
 
if (typeof ScrabbleScores == 'undefined') {
    var ScrabbleScores = function(aNumberOfPlayers) {
        var numberOfPlayers = aNumberOfPlayers;
        var scores = [];
        var domElement;
        
        function init() {
            domElement = $('<div class="scrabbleScores"></div>');
            for(let i = 0; i < numberOfPlayers; i++) {
                domElement.append('<div>Player ' + (i + 1) + ': <span>0</span></div>');
                scores.push(0);
            }
            return domElement;
        }
        function getDomElement() {
            return domElement;
        }
        function updateScore(playerId, value) {
            scores[playerId] += value;
            domElement.find('span').eq(playerId).text(scores[playerId]);
        }
        
        return {
            init: init,
            getDomElement: getDomElement,
            updateScore: updateScore
        }
    };
}