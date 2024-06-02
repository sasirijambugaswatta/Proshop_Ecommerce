export const addDecimal = (num:number) => {
    return (Math.round(num * 100) / 100).toFixed(2)
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export const updateCart = (state) => {


    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    state.itemsPrice = addDecimal(state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0));

    state.shippngPrice = addDecimal(state.itemPrice > 100 ? 0: 10);

    state.taxPrice = addDecimal(Number((0.15 * state.itemsPrice).toFixed(2)));

    state.totalPrice = (Number(state.itemsPrice) + Number(state.shippngPrice) + Number(state.taxPrice)).toFixed(2);

    localStorage.setItem("cart", JSON.stringify(state));

    return state;
}