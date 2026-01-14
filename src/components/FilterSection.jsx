import { ChevronDown, ChevronUp } from 'lucide-react';

export function FilterSection({ title, isOpen, onToggle, children }) {
	return (
		<div className="border-b border-gray-200 py-3">
			<button
				onClick={onToggle}
				className="flex justify-between items-center w-full text-left font-medium"
			>
				{title}
				{isOpen ? (
					<ChevronUp className="w-4 h-4 text-gray-500" />
				) : (
					<ChevronDown className="w-4 h-4 text-gray-500" />
				)}
			</button>
			{isOpen && <div className="mt-3">{children}</div>}
		</div>
	);
}