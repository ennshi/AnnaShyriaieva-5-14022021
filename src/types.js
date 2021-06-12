/**
 * @typedef {Object} Bear
 * @property {String}  _id  bear's ID
 * @property {Number}  price bear's price
 * @property {String} name bear's name
 * @property {String} description bear's description
 * @property {String} imageUrl bear's imageUrl
 * @property {String[]} colors bear's colors
 */

/**
 * @typedef {Object} ColorSelector
 * @property {setSelectedColorType}  setSelectedColor color setter
 * @property {stringFunctionNoParameters} getSelectedColor color getter
 */

/**
 * @typedef {Object} OrderSuccessData
 * @property {Number}  total total price
 * @property {String} orderId order id
 */

/**
 * @typedef {Object} OrderSuccessQueryData
 * @property {Number}  total total price
 * @property {String} id order id
 */

/**
 * @typedef {Object} BearInCart
 * @property {String} id bear's id
 * @property {String} name bear's name
 * @property {String} price bear's price
 * @property {String} color bear's color
 */

/**
 * @typedef {Object} CartItem
 * @property {BearInCart} item item in cart
 * @property {Number} amount number of items in cart
 */

/**
 * @typedef {Object} ItemPriceElement
 * @property {String} elId DOM element id
 * @property {Number} amount number of items in cart
 * @property {Number} price item price
 */

/**
 * @typedef {Object} DOMElementData
 * @property {String} tagName DOM element tag name
 * @property {String} className DOM element classes
 * @property {Object.<string, string>} attributes DOM element attributes
 */

/**
 * @typedef {Object} Contacts
 * @property {String} [firstName] user first name
 * @property {String} [lastName] user last name
 * @property {String} [address] user address
 * @property {String} [city] user city
 * @property {String} [email] user email
 */

/**
 * @typedef {Object} SendOrderResponse
 * @property {String} orderId order id
 * @property {Contacts} contacts user contact info
 * @property {String[]} productIds DOM element classes
 */

/**
 * Callback no parameters, returns void.
 * @callback voidFunctionNoParameters
 * @returns {void}
 */

/**
 * Callback to set selected color.
 * @callback setSelectedColorType
 * @param {Number} idx index of color
 * @returns {void}
 */

/**
 * Callback no parameters, returns string.
 * @callback stringFunctionNoParameters
 * @returns {String}
 */