'use strict';

var fs = require('fs');
/**
* Task methods.
* @namespace NoClass
*/


/**
 * Remove string of all class declarations excepct for proClasses array of class names.
 * @function classFromString
 * @param {string} contents
 * @param {array} proClasses
 */
var classFromString = function(contents, proClasses){
    
    var regexp = /class="([a-zA-Z0-9_-\s]*)"/g;
    contents = contents.toString();
    var extract = contents.matchAll(regexp);
    
    var removeClasses = [];

    if(extract){
    
        for(var i = 0; i < extract.length; i++){
            
            var fullString = extract[i][0];
            var classNames = extract[i][1];
            var classNamesArray = classNames.split(' ');
            var canRemove = true;
            
            for(var ii= 0; ii < classNamesArray.length; ii++){
                
                var nameCheck = classNamesArray[ii];
                
                for(var iii = 0; iii < proClasses.length; iii++){
                    
                    var proClassesName = proClasses[iii];
                    
                    if(proClassesName == nameCheck){
                        
                        canRemove = false;
                        
                    }
                }
            }
            
            if(canRemove){
                if(removeClasses.indexOf(fullString) == -1){
                    removeClasses.push(fullString);
                }
            }
        }
    }
    if(removeClasses.length > 0){
    
        for(i = 0; i < removeClasses.length; i++){

            var classToRemove = removeClasses[i];
            var regex = new RegExp(classToRemove, 'g');
            contents = contents.replace(regex, '');

        }

    }
        
    return contents;
    
}

/**
 * Remove all classes from a file except for class names in proClasses array.
 * @function classFromFile
 * @param {string} file
 * @param {array} proClasses
 */
var classFromFile = function(file, proClasses){
    
    var contents = fs.readFileSync(file, 'utf8');
    return classFromString(contents, proClasses);
    
}

String.prototype.matchAll = function(regexp) {
    var matches = [];
    this.replace(regexp, function() {
        var arr = ([]).slice.call(arguments, 0);
        var extras = arr.splice(-2);
        arr.index = extras[0];
        arr.input = extras[1];
        matches.push(arr);
  });
  return matches.length ? matches : null;
};

module.exports = {
  classFromFile: classFromFile,
  classFromString: classFromString
}