
/*!
 * CSS - Evaluator - built-in functions
 * Copyright(c) 2010 LearnBoost <dev@learnboost.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var nodes = require('../../nodes')
  , utils = require('./utils');

/**
 * Convert the given `color` to an `HSLA` node,
 * or h,s,l,a to a `Color`.
 *
 * Examples:
 *
 *    hsla(10deg, 50%, 30%, 0.5)
 *    // => HSLA
 *
 *    hsla(#ffcc00)
 *    // => HSLA
 *
 * @param {Color|Unit} h
 * @param {Unit} s
 * @param {Unit} l
 * @param {Unit} a
 * @return {HSLA}
 * @api public
 */

exports.hsla = function(h,s,l,a){
  switch (arguments.length) {
    case 1:
      utils.assertType(h, nodes.Color);
      return h.hsl;
    default:
      utils.assertType(h, nodes.Unit);
      utils.assertType(s, nodes.Unit);
      utils.assertType(l, nodes.Unit);
      utils.assertType(a, nodes.Unit);
      return new nodes.HSLA(h.val,s.val,l.val,a.val);
  }
};

/**
 * Convert the given `color` to an `HSLA` node,
 * or h,s,l to a `Color`.
 *
 * Examples:
 *
 *    hsl(10, 50, 30)
 *    // => HSLA
 *
 *    hsl(#ffcc00)
 *    // => HSLA
 *
 * @param {Color|Unit} h
 * @param {Unit} s
 * @param {Unit} l
 * @return {HSLA}
 * @api public
 */

exports.hsl = function(h,s,l){
  if (arguments.length > 1) {
    return exports.hsla(h,s,l,new nodes.Unit(1));
  }
  utils.assertType(h, nodes.Color);
  return h.hsl;
};

/**
 * Return type of `node.`
 *
 * Examples:
 * 
 *    type(12)
 *    // => 'unit'
 *
 *    type(#fff)
 *    // => 'color'
 *
 * @param {Node} node
 * @return {String}
 * @api public
 */

exports.type = function(node){
  return new nodes.String(node.constructor.name.toLowerCase());
};

/**
 * Return the hue of the given `hsla`.
 *
 * Examples:
 *
 *    hue(hsl(50deg, 100%, 80%))
 *    // => 50deg
 *
 * @param {HSLA} hsla
 * @return {Unit}
 * @api public
 */

exports.hue = function(hsla){
  utils.assertType(hsla, nodes.HSLA);
  return new nodes.Unit(Math.round(hsla.h), 'deg');
};

/**
 * Return the saturation of the given `hsla`.
 *
 * Examples:
 *
 *    saturation(hsl(50deg, 100%, 80%))
 *    // => 100%
 *
 * @param {HSLA} hsla
 * @return {Unit}
 * @api public
 */

exports.saturation = function(hsla){
  utils.assertType(hsla, nodes.HSLA);
  return new nodes.Unit(Math.round(hsla.s), '%');
};

/**
 * Return the lightness of the given `hsla`.
 *
 * Examples:
 *
 *    lightness(hsl(50def, 100%, 80%))
 *    // => 80%
 *
 * @param {HSLA} hsla
 * @return {Unit}
 * @api public
 */

exports.lightness = function(hsla){
  utils.assertType(hsla, nodes.HSLA);
  return new nodes.Unit(Math.round(hsla.l), '%');
};

/**
 * Return the alpha component of the given `color`.
 *
 * Examples:
 *
 *   alpha(#fff)
 *   // => 1
 *
 *   alpha(rgba(0,0,0,0.3))
 *   // => 0.3
 *
 * @param {Color|HSLA} color
 * @return {Unit}
 * @api public
 */

exports.alpha = function(color){
  utils.assertColor(color);
  return new nodes.Unit(color.rgba.a);
};

/**
 * Return the red component of the given `color`.
 *
 * Examples:
 *
 *    red(#c00)
 *    // => 204
 *
 * @param {Color|HSLA} color
 * @return {Unit}
 * @api public
 */

exports.red = function(color){
  utils.assertColor(color);
  return new nodes.Unit(color.rgba.r);
};

/**
 * Return the green component of the given `color`.
 *
 * Examples:
 *
 *    green(#0c0)
 *    // => 204
 *
 * @param {Color|HSLA} color
 * @return {Unit}
 * @api public
 */

exports.green = function(color){
  utils.assertColor(color);
  return new nodes.Unit(color.rgba.g);
};

/**
 * Return the blue component of the given `color`.
 *
 * Examples:
 *
 *    blue(#00c)
 *    // => 204
 *
 * @param {Color|HSLA} color
 * @return {Unit}
 * @api public
 */

exports.blue = function(color){
  utils.assertColor(color);
  return new nodes.Unit(color.rgba.b);
};

/**
 * Return a `Color` from the r,g,b,a channels.
 *
 * Examples:
 *
 *    rgba(255,0,0,0.5)
 *    // => rgba(255,0,0,0.5)
 *
 *    rgba(255,0,0,1)
 *    // => #ff0000
 *
 *    rgba(#ffcc00, 0.5)
 *    // rgba(255,204,0,0.5)
 *
 * @param {Unit|Color|HSLA} r
 * @param {Unit} g
 * @param {Unit} b
 * @param {Unit} a
 * @return {Color}
 * @api public
 */

exports.rgba = function(r,g,b,a){
  switch (arguments.length) {
    case 1:
      utils.assertColor(r);
      var color = r.rgba;
      return new nodes.Color(
          color.r
        , color.g
        , color.b
        , color.a);
    case 2:
      utils.assertColor(r);
      var color = r.rgba;
      utils.assertType(g, nodes.Unit);
      return new nodes.Color(
          color.r
        , color.g
        , color.b
        , g.val);
    default:
      utils.assertType(r, nodes.Unit);
      utils.assertType(g, nodes.Unit);
      utils.assertType(b, nodes.Unit);
      utils.assertType(a, nodes.Unit);
      return new nodes.Color(
          r.val
        , g.val
        , b.val
        , a.val);
  }
};

/**
 * Return a `Color` from the r,g,b channels.
 *
 * Examples:
 *
 *    rgb(255,204,0)
 *    // => #ffcc00
 *
 *    rgb(#fff)
 *    // => #fff
 *
 * @param {Unit|Color|HSLA} r
 * @param {Unit} g
 * @param {Unit} b
 * @return {Color}
 * @api public
 */

exports.rgb = function(r,g,b){
  switch (arguments.length) {
    case 1:
      utils.assertColor(r);
      var color = r.rgba;
      return new nodes.Color(
          color.r
        , color.g
        , color.b
        , 1);
    default:
      return exports.rgba(r,g,b,new nodes.Unit(1));
  }
};