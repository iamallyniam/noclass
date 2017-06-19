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
    var classStrings = []; //object of all classes
    
    //match entire string for class names
    if(extract){
    
        for(var i = 0; i < extract.length; i++){
            
            var fullString = extract[i][0];
            var classNames = extract[i][1];
            var classNamesArray = classNames.split(' ');
            var safeClass = [];
            //used to replace old string with new
            var newClassObj = {
                "old" : fullString,
                "new" : 'class="'
            };
            
            //check all classes as an array
            for(var ii= 0; ii < classNamesArray.length; ii++){
                
                var nameCheck = classNamesArray[ii];
                var canRemove = true;
                
                //loop through protected class names, don't remove if matched
                for(var iii = 0; iii < proClasses.length; iii++){
                    
                    var proClassesName = proClasses[iii];
                    
                    if(proClassesName == nameCheck){
                        
                        //if a protected class, it won't be removed
                        safeClass.push(nameCheck);
                        break;
                        
                    }
                }
            }
            
            for(var ii = 0; ii < safeClass.length; ii++){
                newClassObj.new += safeClass[ii];
                if(ii < safeClass.length - 1){
                    newClassObj.new += " ";
                }
            }
            
            newClassObj.new += '"';
            classStrings.push(newClassObj);
        }
    }
    
    for(var i = 0; i < classStrings.length; i++){
        
        var classObj = classStrings[i];
        var replaceStr = classObj.new;
        //don't add an empty class
        if(replaceStr == 'class=""'){
            replaceStr = '';
        }
        contents = contents.replace(classObj.old, replaceStr);
        
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