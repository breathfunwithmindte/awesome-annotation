/**
 * @name PerfeAnnotation
 * @namespace PerfeAnnotation::types::AnnotationOption
 * @license MIT
 * @copyright 2023 - perfect-evolution
 * @author Mike Karypidis
 * @link https://github.com
 * @file AnnotationOption.js
 * @description Defines the options that can be passed to the `Annotation` function to control its behavior.
 * 
 * ==================================
 * 
 * Defines the options that can be passed to the `Annotation` function to control its behavior.
 * 
 * ==================================
 * 
 */

/**
 * @typedef {Object} AnnotationOptionProps
 * @property {Boolean} cached
 * @property {Boolean} debug
 */

/** @Type */
module.exports = class AnnotationOption
{

  /** @type {Boolean} cached */
  cached = true;

  /** @type {Boolean} debug */
  debug = false;

  /**
   * 
   * @param {AnnotationOptionProps} props 
   */
  constructor(props) {
    this.cached = props.cached;
    this.debug = props.debug;
  }
  

}