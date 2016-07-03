
window.keywords = {
    whitelist: ["rectangulo", "circulo", "elipse", "cuadrado"]
};



//trigger extension
var langTools = ace.require("ace/ext/language_tools");

var editor = ace.edit("editor");
editor.setTheme("ace/theme/monokai");
editor.getSession().setMode("ace/mode/javascript");
// enable autocompletion and snippets
editor.setOptions({
    enableBasicAutocompletion: true,
    enableSnippets: true,
    enableLiveAutocompletion: false
});

// Custom
var FooCompleter = {
    getCompletions: function (editor, session, pos, prefix, callback) {
        if (prefix.length === 0) {
            callback(null, []);
            return;
        }

        var token = session.getTokenAt(pos.row, pos.column);
        if (!token)
            return [];

        var completions = [];

        window.keywords.whitelist.forEach((function (word) {

            var f = word;
            console.log(word);
            
            // Only return a result if it's a prefix.
            var funcName = f.split("(")[0];
            if (funcName.indexOf(prefix) === -1) {
                return;
            }

            completions.push({
                // name can be anything unique
                name: f + "-name",
                // value is what's used for showing/autocompleting
                value: funcName,
                //Description
                //description: "Description of word",
                docHTML:  "Description of word",
                // We just rate everything the same for now. There's
                // some basic internal matching based on keystrokes.
                score: 299,
                // The type to display next to the autosuggest
                // This is a human readable short descriptive name
                // such as: pjs function.
                meta: 'function'
            });

            console.log(funcName);

        }).bind(this));

        callback(null, completions);
    }
}

//Add Custom Completer
langTools.addCompleter(FooCompleter);
