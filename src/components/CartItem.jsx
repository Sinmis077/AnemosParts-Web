import React from "react";
import { Item, ItemContent, ItemDescription, ItemHeader, ItemTitle } from '@/components/ui/item.jsx';

CartItem.propTypes = {
	item: {
		id: Number,
		name: String,
		description: String,
		partNumber: String,
		quantity: Number,
		price: Number,
		images: [{
			source: String,
			isThumbnail: Boolean,
		}]
	},
	quantity: Number,
};

export function CartItem({ item, quantity }) {
	const thumbnail = item.images?.find(image => image.isThumbnail)?.source
		?? item.images?.[0]?.source
		?? "";
	const total = (item.price * quantity).toFixed(2);

	return (
		<Item key={item.id} className="grid grid-cols-3 bg-gray-100 shadow rounded-lg overflow-hidden min-h-40">
			<ItemHeader className="col-span-1 p-0">
				<img
					className="w-full h-full object-cover"
					src={thumbnail}
					alt={item.name}
				/>
			</ItemHeader>
			<ItemContent className="col-span-2 p-4 flex flex-col h-full">
				<div className="flex justify-between items-center">
					<ItemTitle className="text-lg font-semibold">{item.name}</ItemTitle>
					<span className="text-sm text-gray-500">#{item.partNumber}</span>
				</div>

				<ItemDescription className="flex-1 flex items-center text-sm text-gray-600 py-2">
					{item.description}
				</ItemDescription>

				<div className="flex justify-between items-end">
					<p className="text-sm text-gray-600">€{item.price} × {quantity}</p>
					<p className="text-xl font-bold">€{total}</p>
				</div>
			</ItemContent>
		</Item>
	);
}