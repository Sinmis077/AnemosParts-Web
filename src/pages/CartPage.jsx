import useCart, { useCartItemIds } from '@/app/contexts/CartContext.jsx';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { CartItem } from '@/components/CartItem.jsx';
import { useParts } from '@/app/hooks/useParts.js';
import { Spinner } from '@/components/ui/spinner.jsx';

export function CartPage() {
	const cart = useCart();
	const navigate = useNavigate();

	const {
		catalog: builtCart,
		isLoading,
		error,
	} = useParts(useCartItemIds());

	if(isLoading) {
		return <Spinner />;
	}

	return (
		<main>
			<a className="flex flex-row gap-2 cursor-pointer p-5 max-w-fit" onClick={() => {
				navigate(-1);
			}}>
				<ArrowLeft />
				Go back
			</a>
			{(cart.length === 0) ? 'Your cart is empty.' : (
				<div className="container grid grid-cols-2 gap-3">
					{
						builtCart.map((item, index) => (
							<CartItem key={index} item={item} />
						))
					}
				</div>)}
		</main>
	);
}