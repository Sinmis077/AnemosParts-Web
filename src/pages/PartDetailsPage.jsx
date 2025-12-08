import { useParams } from 'react-router-dom';
import React from 'react';
import { MainDetailsPart } from '@/components/MainDetailsPart.jsx';
import { usePart } from '@/app/hooks/useParts.js';
import { Spinner } from '@/components/ui/spinner.jsx';
import { Divider } from '@/components/ui/divider.jsx';

export function PartDetailsPage() {
	const { id } = useParams();

	const {
		part,
		isLoading,
		error
	} = usePart(id);

	if(isLoading) {
		return <Spinner />;
	}

	return (
		<div className="container mx-auto mt-7">
			<MainDetailsPart part={part} />

			<Divider className="mt-12" />

			<p className="text-2xl mt-12">
				{part.description}
			</p>
		</div>
	);
}
