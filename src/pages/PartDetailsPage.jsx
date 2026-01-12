import React from 'react';
import { useParams } from 'react-router-dom';
import { MainDetailsPart } from '@/components/MainDetailsPart.jsx';
import { usePart } from '@/app/hooks/useParts.js';
import { Divider } from '@/components/ui/divider.jsx';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table.jsx';
import { Loading } from '@/components/Loading.jsx';
import { Error } from '@/components/Error.jsx';

export function PartDetailsPage() {
	const { id } = useParams();

	const { part, isLoading, error } = usePart(id);

	if (isLoading) {
		return <Loading description="Loading the part..." />;
	}

	if (error) {
		return <Error title="Failed to load the part" description={error} />;
	}

	return (
		<div className="container mx-auto mt-7">
			<MainDetailsPart part={part} />

			<Divider className="mt-12" />

			{/* Description */}
			<div className="mt-8">
				<h2 className="text-2xl font-bold mb-4">Description</h2>
				<p className="text-lg text-muted-foreground">{part.description}</p>
			</div>

			<Divider className="mt-8" />

			{/* Item Specifics Table */}
			<div className="mt-8 mb-12">
				<h2 className="text-2xl font-bold mb-4">Item specifics</h2>
				<Table>
					<TableBody>
						<TableRow>
							<TableCell className="font-medium w-1/4 text-start">Part Number</TableCell>
							<TableCell className="text-start">{part.partNumber}</TableCell>
						</TableRow>
						{part.oemNumber && (
							<TableRow>
								<TableCell className="font-medium text-start">OEM Number</TableCell>
								<TableCell className="text-start">{part.oemNumber}</TableCell>
							</TableRow>
						)}
						{part.condition && (
							<TableRow>
								<TableCell className="font-medium text-start">Condition</TableCell>
								<TableCell className="text-start">{part.condition}</TableCell>
							</TableRow>
						)}
						{part.manufacturer && (
							<TableRow>
								<TableCell className="font-medium text-start">Manufacturer</TableCell>
								<TableCell className="text-start">{part.manufacturer}</TableCell>
							</TableRow>
						)}
						{part.placement && (
							<TableRow>
								<TableCell className="font-medium text-start">Placement</TableCell>
								<TableCell className="text-start">{part.placement}</TableCell>
							</TableRow>
						)}
						{part.material && (
							<TableRow>
								<TableCell className="font-medium text-start">Material</TableCell>
								<TableCell className="text-start">{part.material}</TableCell>
							</TableRow>
						)}
						{part.color && (
							<TableRow>
								<TableCell className="font-medium text-start">Color</TableCell>
								<TableCell className="text-start">{part.color}</TableCell>
							</TableRow>
						)}
						{part.models?.length > 0 && (
							<TableRow>
								<TableCell className="font-medium text-start align-top">Compatible Models</TableCell>
								<TableCell className="text-start">
									{part.models.map(m => (
										<span key={m.id} className="block">{m.brand?.name} {m.name} ({m.productionYear})</span>
									))}
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}