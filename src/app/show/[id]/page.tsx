'use client';

import { Preview } from '@/components/Preview';
import { showList } from '@/data/showList';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ShowDetailPage() {
	const params = useParams();
	const [show, setShow] = useState(showList[0]);
	const [file, setFile] = useState<File>();

	useEffect(() => {
		const currentShow = showList.find((item) => item.id === Number(params.id));
		if (currentShow) {
			setShow(currentShow);
			// 从路径创建 File 对象
			fetch(currentShow.path)
				.then((res) => res.blob())
				.then((blob) => {
					const file = new File([blob], currentShow.title, {
						type: currentShow.type === 'image' ? 'image/jpeg' : 'video/mp4'
					});
					setFile(file);
				});
		}
	}, [params.id]);

	if (!show || !file) {
		return <div>Loading...</div>;
	}

	return (
		<div className="container py-8">
			<div className="max-w-4xl mx-auto">
				<h1 className="text-3xl font-bold mb-2">{show.title}</h1>
				<p className="text-muted-foreground mb-8">{show.description}</p>
				<Preview file={file} previewUrl={show.path} />
			</div>
		</div>
	);
}
