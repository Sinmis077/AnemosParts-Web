import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';

PartCard.propTypes = {
	part: Object
};

export function PartCard({ part }) {
	return (
		<Link to={`item/${part.id}`}>
			<Card className="cursor-pointer gap-3">
				<CardHeader>
					<img className="w-full h-[120px] pb-3" src={part.thumbnailSrc} alt="Part thumbnail" />
					<CardTitle className="text-start">{part.name}</CardTitle>
				</CardHeader>
				<CardContent className="pb-3">
					<CardDescription className="text-start text-pretty text-current">{part.description}</CardDescription>
					<CardDescription className="text-end">
						€{part.price} | Quantity: {part.quantity}
					</CardDescription>
				</CardContent>
				<CardFooter className="flex items-end justify-end">
					<img className="w-1/2" src={part.brandIconSrc} alt="Brand icon" />
				</CardFooter>
			</Card>
		</Link>
	);
}