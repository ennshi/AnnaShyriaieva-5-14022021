import {formFields, PAGES} from "../helpers/constants";
import {createElement} from "../helpers/domHelper";
import {validateValues} from "../helpers/validation";
import {router} from "../router/router";
import {cartService} from "../services/cartService";
import {orderService} from "../services/orderService";

export function renderForm() {
  const form = createElement({tagName: 'div', className: 'form__container', attributes: {id: 'form'}});
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
      console.log('Sent', values)
      orderService.sendOrder(values)
      .then((res) => {
        const total = cartService.getTotalPrice();
        cartService.clearCart();
        router.navigate(`${PAGES.ORDER_SUCCESS}?total=${total}&id=${res.orderId}`);
      })
      .catch(e => console.log(e));
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

export function updateFormFields(values, errors) {
  const formFields = document.getElementById('formFields');
  formFields.innerHTML = renderFields(values, errors);
}

export function hideForm() {
  const form = document.getElementById('form');
  form.style.display = 'none';
}