'use client';

import { ShowCard } from '@/components/ShowCard';
import { showList } from '@/data/showList';

export default function ShowPage() {
	return (
		<div className="container py-8">
			<h1 className="text-3xl font-bold mb-8">作品集</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{showList.map((show) => (
					<ShowCard key={show.id} show={show} />
				))}
			</div>
		</div>
	);
}
