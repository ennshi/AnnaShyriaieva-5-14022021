import {renderOrderSuccess} from "../components/orderResult";

/**
 * Render Order Success page
 * @param {HTMLElement} rootContainer
 * @param {OrderSuccessQueryData} orderSuccessQueryData
 * @returns {void}
 */
export function renderSuccessPage (rootContainer, {total, id}) {
  rootContainer.innerHTML = '';

  if (!total || !id) return router.navigate(PAGES.INDEX);

  rootContainer.append(renderOrderSuccess({total, orderId: id}));
};