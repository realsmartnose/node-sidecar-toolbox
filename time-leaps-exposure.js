const glob = require("glob");
const fs = require('fs');
const path = require('path');


if (process.argv.length <= 6) {
    console.log("Usage: node " + path.basename(__filename) + " path first count startExposure endExposure");
    console.log("  sidecarPath: The folder where the xmp-files are stored, can be relative or absolute");
    console.log("  first: The first item to use, it's the n-th xmp in the folder");
    console.log("  count: How many items should be used for this operation");
    console.log("  startExposure: The start Exposure, this will be used for the first item");
    console.log("  endExposure: The end exposure, this is be the theoretically end exposure, but will not be used, the exposure of the last item will be: endExposure - ((endExposure - startExposure) / count)");
    process.exit(-1);
}

var sidecarPath = process.argv[2];
var first = parseInt(process.argv[3]);
var count = parseInt(process.argv[4]);
var startExp = parseInt(process.argv[5]);
var endExp = parseInt(process.argv[6]);

glob(path.join(sidecarPath, "*.xmp"), {}, function (er, files) {
    console.log("Processing " + sidecarPath);

    var step = (endExp - startExp) / count;
    var i = 0;
    var processedCount = 0;

    files.forEach(fileName => {
        if (i >= first && processedCount < count) {
            var fileContent = fs.readFileSync(fileName, 'utf8');
            var newExpo = (startExp + (processedCount * step)).toFixed(2);
            var result = fileContent.replace(/crs\:Exposure2012\=\"([0-9\.\+]*)\"/g, 'crs:Exposure2012="'+(newExpo < 0 ? "":"+")+newExpo+'"');
    
            console.log(fileName + " - " + newExpo);
    
            fs.writeFile(fileName, result, 'utf8', function (err) {
                if (err) return console.log(err);
            });
            processedCount++;
        }
        i++;
    });
})
