const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');

module.exports = {
  write(results, options, done) {
    const reportFilename = 'index.html';
    const reportFilePath = path.join(
      __dirname,
      '../../reports/e2e',
      reportFilename
    );
    // read the html template
    fs.readFile(path.join(__dirname, 'html-reporter.hbs'), (err, data) => {
      if (err) throw err;

      const template = data.toString();

      // merge the template with the test results data
      const html = handlebars.compile(template)({
        results,
        options,
        timestamp: new Date().toString(),
        browser: options.filename_prefix.split('_').join(' ')
      });

      // write the html to a file
      fs.writeFile(reportFilePath, html, err => {
        if (err) throw err;
        console.log(`Report generated: ${reportFilePath}`);
        done();
      });
    });
  }
};
