'use client';

import { FileUpload } from '@/components/FileUpload';
import { Preview } from '@/components/Preview';
import { useState } from 'react';

export default function Home() {
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [previewUrl, setPreviewUrl] = useState<string>('');

	const handleFileSelect = (file: File) => {
		if (!file) {
			setSelectedFile(null);
			setPreviewUrl('');
			return;
		}
		setSelectedFile(file);
		setPreviewUrl(URL.createObjectURL(file));
	};

	return (
		<div className="container  p-2 py-10 sm:p-10">
			<div className="mx-auto max-w-5xl space-y-8">
				<div className="space-y-2 text-center">
					<h1 className="text-3xl font-bold">ASCII 字符生成器</h1>
					<p className="text-muted-foreground">
						将您的图片和视频转换为 ASCII 字符艺术
					</p>
				</div>

				<FileUpload onFileSelect={handleFileSelect} />

				{selectedFile && previewUrl && (
					<Preview file={selectedFile} previewUrl={previewUrl} />
				)}
			</div>
		</div>
	);
}
