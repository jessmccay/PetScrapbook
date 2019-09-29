var observable = require("tns-core-modules/data/observable");
var observableArray = require("tns-core-modules/data/observable-array");
var frame = require("ui/frame");
var fileSystemService = require("~/data/fileSystemService")

function scrapbookPageModel(id) {
    var model = new observable.Observable();
    model.id = id;  
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
    var scrapbook = new observable.fromObject({
        pages: new observableArray.ObservableArray()
    });
    var pages = fileSystemService.fileSystemService.getPages();
    if(pages.length !== 0) {
        pages.array.forEach(item => {
        var model = new scrapbookPageModel(item.id);

        model.title = item.title;
        model.gender = item.gender;
        model.year = item.year;
        model.month = item.month;
        model.day = item.day;

        scrapbook.pages.push(model);
    });
    }
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

exports.onAddTap = function(args) { 
    var page = args.object;
    var scrapbook = page.bindingContext;
    scrapbook.pages.push(new scrapbookPageModel()); 
    
    frame.topmost().navigate({
        moduleName: "views/scrapbookUpdate-page/scrapbookUpdate-page",
        context: { model: scrapbook, index: scrapbook.pages.length - 1 } 
    });
};
exports.onItemTap = function(args) {
    var page = args.object;
    var scrapbook = page.bindingContext;

    frame.topmost().navigate({
        moduleName: "views/scrapbookUpdate-page/scrapbookUpdate-page",
        context: { model: scrapbook, index: args.index }
    });
};