var observable = require("tns-core-modules/data/observable");
var observableArray = require("tns-core-modules/data/observable-array");
var frame = require("ui/frame");

function scrapbookPageModel() {
    var model = new observable.Observable();
        // year = "1988";
        // month = "10";
        // day = "19";
        model.genders = ["Female", "Male", "Other"];
        model.calcAge = function(year, month, day) {
            var date = new Date(year, month, day);
            var now = Date.now();
            var diff = Math.abs(now - date) / 1000 / 31536000;
            
            return diff.toFixed(1);
        };
    
    return model;
}

exports.onLoaded = function(args) {
    var page = args.object;
    var scrapbook;
    page.year = "1988";
    page.month = "10";
    page.day = "19";

    if(page.navigationContext != null) {
        scrapbook = page.navigationContext.model;
    }
    else {
        scrapbook = new observable.fromObject({
            pages: new observableArray.ObservableArray(new scrapbookPageModel())
        });
    }

    page.bindingContext = scrapbook;
};

exports.onItemTap = function(args) {
    var page = args.object;
    var scrapbook = page.bindingContext;

    frame.topmost().navigate({
        moduleName: "views/scrapbookUpdate-page/scrapbookUpdate-page",
        context: { model: scrapbook, index: args.index }
    });
};