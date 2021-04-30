class CartService {
    getItemsFromCart() {
        const cartItems = localStorage.getItem('cart');
        if(!cartItems) return [];
        return JSON.parse(cartItems);
    }

    addItemToCart({item, amount = 1}) {
        if(!item) return;

        const items = this.getItemsFromCart();
        if(!items.length) {
            localStorage.setItem('cart', JSON.stringify([{item, amount}]));
            return;
        }

        const bearFromCartIdx = items.findIndex(b => (b.item.id === item.id && b.item.color === item.color));
        if(!~bearFromCartIdx) {
            localStorage.setItem('cart', JSON.stringify([...items, {item, amount}]));
            return;
        }

        const newItems = [...items];
        newItems[bearFromCartIdx].amount += amount;
        localStorage.setItem('cart', JSON.stringify(newItems));
    }

    removeItemFromCart({id, color, amount = 0}) {
        const items = localStorage.getItem('cart');
        const bearFromCartIdx = items.findIndex(b => (b.item.id === id && b.item.color === color));
        const initAmount = items[bearFromCartIdx].amount;

        if(!id || !items.length || !~bearFromCartIdx) return;

        if(amount && (initAmount > amount)) {
            const newItems = [...items];
            newItems[bearFromCartIdx].amount -= amount;
            localStorage.setItem('cart', JSON.stringify(newItems));
            return;
        }

        localStorage.setItem('cart', JSON.stringify(items.splice(bearFromCartIdx, 1)));
    }
}

export const cartService = new CartService();
