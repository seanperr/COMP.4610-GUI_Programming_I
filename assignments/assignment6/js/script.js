/**
 * AUTHOR:  Sean Perrier
 * EMAIL:   sean_perrier@student.uml.edu
 * FILE:    /assignments/assignment6/js/script.js
 *
 * DATE CREATED:  November 01, 2016 2:00 PM
 * DATE MODIFIED: November 03, 2016 4:00 PM
 *  
 * AFFILIATION:
 *   Author is an undergraduate at UMass Lowell majoring in Computer
 *   Science. File was created for UMass Lowell's 'COMP 4610 GUI 
 *   Programming I' course.
 *
 * FILE DESCRIPTION:
 *   Assignment #6: Creating an Interactive Dynamic Table
 *
 *   This file is the javascript of a simple web page. The web page
 *   uses javascript to create and display a multiplication table.
 *   Multiplier and multiplicand values are provided by the user via an
 *   HTML form, and the page is styled using CSS.
 *
 * COPYRIGHT:
 *   Copyright (c) 2016 by Sean M. Perrier. All rights reserved.
 */
 
 
 /**
 * General purpose function that creates a HTML Table element, populates
 * it with multiplication values, and returns the new HTML Table element.
 *
 * @param {number} multiplierMinVal   - integer start of multiplier range.
 * @param {number} multiplierMaxVal   - integer end of multiplier range.
 * @param {number} multiplicandMinVal - integer start of multiplicand range.
 * @param {number} multiplicandMaxVal - integer end of multiplicand range.
 *
 * @return {HTMLTableElement} - HTML multiplication table.
 */
function createMultTable(multiplierMinVal,   multiplierMaxVal,
                         multiplicandMinVal, multiplicandMaxVal) {
                             
    var table = document.createElement('table');
    table.id = 'table';
    var firstRow = true;
    var firstCol = true;
    
    for(var row = multiplicandMinVal - 1; row <= multiplicandMaxVal; row++) {
        var tableRow = document.createElement('tr'); // Create the rows.
        
        for(var col = multiplierMinVal - 1; col <= multiplierMaxVal; col++) {
            var cell;
            var cellText;
            if(firstRow) {
                cell = document.createElement('th');
                if(!firstCol) {
                    
                    // If it's the first row and isn't the first column,
                    // put multiplier in a <th>.
                    cellText = document.createTextNode(col);
                    cell.appendChild(cellText);
                }
            } else {
                if(firstCol) {
                    
                    // If it's not the first row and is the first column,
                    // put the multiplicand in a <th>.
                    cell = document.createElement('th');
                    cellText = document.createTextNode(row);
                    cell.appendChild(cellText);
                    
                } else {
                    
                    // If it's not the first row and isn't the first column,
                    // put multiplier * multiplicand in a <td>.
                    cell = document.createElement('td');
                    cellText = document.createTextNode(row * col);
                    cell.appendChild(cellText);
                }
            }
            tableRow.appendChild(cell); // Add cell to row.
            firstCol = false;
        }
        table.appendChild(tableRow); // Add row to table.
        firstRow = false;
        firstCol = true;
    }
    return table;
}

 /**
 * General purpose function that appends a given HTML element to a given parent
 * node as the parent node's child. Or, if the parent node already has a child
 * HTML element with the same ID as the given HTML element, the child HTML
 * element is replaced with the HTML element. 
 *
 * @param {HTMLElement} newHtmlElement - Element to append into parentNode.
 * @param {Node} parentNode - Node to append newHtmlElement into.
 *
 */
function appendReplaceHtmlElement(newHtmlElement, parentNode) {
    var oldHtmlElement;
    if((oldHtmlElement = document.getElementById(newHtmlElement.id)) &&
       oldHtmlElement.parentNode === parentNode) {
           
        // If DOM already has an HTML element with newHtmlElement's ID,
        // and that existing element has the same parent, replace it.
        parentNode.replaceChild(newHtmlElement, oldHtmlElement);
    } else {
        parentNode.appendChild(newHtmlElement);
    }
}

if (typeof FormHandler == "undefined") { // Make sure namespace isn't used.

    /**
     * FormHandler namespace/module. Contains functions that perform specific
     * tasks for a specific HTML page. These are not general purpose functions.
     *
     * @namespace {object} FormHandler
     */
    var FormHandler = (function() {
        var form;
        var minError = 'Min value must be <= to maximum value.';
        var maxError = 'Max value must be >= to minimum value.';
        
        /**
         * Initializes event listeners for an HTML form. Entering data into the
         * form triggers form validation, and submitting the form triggers
         * table creation. Calls createMultTable(), appendReplaceNode(), and 
         * FormHandler.validation().
         *
         * @constructor
         * @memberof FormHandler
         */
        var init = function() {
            form = document.getElementById('form');
            
            form.addEventListener('submit', function(e) {
                e.preventDefault();    // Prevent form submission.
                var table = createMultTable(
                    form.elements['multiplierMin'].value,
                    form.elements['multiplierMax'].value,
                    form.elements['multiplicandMin'].value,
                    form.elements['multiplicandMax'].value);
                appendReplaceNode(table, form);
            });
            
            for (var i = 0; i < form.elements.length; i++) {
                if(form.elements[i].type !== 'number') continue;
                
                // Add listener to all form inputs with type='number'.
                form.elements[i].addEventListener('input', validation);
            }
        }
       
        /**
         * Checks to make sure user-entered form data is valid. Most error
         * messages are generated automatically by HTML5's built-in constraint
         * validation, but this function adds additional custom constraints.         
         *
         * @memberof FormHandler
         */
        var validation = function(){
            var min, max;
            
            if(this.name === 'multiplierMin' ||
                this.name === 'multiplierMax') {
                
                min = form.elements['multiplierMin'];
                max = form.elements['multiplierMax'];
                
            } else if(this.name === 'multiplicandMin' ||
                this.name === 'multiplicandMax') {
                
                min = form.elements['multiplicandMin'];
                max = form.elements['multiplicandMax'];
            }
            if(min.length !== 0 && max.length !== 0 &&
               parseInt(min.value, 10) > parseInt(max.value, 10)) {
                
                // If min > max and both have a value, add custom error.
                min.setCustomValidity(minError);
                max.setCustomValidity(maxError);
            } else {
                
                // If min < max or at least one doesn't have a value,
                // erase custom errors.
                min.setCustomValidity('');
                max.setCustomValidity('');
            }
        }
        
        return {
            init: init // Make init function public.
        };
    })();

    // When DOM has loaded, initialize the DOM-dependent event listeners.
    document.addEventListener('DOMContentLoaded', FormHandler.init);
};