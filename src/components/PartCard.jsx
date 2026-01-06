import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

PartCard.propTypes = {
	part: Object,
}

export function PartCard({ part }) {
	const isSoldOut = part.quantity === 0;

	return (
		<Link to={`item/${part.id}`} className={isSoldOut ? 'pointer-events-none' : ''}>
			<Card className={`h-full flex flex-col hover:shadow-lg transition-shadow ${isSoldOut ? 'opacity-60' : ''}`}>
				<div className="relative aspect-square bg-muted">
					<img
						className="w-full h-full object-contain p-3"
						src={part.thumbnailSrc}
						alt={part.name}
					/>
					{isSoldOut && (
						<div className="absolute inset-0 flex items-center justify-center bg-background/80">
							<Badge variant="destructive">Sold Out</Badge>
						</div>
					)}
				</div>

				<CardHeader className="pb-2">
					<h3 className="font-semibold text-sm line-clamp-2 text-start">{part.name}</h3>
				</CardHeader>

				<CardContent className="flex-1 pb-2">
					<p className="text-xs text-muted-foreground line-clamp-2 text-start">
						{part.description}
					</p>
				</CardContent>

				<CardFooter className="justify-between items-end">
					<div className="text-start">
						<p className="text-base font-bold">€{part.price}</p>
						{!isSoldOut && (
							<p className="text-xs text-muted-foreground">
								{part.quantity} in stock
							</p>
						)}
					</div>
					{part.brandIconSrc && (
						<img
							className="h-6 w-auto opacity-70"
							src={part.brandIconSrc}
							alt="Brand"
						/>
					)}
				</CardFooter>
			</Card>
		</Link>
	);
}