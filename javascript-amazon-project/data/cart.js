export let cart;

loadfromStorage();

export function loadfromStorage() {
    cart = JSON.parse(localStorage.getItem('cart')) // || []; 

    if(!cart){
        cart = [{
            productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            quantity:2,
            deliveryOptionsId: '1'
        },{
            productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
            quantity:1,
            deliveryOptionsId: '2'  
        }];
    } 
}

function saveToStorage(){
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId, quantity){
    let matchingItem;

    cart.forEach((cartItem) => {
        if(productId === cartItem.productId){
            matchingItem = cartItem;
        }
    })
    
    if(matchingItem){
        matchingItem.quantity += quantity;
    }
    else{
        cart.push({
            productId: productId,
            quantity: quantity,
            deliveryOptionsId: '1'
        })
    }
    saveToStorage();
}

export function removeFromCart(productId){
    let newCart = [];
    cart.forEach((cartItem) => {
        if(cartItem.productId !== productId){
            newCart.push(cartItem);
        }
    })

    cart = newCart
    saveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId) {

    let matchingItem;

    cart.forEach((cartItem) => {
        if(productId === cartItem.productId){
            matchingItem = cartItem;
        }
    })

    matchingItem.deliveryOptionsId = deliveryOptionId;

    saveToStorage();
}

export function updateQuantity(productId, newQuantity){
    let matchingItem;
    cart.forEach((cartItem) =>{
        if(cartItem.productId === productId){
            matchingItem = cartItem;
        }
    })

    matchingItem.quantity = newQuantity;
    saveToStorage();
}

export function resetCart() {
    cart = [];
    saveToStorage();
}

export function updateCartQuanatity(){
    let cartQuantity = 0;
    cart.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
    })
    
    return document.querySelector(`.js-cart-quantity`).innerHTML = cartQuantity;
}