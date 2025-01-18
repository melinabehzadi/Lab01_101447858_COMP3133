const fs = require('fs');
const csv = require('csv-parser');

//  deletes existing files if they exist
['canada.txt', 'usa.txt'].forEach((file) => {
    if (fs.existsSync(file)) {
        fs.unlinkSync(file);
        console.log(`${file} deleted.`);
    }
});

// creates write streams for output files
const writeCanada = fs.createWriteStream('canada.txt');
const writeUSA = fs.createWriteStream('usa.txt');

// writes headers to the output files
writeCanada.write('country,year,population\n');
writeUSA.write('country,year,population\n');

// reads and filters the CSV file_
fs.createReadStream('input_countries.csv')
    .pipe(csv())
    .on('data', (row) => {
        if (row.country.toLowerCase() === 'canada') {
            writeCanada.write(`${row.country},${row.year},${row.population}\n`);
        } else if (row.country.toLowerCase() === 'united states') {
            writeUSA.write(`${row.country},${row.year},${row.population}\n`);
        }
    })
    .on('end', () => {
        console.log('Processing complete. Data written to canada.txt and usa.txt.');
    });
