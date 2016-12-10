/**
 * AUTHOR:  Sean Perrier
 * EMAIL:   sean_perrier@student.uml.edu
 * FILE:    /assignments/assignment9/js/ScrabbleDictionary.js
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
 *   Some code in ScrabbleDictionary.js was created while referencing:
 *   http://ejohn.org/blog/dictionary-lookups-in-javascript/
 */
 
if (typeof ScrabbleDictionary == 'undefined') {
    var ScrabbleDictionary = function() {
        var dictionary = {};
        
        function init() {
           // Get dictionary file.
            $.get('txt/dictionary.txt', function(txt) {
                
                // Split dictionary words into array.
                let words = txt.split("\n");
                
                // Store words in dictionary object.
                for(let i = 0; i < words.length; i++) {
                    dictionary[words[i]] = true;
                }
            }); 
        }
        
        function validateWord(aWord) {
            
            // If word is in dictionary, return true. Otherwise return false.
            return (dictionary[aWord.toLowerCase()]) ? true : false;
        }
        
        return {
            init: init,
            validateWord: validateWord
        }
    };
}