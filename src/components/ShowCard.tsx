import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from '@/components/ui/card';
import { ShowItem } from '@/types/show';
import Image from 'next/image';
import Link from 'next/link';

interface ShowCardProps {
	show: ShowItem;
}

export function ShowCard({ show }: ShowCardProps) {
	return (
		<Link href={`/show/${show.id}`}>
			<Card className="overflow-hidden transition-all hover:shadow-lg">
				<CardHeader className="p-0">
					{show.type === 'video' ? (
						<video src={show.path} className="w-full h-[200px] object-cover" />
					) : (
						<Image
							width={300}
							height={200}
							src={show.path}
							alt={show.title}
							className="w-full h-[200px] object-cover"
						/>
					)}
				</CardHeader>
				<CardContent className="p-4">
					<CardTitle className="text-lg mb-2">{show.title}</CardTitle>
					<CardDescription>{show.description}</CardDescription>
				</CardContent>
			</Card>
		</Link>
	);
}
