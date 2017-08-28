'use strict';

const fs = require('fs');

var ext, extensions = {};

function getExtensions(path, callback) {
    fs.readdir(path, function (err, files) {
        var filesLength = files.length;
        files.forEach(function (file) {
            var pathToFile = path + '/' + file;
            fs.stat(pathToFile, function (err, stat) {
                if (stat && stat.isDirectory()) {
                    getExtensions(pathToFile, function (parsed) {
                        Object.assign(extensions, parsed);
                        if (!--filesLength) {
                            callback(extensions);
                        }
                    });
                } else {
                    ext = file.split('.').pop();
                    extensions[ext] === undefined ? extensions[ext] = 1 : ++extensions[ext];
                    if (!--filesLength) {
                        callback(extensions)
                    }
                }
            })
        });
    });
}

getExtensions(process.argv[2], function (result) {
    console.log(result);
});
