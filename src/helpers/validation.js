import {formFields} from './constants';

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

function emptyValue (val) {
  return (val && typeof val === 'string') ? !val.trim() : true;
}

function minLengthValue (val, minNumChar) {
  return (val && typeof val === 'string') ? val.trim().length < minNumChar : true;
}

function maxLengthValue (val, maxNumChar) {
  return (val && typeof val === 'string') ? val.trim().length > maxNumChar : true;
}

function patternValidation (val, pattern) {
  return (val && typeof val === 'string') ? !pattern.test(val.trim()) : true;
}