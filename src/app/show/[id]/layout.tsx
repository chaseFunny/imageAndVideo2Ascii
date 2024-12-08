import { showList } from '@/data/showList';

export async function generateStaticParams() {
	return showList.map((item) => ({ id: item.id.toString() }));
}
export default function ShowLayout({
	children
}: {
	children: React.ReactNode;
}) {
	return <>{children}</>;
}
