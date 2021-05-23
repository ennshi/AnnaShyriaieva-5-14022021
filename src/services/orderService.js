import {cartService} from "./cartService";
import {callApi} from "../helpers/apiHelper";

class OrderService {
  async sendOrder(values) {
    const cartItems = cartService.getItemsFromCart();
    if(!values || !cartItems) return;
    const products = [...new Set(cartItems.map(i => i.item.id))];
    const order = {
      contact: {
        firstName: values.firstName.trim(),
        lastName: values.lastName.trim(),
        address: values.address.trim(),
        city: values.city.trim(),
        email: values.email.trim(),
      },
      products,
    };
    try {
      return await callApi('/order', 'POST', order);
    } catch (e) {
      throw e;
    }
  }
}

export const orderService = new OrderService();