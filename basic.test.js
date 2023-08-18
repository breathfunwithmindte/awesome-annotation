// index.test.js

const annotation = require("./lib/Annotation");

;(() => {
  
  const fileContent = annotation("/test/testone1.js", { cached: true, debug: false })

  console.table(fileContent.annotations)
  
  console.table(fileContent.getAnnos("UserController"));

  console.log(fileContent.exports.something, "@@")
  console.log(new fileContent.exports())

})()
