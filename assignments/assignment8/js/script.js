/**
 * AUTHOR:  Sean Perrier
 * EMAIL:   sean_perrier@student.uml.edu
 * FILE:    /assignments/assignment8/js/script.js
 * 
 * DATE CREATED:  November 01, 2016 2:00 PM
 * DATE MODIFIED: November 22, 2016 5:30 PM
 * 
 * AFFILIATION:
 *   Author is an undergraduate at UMass Lowell majoring in Computer
 *   Science. File was created for UMass Lowell's 'COMP 4610 GUI 
 *   Programming I' course.
 *
 * FILE DESCRIPTION:
 *   Assignment #8: Using the jQuery UI Slider and Tab Widgets
 *   
 *   This assignment is an extension of Assignment #6 and Assignment #7.
 *   This assignment required the implementation of jQuery UI sliders and
 *   tabs, as well as implementation of dynamic table updating.
 *   
 *   This file is the javascript of a web page. The web page
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


if (typeof FormHandler == 'undefined') { // Make sure namespace isn't used.
    
    /**
     * FormHandler namespace/module. Contains functions that perform specific
     * tasks for this specific HTML web page. These are not general purpose
     * functions.
     *
     * @namespace {object} FormHandler
     */
    
    var FormHandler = (function() {
        
        // Private variables.
        var tabs = $('#tableTabs').tabs();
        var tabHandles = tabs.find('ul');
        var tabCount = 0;
        
        
        /**
         * Public function that initalizes the web page's form validation.
         * Uses the jQuery Validation Plugin to validate form data upon
         * detection of plugin-defined events. When data is valid, it calls
         * createMultTable() and appendReplaceHtmlElement() to generate
         * a multiplication table.
         *
         * @constructor
         * @memberof FormHandler
         */
        var init = function() {
            
            // Add a method to the jQuery Validation Plugin called "compareTo".
            // params[0] = name of input being compared to.
            // params[1] = 'multiplier' or 'multiplicand'.
            // params[2] = true to do <= comparison, false to do >= comparison.
            jQuery.validator.addMethod(
                'compareTo',function(value, element, params) {
                    
                var num1 = parseInt(value);
                var num2 = parseInt($('input[name="' + params[0] + '"]').val());
                
                // If num1 or num2 are NaN, they weren't parsable numbers.
                if(isNaN(num1) || isNaN(num2)) return true;
                
                if(params[2]) {
                    return num1 <= num2;
                } else {
                    return num1 >= num2;
                }
            },'Maximum {1} value must be >= minimum {1} value.'); // Error msg.
            
            
            // Defines validation rules 
            $('form').validate({
                
                // Define restrictions on form inputs.
                rules: {
                    multiplierMin: {
                        required: true, // Can't be empty.
                        number:   true, // Must be a number.
                        step:     1,     // Can't be a decimal.
                        compareTo:      // Must be <= multiplierMax.
                            ['multiplierMax', 'multiplier', true]
                    },
                    multiplierMax: {
                        required: true,
                        number:   true,
                        step:     1,
                        compareTo:      // Must be >= multiplierMin.
                            ['multiplierMin', 'multiplier', false]
                    },
                    multiplicandMin: {
                        required: true,
                        number:   true,
                        step:     1,
                        compareTo:      // Must be <= multiplicandMax.
                            ['multiplicandMax', 'multiplicand', true]
                    },
                    multiplicandMax: {
                        required: true,
                        number:   true,
                        step:     1,
                        compareTo:      // Must be >= multiplicandMin.
                            ['multiplicandMin', 'multiplicand', false]
                    }
                },
                
                // Change where errors are shown on the page.
                showErrors: function(error, errorMap) {
                    // Let plugin do its default loading of errors.
                    this.defaultShowErrors();
                    
                    var isMaxError = false;
                    
                    // Iterate over the messages to show.
                    errorMap.forEach(function(error) {
                        
                        if(error.method === 'compareTo') {
                            
                            // If the error is a compareTo error,
                            // move the error to a shared error location.
                            isMaxError = true;
                            $('#' + error.element.name + '-error').empty();
                            var type = error.element.name.slice(0, -3);
                            $('#' + type + 'Error').html(error.message);
                            $('#' + type + 'Error').removeClass('hidden');
                        }
                    });
                    
                    if(errorMap.length === 0 || !isMaxError ) {
                        
                        // If the error no longer exists, remove
                        // the error from the shared error location.
                        this.currentElements.each(function(index, element) {
                            var type = element.name.slice(0, -3);
                            $('#' + type + 'Error').empty();
                            $('#' + type + 'Error').addClass('hidden');
                        });
                    }
                },
                
                // Error messages for all non-custom form restrictions.
                messages: {
                    multiplierMin: {
                        required: 'Value cannot be empty.',
                        number: 'Value must be an integer.',
                        step: 'Decimals not allowed. Value must be an integer.'
                    },
                    multiplierMax: {
                        required: 'Value cannot be empty.',
                        number: 'Value must be an integer.',
                        step: 'Decimals not allowed. Value must be an integer.'
                    },
                    multiplicandMin: {
                        required: 'Value cannot be empty.',
                        number: 'Value must be an integer.',
                        step: 'Decimals not allowed. Value must be an integer.'
                    },
                    multiplicandMax: {
                        required: 'Value cannot be empty.',
                        number: 'Value must be an integer.',
                        step: 'Decimals not allowed. Value must be an integer.'
                    }
                },
                
                // If validation passes, create the multiplication table.
                submitHandler: function(form, event) {
                    event.preventDefault();  // Don't submit the form.
                    createTab(form);
                }
                
            });
            
            $('.slider').slider({
                value: -100,
                min: -100,
                max: 100,
                slide: function(event, ui) {
                    $(this).siblings('input').val(ui.value);
                    $(this).siblings('input').valid();
                },
                change: function(event, ui) {
                    var form = $(this).closest("form")[0];
                    var dynamic = form.elements['dynamicTab'].checked;
                    if( dynamic && $(form).valid() ) {
                        updateActiveTab(form);
                    }
                }
            });
            
            $('input[type="number"]').on('input', function(event) {
                $(this).siblings('.slider').slider('value', $(this).val());
                var form = $(this).closest("form")[0];
                var dynamic = form.elements['dynamicTab'].checked;
                if( dynamic && $(form).valid() ) {
                    updateActiveTab(form);
                }
            });
            
        };
        
        tabs.on( 'click', '.tabClose', function() {
            
            //Get the tab handle to remove
            var li = $(this).closest('li');
            var index = li.index();
            var activeIndex = tabs.tabs('option', 'active');
            //Use the tab handles href as a selector to remove content
            $(li.find('a').attr('href')).remove();
            //remove the table handle
            li.remove();
            tabs.tabs('refresh');
            var remaining = tabHandles.find('li').length;
            if( remaining === 0 ) {
                //Hide the tab area since it will be empty
                toggleTabVisibility(false);
            } else if( activeIndex === index ){
                //If this was the currently focused tab
                //Select the item that becomes the current index
                //unless that index was the last
                if(remaining <= index ) {
                    index = remaining-1;
                }
                tabs.tabs('option', 'active', index);
            }
        });
        
        $('#removeAllTabs').on( 'click', function() {
            tabHandles.empty();
            tabs.find(":not(:first-child)").remove();
            tabs.tabs('refresh');
            toggleTabVisibility(false);
        });
        
        $('#removeTabsRight').on( 'click', function() {
            var activeIndex = tabs.tabs('option', 'active');
            var numTabs = tabHandles.find('li').length;
            if( activeIndex == numTabs-1 ) {
                alert('No tabs to the right of the active tab to remove.');
            } else {
                removeTabsToSide(activeIndex, true);
            }
        });
        
        $('#removeTabsLeft').on( 'click', function() {
            var activeIndex = tabs.tabs('option', 'active');
            if( activeIndex == 0 ) {
                alert('No tabs to the left of the active tab to remove.');
            } else {
                removeTabsToSide(activeIndex, false);
            }
        });
        
        
        var removeTabsToSide = function(activeIndex, toRight) {
            var tabHandlesList = tabHandles.find('li');
            var end = activeIndex;
            var start = 0;
            if( toRight ) {
                end = tabHandlesList.length;
                start = activeIndex+1;
            }
            for( var i = start; i < end; i++ ) {
                var li = tabHandlesList.eq(i);
                
                //Use the tab handles href as a selector to remove content
                $(li.find('a').attr('href')).remove();
                
                //remove the table handle
                li.remove();
            }
            tabs.tabs('refresh');
        }
        
        var toggleTabVisibility = function(show) {
            if( show ) {
                tabs.removeClass('hidden');
                $('#tabButtons').removeClass('hidden');
            } else {
                tabs.addClass('hidden');
                $('#tabButtons').addClass('hidden');
            }
        }
        
        var addTableDataToTab = function(form, tabTitleHolder, tabContentHolder) {
            var multiplierMin = form.elements['multiplierMin'].value;
            var multiplierMax = form.elements['multiplierMax'].value;
            var multiplicandMin = form.elements['multiplicandMin'].value;
            var multiplicandMax = form.elements['multiplicandMax'].value;
            
            //Build the tab title
            var tabTitleText =
                    '(' + multiplierMin +
                    ') to (' + multiplierMax +
                    ') by (' + multiplicandMin +
                    ') to (' + multiplicandMax + ')';
            
            tabTitleHolder.innerHTML = tabTitleText;
            
            //Add the contents to the content holder
            var table = createMultTable( multiplierMin, multiplierMax,
                    multiplicandMin, multiplicandMax);
            $(tabContentHolder).empty();
            appendReplaceHtmlElement(table, tabContentHolder);
        }
        
        var updateActiveTab = function(form){
            var activeTab = tabs.tabs('option', 'active');
            if( activeTab === false ) {
                createTab(form);
            } else {
                var tabHandle = tabHandles.find('li').eq(activeTab);
                var tabTitleHolder = tabHandle.find('a');
                var tabContentHolder = $(tabTitleHolder.attr('href')); 
                addTableDataToTab(form, tabTitleHolder[0], tabContentHolder[0]);
                tabs.tabs('refresh');
            }
            
        }
        
        var createTab = function(form) {
            if(!tabs.is(':visible')) {
                toggleTabVisibility(true);
            }
            
            //Each tab needs a unique id
            var tabID = "tab-" + tabCount;
            tabCount++;
            
            //Add the tab handle
            var li = document.createElement('li');
            li.id = "handle-" + tabID;
            var a = document.createElement('a');
            a.href = "#" + tabID;
            li.appendChild(a);
            
            //Add a close button
            var div = document.createElement('div');
            div.className = "tabClose";
            div.appendChild(document.createTextNode('x'));
            li.appendChild(div);
            tabHandles.append(li);
            
            //Add the tab content holder
            var div = document.createElement('div');
            div.id = tabID;
            tabs.append(div);
            
            //Add the table title and table to the tab
            addTableDataToTab(form, a, div);
            
            tabs.tabs('refresh');
            
            //Select the new tab
            var index = tabHandles.find('li').length-1;
            tabs.tabs("option", "active", index);
        };
        
        return {
            init: init // Make init function publicly accessible.
        };
    })();

    // When DOM has loaded, initialize DOM-dependent javascript.
    document.addEventListener('DOMContentLoaded', FormHandler.init);
};