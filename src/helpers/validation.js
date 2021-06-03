import {formFields} from './constants';

/**
 * Validate form values
 * @param {Contacts} values values object
 * @returns {Contacts | null} errors
 */

export function validateValues(values) {
  const errors = {};

  for(const val in values) {
    const field = formFields.find(f => f.fieldName === val);
    const value = values[val];

    if(!values.hasOwnProperty(val) || !field || !field.validate) return;

    const fieldLabel = formFields.find(f => f.fieldName === val).label || '';
    const errorsVal = [];

    for(const validator in field.validate) {
      switch (validator) {
        case 'required':
          emptyValue(value) && errorsVal.push(`${fieldLabel} est obligatoire`);
          break;
        case 'min':
          minLengthValue(value, field.validate.min) && errorsVal.push(`Doit contenir au moins ${field.validate.min} charactères`);
          break;
        case 'max':
          maxLengthValue(value, field.validate.max) && errorsVal.push(`Ne doit pas contenir plus de ${field.validate.max} charactères`);
          break;
        case 'pattern':
          patternValidation(value, field.validate.pattern) && errorsVal.push('La valeur n\'est pas correcte');
          break;
      }
    }

    if(errorsVal.length) {
      errors[val] = errorsVal;
    }

  }

  return Object.keys(errors).length ? errors : null;
}

/**
 * Check empty value
 * @param {String | undefined} val text value
 * @returns {Boolean} is not valid
 */

function emptyValue (val) {
  return (val && typeof val === 'string') ? !val.trim() : true;
}

/**
 * Check string minimal length
 * @param {String | undefined} val text value
 * @param {Number} minNumChar minimum number of chars
 * @returns {Boolean} is not valid
 */

function minLengthValue (val, minNumChar) {
  return (val && typeof val === 'string') ? val.trim().length < minNumChar : true;
}

/**
 * Check string maximum length
 * @param {String | undefined} val text value
 * @param {Number} maxNumChar maximum number of chars
 * @returns {Boolean} is not valid
 */

function maxLengthValue (val, maxNumChar) {
  return (val && typeof val === 'string') ? val.trim().length > maxNumChar : true;
}

/**
 * Check string pattern match
 * @param {String | undefined} val text value
 * @param {RegExp} pattern regex to check
 * @returns {Boolean} is not valid
 */

function patternValidation (val, pattern) {
  return (val && typeof val === 'string') ? !pattern.test(val.trim()) : true;
}