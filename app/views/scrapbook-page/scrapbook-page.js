var observable = require("data/observable");

exports.onLoaded = function(args) {
    var page = args.object;
    var scrapbook = new observable.fromObject({
        genders: ["Female", "Male", "Other"],
        gender: 2,
        title: "hello",
        date: "1988/10/19",
        calcAge: function(birthDate) {
            var now = Date.now();
            var diff = Math.abs(now - birthDate)/ 1000 / 31536000;
            return diff.toFixed(0);
        }
      
    });

    page.bindingContext = scrapbook;
}

exports.onTap = function(args) {
    var page = args.object; 
    var scrapbook = page.bindingContext; 
    console.log("You have made " + scrapbook.title); 
    console.log("Age: " + scrapbook.calcAge(scrapbook.date)); 
    console.log("Gender selected:" + (scrapbook.genders[scrapbook.gender]));
}   