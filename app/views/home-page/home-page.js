var observable = require("data/observable");

function onLoaded(args){
    var page = args.object;
    var home = new observable.fromObject({
        header: "Pet Scrapbook",
        footer: "Brosteins ©2016"
    });
    page.bindingContext = home;
};

exports.onLoaded = onLoaded;