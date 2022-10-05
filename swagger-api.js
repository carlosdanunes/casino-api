const { generateApi } = require('swagger-typescript-api');
const path = require("path");
const fs = require("fs");

/* NOTE: all fields are optional expect one of `output`, `url`, `spec` */
generateApi({
  name: "Api.ts",
  input: __dirname + "/swagger.json",
  output: path.resolve(__dirname, '../', 'binobi-front'),
//   httpClientType: "axios", // or "fetch"
PrepareConfig: (currentConfiguration) => {},
  })
  .then(({ files, configuration }) => {
    files.forEach(({ content, name }) => {
      fs.writeFile(path, content);
    });
  })
  .catch(e => console.error(e))
