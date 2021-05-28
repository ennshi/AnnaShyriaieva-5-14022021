import {renderOrderSuccess} from "../components/orderResult";

export function renderSuccessPage (rootContainer, {total, id}) {
  rootContainer.innerHTML = '';

  if (!total || !id) return router.navigate(PAGES.INDEX);

  rootContainer.append(renderOrderSuccess({total, orderId: id}));
};