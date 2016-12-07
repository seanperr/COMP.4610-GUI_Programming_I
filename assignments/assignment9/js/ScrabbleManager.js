/**
 * AUTHOR:  Sean Perrier
 * EMAIL:   sean_perrier@student.uml.edu
 * FILE:    /assignments/assignment9/js/ScrabbleManager.js
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
 
if (typeof ScrabbleManager == 'undefined') {
    var ScrabbleManager = (function() {
        var scrabbleContainer;
        var scrabbleBoard;
        var scrabbleBag;
        var scrabbleRacks = [];
        var scrabbleScores;
        
        var numberOfPlayers = 1;
        var currentPlayerId;
        
        const TILES = {
            'A' : {"value" : 1,   "count" : 9},
            'B' : {"value" : 3,   "count" : 2},
            'C' : {"value" : 3,   "count" : 2},
            'D' : {"value" : 2,   "count" : 4},
            'E' : {"value" : 1,   "count" : 12},
            'F' : {"value" : 4,   "count" : 2},
            'G' : {"value" : 2,   "count" : 3},
            'H' : {"value" : 4,   "count" : 2},
            'I' : {"value" : 1,   "count" : 9},
            'J' : {"value" : 8,   "count" : 1},
            'K' : {"value" : 5,   "count" : 1},
            'L' : {"value" : 1,   "count" : 4},
            'M' : {"value" : 3,   "count" : 2},
            'N' : {"value" : 1,   "count" : 6},
            'O' : {"value" : 1,   "count" : 8},
            'P' : {"value" : 3,   "count" : 2},
            'Q' : {"value" : 10,  "count" : 1},
            'R' : {"value" : 1,   "count" : 6},
            'S' : {"value" : 1,   "count" : 4},
            'T' : {"value" : 1,   "count" : 6},
            'U' : {"value" : 1,   "count" : 4},
            'V' : {"value" : 4,   "count" : 2},
            'W' : {"value" : 4,   "count" : 2},
            'X' : {"value" : 8,   "count" : 1},
            'Y' : {"value" : 4,   "count" : 2},
            'Z' : {"value" : 10,  "count" : 1},
            '_' : {"value" : 0,   "count" : 2},
        };
        
        function init() {
            scrabbleContainer = $(document.body);
            scrabbleContainer.empty(); // Make sure it's empty.
            
            // Create the board.
            scrabbleBoard = new ScrabbleBoard();
            scrabbleContainer.append(scrabbleBoard.init());
            
            // Create the scorecard.
            scrabbleScores = new ScrabbleScores(numberOfPlayers);
            scrabbleContainer.append(scrabbleScores.init());
            
            // Create the tile bag.
            scrabbleBag = new ScrabbleBag();
            scrabbleContainer.append(scrabbleBag.init());
            
            // Create player rack(s).
            for(let i = 0; i < numberOfPlayers; i++) {
                let scrabbleRack = new ScrabbleRack(i);
                scrabbleRacks.push(scrabbleRack);
                scrabbleContainer.append(scrabbleRack.init());
            }
            
            // Create tiles and put them in the bag.
            for (let letter in TILES) {
                let value = TILES[letter]['value'];
                let count = TILES[letter]['count'];
                for(let i = 0; i < count; i++) {
                    let scrabbleTile = new ScrabbleTile(letter, value, 'tile-' + letter + i);
                    scrabbleTile.init();
                    scrabbleBag.addTile(scrabbleTile);
                }
            }
            
            // End turn button.
            let endTurnBtn = $('<input id="endTurnBtn" type="submit"></input>');
            endTurnBtn.button();
            endTurnBtn.click(function(e){
                let newWords = scrabbleBoard.getNewWords();
                let valid = validateWords(newWords);
                newWords = [{word:'abc', value:5}, {word:'def', value:1}];
                if(valid) {
                    let value = 0;
                    for(let i = 0; i < newWords.length; i++) {
                        value += newWords[i].value;
                    }
                    scrabbleScores.updateScore(currentPlayerId, value);
                }
                event.preventDefault();
            });
            scrabbleContainer.append(endTurnBtn);
            
        }
        function restart() {
            // Add ability to restart.
            // 1. Put tiles from board and player rack(s) back in bag.
            // 2. call start();
        }
        function start() {
            currentPlayerId = 0; // Could randomize starting player in the future.
            
            for(let i = 0; i < numberOfPlayers; i++) {
                for(let j = 0; j < 7; j++) {
                    let scrabbleTile = scrabbleBag.removeRandomTile();
                    if(scrabbleTile !== null) {
                        scrabbleRacks[i].addTile(scrabbleTile);
                    }
                }
            }
        }
        function validateWords() {
            
            return true;
        }
        
        return {
            init: init,
            start: start
        }
    })();
}

$(document).ready(function () {
    ScrabbleManager.init();
    ScrabbleManager.start();
});