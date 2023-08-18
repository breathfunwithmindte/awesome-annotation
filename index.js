const AnnotationImport = require("./lib/types/AnnotationImport");

/**
 * @primaryFunction
 * @param {String} filePath required - will throw an error if file not exist; FilePath always starts from root directory;
 * @param {import("./lib/types/AnnotationOption").AnnotationOptionProps} options
 * @returns {AnnotationImport}
 * 
 */
const Annotation = require("./lib/Annotation");


module.exports = Annotation;