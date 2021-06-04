/**
 * CartService class
 * @name CartService
 * @class
 */
class CartService {
    /**
     * Display cart items number on the cat badge
     * @param {Number | undefined} number number of items
     * @returns {void}
     */
    displayItemsNumber(number) {
        const badge = document.getElementById('cart-badge');
        if(number) {
            badge.innerText = number;
            return;
        }
        const items = this.getItemsFromCart();
        badge.innerText = `${items.length}`;
    }

    /**
     * Get all items from cart
     * @returns {CartItem[]} cart items list
     */
    getItemsFromCart() {
        const cartItems = localStorage.getItem('cart');
        if(!cartItems) return [];
        return JSON.parse(cartItems);
    }

    /**
     * Add an item to the cart
     * @param {CartItem} cartItem cart item
     * @returns {void}
     */
    addItemToCart({item, amount = 1}) {
        if(!item) return;

        const items = this.getItemsFromCart();
        if(!items.length) {
            localStorage.setItem('cart', JSON.stringify([{item, amount}]));
            this.displayItemsNumber(1);
            return;
        }

        const bearFromCartIdx = items.findIndex(b => (b.item.id === item.id && b.item.color === item.color));
        if(!~bearFromCartIdx) {
            localStorage.setItem('cart', JSON.stringify([...items, {item, amount}]));
            this.displayItemsNumber(items.length + 1);
            return;
        }

        const newItems = [...items];
        newItems[bearFromCartIdx].amount += amount;
        localStorage.setItem('cart', JSON.stringify(newItems));
    }

    /**
     * Remove an item from the cart
     * @param {Number} id item id
     * @param {String} color item color
     * @param {Number} amount item number
     * @returns {void}
     */
    removeItemFromCart(id, color, amount = 0) {
        const items = this.getItemsFromCart();
        const bearFromCartIdx = items.findIndex(b => (b.item.id === id && b.item.color === color));

        if(!id || !items.length || !~bearFromCartIdx) return;

        const initAmount = items[bearFromCartIdx].amount;
        const newItems = [...items];

        if(amount && (initAmount > amount)) {
            newItems[bearFromCartIdx].amount -= amount;
            localStorage.setItem('cart', JSON.stringify(newItems));
            return;
        }

        newItems.splice(bearFromCartIdx, 1);
        localStorage.setItem('cart', JSON.stringify(newItems));
        this.displayItemsNumber(items.length - 1);
    }

    /**
     * Get the total price
     * @returns {Number} total price
     */
    getTotalPrice() {
        const items = this.getItemsFromCart();
        if(!items) return 0;
        return items.reduce((acc, {amount, item}) => acc + item.price * amount, 0); 
    }

    /**
     * Clear the cart
     * @returns {void}
     */
    clearCart() {
        localStorage.removeItem('cart');
        this.displayItemsNumber();
    }
}

export const cartService = new CartService();
