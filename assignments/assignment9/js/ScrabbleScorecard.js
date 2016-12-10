/**
 * AUTHOR:  Sean Perrier
 * EMAIL:   sean_perrier@student.uml.edu
 * FILE:    /assignments/assignment9/js/ScrabbleScorecard.js
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
 
if (typeof ScrabbleScorecard == 'undefined') {
    var ScrabbleScorecard = function() {
        var scorecard;
        var scores = [];
        
        function init() {
            scorecard = $('<div class="scrabbleScorecard"><div class="scoresLabel">Scores</div></div>');
            return scorecard;
        }
        function populatePlayers(aNumberOfPlayers) {
            for(let i = 0; i < aNumberOfPlayers; i++) {
                scorecard.append('<div class="scoresPlayer">Player ' + (i + 1) + ': <span>0</span></div>');
                scores.push(0);
            }
        }
        function updateScore(playerId, value) {
            scores[playerId] += value;
            scorecard.find('span').eq(playerId).text(scores[playerId]);
        }
        
        return {
            init: init,
            updateScore: updateScore,
            populatePlayers: populatePlayers
        }
    };
}