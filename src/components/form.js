import {formFields, PAGES} from "../helpers/constants";
import {createElement} from "../helpers/domHelper";
import {validateValues} from "../helpers/validation";
import {router} from "../router/router";
import {cartService} from "../services/cartService";
import {orderService} from "../services/orderService";

/**
 * Render the form
 * @returns {HTMLElement} form
 */
export function renderForm() {
  const form = createElement({tagName: 'div', className: 'form__container', attributes: {id: 'form'}});
  const fieldsList = createElement({tagName: 'div', className: 'form__inner-container', attributes: {id: 'formFields'}});
  fieldsList.innerHTML = renderFields();
  const submitBtnContainer = createElement({tagName: 'div', className: 'form__btn-container'});
  const submitBtn = createElement({tagName: 'button', className: 'btn--basic'});
  submitBtn.innerText = 'Commander';
  submitBtn.addEventListener('click', sendFormValues);
  submitBtnContainer.append(submitBtn);
  form.append(fieldsList, submitBtnContainer);
  return form;
}

/**
 * Send the form values to the server
 * @returns {void}
 */
function sendFormValues() {
  const values = formFields.reduce((acc, {fieldName}) => {
    acc[fieldName] = document.getElementById(fieldName).value;
    return acc;
  }, {});
  const errors = validateValues(values);
  if(errors) {
    updateFormFields(values, errors);
  } else {
    orderService.sendOrder(values)
    .then((res) => {
      const total = cartService.getTotalPrice();
      cartService.clearCart();
      router.navigate(`${PAGES.ORDER_SUCCESS}?total=${total}&id=${res.orderId}`);
    })
    .catch(e => console.log(e));
  }
}

/**
 * Render the form fields
 * @param {Contacts} [values]
 * @param {Contacts} [errors]
 * @returns {String} fields HTML string
 */
function renderFields(values, errors) {
  const fields = formFields.map((f) => {
    const getError = () => {
      const fName = f.fieldName;
      if(!errors || !errors[fName]) return '';
      return `<span class="form__error">${errors[fName][0]}</span>`;
    };
    return (
      `<div class="form__field-container">
        <div class="form__field">
          <label>${f.label}</label>
          <input type="${f.type}" value="${values && values[f.fieldName] || ''}" id="${f.fieldName}"/>
        </div>
        ${getError()}
      </div>`
    );
  }).join('');
  return fields;
}

/**
 * Update the form fields with values and errors
 * @param {Contacts} [values]
 * @param {Contacts} [errors]
 * @returns {void}
 */
export function updateFormFields(values, errors) {
  const formFields = document.getElementById('formFields');
  formFields.innerHTML = renderFields(values, errors);
}

/**
 * Hide the form
 * @returns {void}
 */
export function hideForm() {
  const form = document.getElementById('form');
  form.style.display = 'none';
}