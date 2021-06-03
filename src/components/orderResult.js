import {PAGES} from "../helpers/constants";
import {createElement} from "../helpers/domHelper";
import {router} from "../router/router";

/**
 * Render an order success section
 * @param {OrderSuccessData} orderSuccessData
 * @returns {HTMLElement} order success container
 */

export function renderOrderSuccess ({total, orderId}) {
  const orderSuccessContainer = createElement({tagName: 'section', className: 'order-success__container'});
  orderSuccessContainer.innerHTML = `
    <h1 class="header">Merci pour votre commande : ${orderId}</h1>
    <p>Le prix total: ${total}¥</p>
  `;
  const btnBack = createElement({tagName: 'button', className: 'btn--basic'});
  btnBack.innerText = 'Retour à l\'accueil';
  btnBack.addEventListener('click', () => {
    router.navigate(PAGES.INDEX);
  });
  orderSuccessContainer.append(btnBack);
  return orderSuccessContainer;
}