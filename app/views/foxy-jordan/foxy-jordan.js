var observableModule = require ("data/observable");
var  viewModule = require("ui/core/view");

function onLoaded (args) {
    var page = args.object;
    var foxy = new observableModule.Observable();
    
    var label = viewModule.getViewById(page, "foxyJava");

    var bindingObjects = {  

        sourceProperty: "Name",
        targetProperty: "text"   
     };
     label.bind(bindingObjects, foxy);

     foxy.set("Name", "foxy");
}


exports.onLoaded = onLoaded;