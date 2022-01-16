const fs = require('fs-extra')
const path = require('path');

const walk = function (dir, filter, done) {
    let results = [];
    fs.readdir(dir, function (err, list) {
        if (err) return done(err);
        let pending = list.length;
        if (!pending) return done(null, results);
        list.forEach(function (file) {
            file = path.resolve(dir, file);
            fs.stat(file, function (err, stat) {
                if (stat && stat.isDirectory()) {
                    walk(file, filter, function (err, res) {
                        results = results.concat(res);
                        if (!--pending) done(null, results);
                    });
                } else {
                    if (filter(file)) {
                        results.push(file);
                    }
                    if (!--pending) done(null, results);
                }
            });
        });
    });
};

const REPO = './sample'
const filter = (file) => file.endsWith('.js')
const replace = (content) => {
    return content.replace(/^/, '// ')
}

function process() {
    walk(REPO, filter , (err, files) => {
        files.forEach((file) => {
            fs.readFile(file, 'utf-8')
            .then(content => replace(content))
            .then(replacedContent => fs.writeFile(file, replacedContent))
            .catch(err => {
                console.error(err)
            })
        })
    })
}

process()