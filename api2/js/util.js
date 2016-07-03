/**
* @author   Juan Carlos Saavedra <@jc_suscriptor>
*/


/**
 * 
 * 
 * @param {any} namespace
 * @returns
 */
var ns = function (namespace) {
    var nsparts = namespace.split(".");
    var parent = window;
  
 
    // loop through the parts and create a nested namespace if necessary
    for (var i = 0; i < nsparts.length; i++) {
        var partname = nsparts[i];
        // check if the current parent already has the namespace declared
        // if it isn't, then create it
        if (typeof parent[partname] === "undefined") {
            parent[partname] = {};
        }
        // get a reference to the deepest element in the hierarchy so far
        parent = parent[partname];
    }
    // the parent is now constructed with empty namespaces and can be used.
    // we return the outermost namespace
    return parent;
};

/**
 * 
 * 
 * @param {any} src
 * @returns
 */
var getFullPath = function (src) {
    //TODO: Mejorar la estructura de carpetas
    return src;
}; 

// TODO: Used for i18n string extraction
var i18n = { _: function (msg) { return msg; } };