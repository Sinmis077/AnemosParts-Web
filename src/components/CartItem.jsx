import { Item, ItemContent, ItemDescription, ItemHeader, ItemTitle } from '@/components/ui/item.jsx';

CartItem.propTypes = {
	item: {
		id: Number,
		name: String,
		description: String,
		quantity: Number,
		price: Number,
		images: [{
			source: String,
			isThumbnail: Boolean,
		}]
	}
};

export function CartItem({ item }) {
	return (
		<Item key={item.id} className="flex flex-row bg-gray-100 shadow">
			<ItemHeader>
				<img className="w-72" src={item.images.find(image => image.isThumbnail)?.source ?? ""} alt="Item thumbnail" />
			</ItemHeader>
			<ItemContent className="text-start">
				<ItemTitle>{item.name}</ItemTitle>
				<ItemDescription>{item.description}</ItemDescription>
				<p className="text-end">€{item.price} / Quantity: {item.quantity}</p>
			</ItemContent>
		</Item>
	)
}