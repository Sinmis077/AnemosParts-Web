import React from 'react';
import { createContext, useContext, useReducer } from 'react';

const CartContext = createContext({});

const CartDispatchContext = createContext({});

export function CartProvider({ children }) {
	const [items, dispatch] = useReducer(itemsReducer, initialCart);

	return (
		<CartContext value={items}>
			<CartDispatchContext value={dispatch}>
				{children}
			</CartDispatchContext>
		</CartContext>);
}

export default function useCart() {
	return useContext(CartContext);
}

export function useCartItemIds() {
	let ids = [];

	useCart().forEach(item => {
		ids.push(item.id);
	});

	return ids;
}

export function useCartDispatch() {
	return useContext(CartDispatchContext);
}

function itemsReducer(items, action) {
	let item = action.item;

	let cart = [...items];

	switch (action.type) {
		case 'add':
			if (cart.filter(i => i?.id === item.id).length > 0) {
				cart = cart.map(i => {
					if (i.id === item.id) {
						return { id: item.id, quantity: i.quantity + 1 };
					}
				});
				return cart;
			}
			cart.push({ id: item.id, quantity: item.quantity });

			break;
		case 'update':
			cart = cart.map(i => {
				if (i.id === item.id) {
					return { id: item.id, quantity: item.quantity };
				} else {
					return i;
				}
			});
			break;
		case 'remove':
			cart = cart.filter(i => i.id !== item.id);
			break;
		case 'clear':
			cart = [];
			break;

		default:
			throw new Error('Unknown action: ' + action.type);
	}

	localStorage.setItem('cart', JSON.stringify(cart));

	return cart;
}

const initialCart = JSON.parse(localStorage.getItem('cart')) ?? [];