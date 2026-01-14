import { CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useCartDispatch } from '@/app/contexts/CartContext';

export function SuccessPage() {
	const dispatch = useCartDispatch();

	useEffect(() => {
		dispatch({ type: 'clear' });
	}, [dispatch]);

	return (
		<main className="flex flex-col items-center justify-center min-h-[60vh] px-4">
			<CheckCircle className="w-20 h-20 text-green-500 mb-6" />
			<h1 className="text-3xl font-bold mb-2">Payment Successful!</h1>
			<p className="text-gray-600 mb-8 text-center max-w-md">
				Thank you for your order. You will receive a confirmation email shortly.
			</p>
			<Button asChild className="bg-sky-500 hover:bg-sky-600">
				<Link to="/catalog">Continue Shopping</Link>
			</Button>
		</main>
	);
}