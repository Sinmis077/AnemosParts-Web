import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Wrench, Truck, Euro, Facebook, Mail, Phone } from 'lucide-react';

export function HomePage() {
	return (
		<main>
			{/* Hero Section */}
			<section className="bg-gradient-to-b from-gray-100 to-white py-20 px-4">
				<div className="max-w-3xl mx-auto text-center">
					<img className="mx-auto w-1/2" src="./AnemosParts_Logo.svg" alt="logo" />
					<h1 className="text-4xl md:text-5xl font-bold mb-4">Anemos Racing Parts webstore</h1>
					<p className="text-lg text-gray-600 mb-8">
						Good/New parts, best prices.
					</p>
					<Button asChild size="lg" className="bg-sky-500 hover:bg-sky-600">
						<Link to="/catalog">Browse the parts</Link>
					</Button>
				</div>
			</section>

			{/* Features */}
			<section className="py-16 px-4">
				<div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8 text-center">
					<div className="flex flex-col items-center">
						<Wrench className="w-10 h-10 text-sky-500 mb-3" />
						<h3 className="font-semibold mb-2">Checked Condition</h3>
						<p className="text-gray-600 text-sm">All parts verified to be in okay to good condition, sometimes they are
							brand new</p>
					</div>
					<div className="flex flex-col items-center">
						<Euro className="w-10 h-10 text-sky-500 mb-3" />
						<h3 className="font-semibold mb-2">Best Prices</h3>
						<p className="text-gray-600 text-sm">Competitive pricing on everything</p>
					</div>
					<div className="flex flex-col items-center">
						<Truck className="w-10 h-10 text-sky-500 mb-3" />
						<h3 className="font-semibold mb-2">Flat Rate Shipping</h3>
						<p className="text-gray-600 text-sm">€10 shipping regardless of destination</p>
					</div>
				</div>
			</section>

			{/* About Section */}
			<section className="bg-gray-50 py-16 px-4">
				<div className="max-w-2xl mx-auto text-center">
					<h2 className="text-2xl font-bold mb-4">About</h2>
					<p className="text-gray-600 leading-relaxed">
						I started by trying to sell parts on the Facebook marketplace but with limited success, I've decided it
						would be easier
						if you could visit a webstore that you can find my parts easier!
					</p>
				</div>
			</section>

			{/* Contact Section */}
			<section className="py-16 px-4">
				<div className="max-w-2xl mx-auto text-center">
					<h2 className="text-2xl font-bold mb-6">Got questions? Contact me here:</h2>
					<div className="flex justify-center gap-8">
						<a
							href="https://facebook.com/antonis.panagi.129"
							target="_blank"
							rel="noopener noreferrer"
							className="flex flex-col items-center text-gray-600 hover:text-sky-500"
						>
							<Facebook className="w-8 h-8 mb-2" />
							<span className="text-sm">Facebook</span>
						</a>
						<a
							href="mailto:anemos.racing@email.com"
							className="flex flex-col items-center text-gray-600 hover:text-sky-500"
						>
							<Mail className="w-8 h-8 mb-2" />
							<span className="text-sm">Email</span>
						</a>
						<a
							href="tel:+357 99 559685"
							className="flex flex-col items-center text-gray-600 hover:text-sky-500"
						>
							<Phone className="w-8 h-8 mb-2" />
							<span className="text-sm">Phone</span>
						</a>
					</div>
				</div>
			</section>

			{/* CTA */}
			<section className="py-16 px-4">
				<div className="max-w-xl mx-auto text-center">
					<Button asChild size="lg" className="bg-sky-500 hover:bg-sky-600">
						<Link to="/catalog">View my catalog</Link>
					</Button>
				</div>
			</section>
		</main>
	);
}