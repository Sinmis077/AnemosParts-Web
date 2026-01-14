import { XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export function CancelPage() {
	return (
		<main className="flex flex-col items-center justify-center min-h-[60vh] px-4">
			<XCircle className="w-20 h-20 text-red-500 mb-6" />
			<h1 className="text-3xl font-bold mb-2">Payment Cancelled</h1>
			<p className="text-gray-600 mb-8 text-center max-w-md">
				Your payment was not completed. Your cart items are still saved.
			</p>
			<div className="flex gap-4">
				<Button asChild variant="outline">
					<Link to="/catalog">Continue Shopping</Link>
				</Button>
				<Button asChild className="bg-sky-500 hover:bg-sky-600 ">
					<Link className="text-white" to="/cart">Return to Cart</Link>
				</Button>
			</div>
		</main>
	);
}