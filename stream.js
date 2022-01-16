const fs = require('fs')
const klaw = require('klaw')

function process() {
    klaw('../module-federation-examples')
    .pipe((...p) => {
        console.log(p)
        return p
    })
    .on('end', (...result) => {
        console.log(result)
    })
}



process()