import {formFields, validators} from "../helpers/constants";
import {createElement} from "../helpers/domHelper";

export function renderForm() {
  const form = createElement({tagName: 'form', class: 'form__container', attributes: {id: 'form'}});
  const fieldsList = createElement({tagName: 'div', className: 'form__inner-container', attributes: {id: 'formFields'}});
  fieldsList.innerHTML = renderFields();
  const submitBtn = createElement({tagName: 'button', className: 'form__submit-btn'});
  submitBtn.innerText = 'Commander';
  submitBtn.addEventListener('click', () => {
    const values = formFields.reduce((acc, {fieldName}) => {
      acc[fieldName] = document.getElementById(fieldName).value;
      return acc;
    }, {});
    const errors = validateValues(values);
    if(errors) {
      updateFormFields(values, errors);
    } else {
      //send data
      console.log('Sent', values)
    }
  })
  form.append(fieldsList, submitBtn);
  return form;
}

function renderFields(values, errors) {
  const fields = formFields.map((f) => {
    const getError = () => {
      const fName = f.fieldName;
      if(!errors || !errors[fName]) return '';
      return `<span class="form__error">${errors[fName][0]}</span>`;
    };
    return (
      `<div class="form__field-container">
        <label>${f.label}</label>
        <input type="${f.type}" value="${values && values[f.fieldName] || ''}" id="${f.fieldName}"/>
        ${getError()}
      </div>`
    );
  }).join('');
  return fields;
}

function validateValues(values) {
  const errors = {};
  for(let val in values) {
    if(!values.hasOwnProperty(val) || !validators[val]) return;
    const fieldLabel = formFields.find(f => f.fieldName === val).label || '';
    const errorsVal = [];
    validators[val].forEach(validator => {
      switch (validator) {
        case 'required':
          emptyValue(values[val]) && errorsVal.push(`${fieldLabel} est obligatoire`);
          break;
      }
    });
    if(errorsVal.length) {
      errors[val] = errorsVal;
    }
  }
  if(Object.keys(errors).length) {
    return errors;
  }
  return null;
}

function emptyValue (val) {
  console.log(val)
  if(typeof val === 'string') return !val.trim();
}

export function updateFormFields(values, errors) {
  const formFields = document.getElementById('formFields');
  formFields.innerHTML = renderFields(values, errors);
}

export function hideForm() {
  const form = document.getElementById('form');
  form.style.display = 'none';
}