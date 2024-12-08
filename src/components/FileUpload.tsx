import { UploadCloud, X } from 'lucide-react';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from './ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from './ui/card';
import { Progress } from './ui/progress';

interface FileUploadProps {
	onFileSelect: (file: File) => void;
}

export function FileUpload({ onFileSelect }: FileUploadProps) {
	const [file, setFile] = useState<File | null>(null);
	const [preview, setPreview] = useState<string>('');
	const [error, setError] = useState<string>('');
	const [progress, setProgress] = useState(0);

	// 清除选择的文件
	const clearFile = () => {
		setFile(null);
		setPreview('');
		setError('');
		setProgress(0);
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		onFileSelect(null as any);
	};

	// 处理文件拖放
	const onDrop = useCallback(
		(acceptedFiles: File[]) => {
			setError('');
			const selectedFile = acceptedFiles[0];

			// 验证文件类型
			const validTypes = ['image/jpeg', 'image/png', 'video/mp4'];
			if (!validTypes.includes(selectedFile.type)) {
				setError('请上传 JPG、PNG ���片或 MP4 视频文件');
				return;
			}

			// 验证文件大小 (最大 300MB)
			if (selectedFile.size > 300 * 1024 * 1024) {
				setError('文件大小不能超过 10MB');
				return;
			}

			setFile(selectedFile);
			onFileSelect(selectedFile);

			// 如果是图片，创建预览
			if (selectedFile.type.startsWith('image/')) {
				const reader = new FileReader();
				reader.onloadstart = () => setProgress(0);
				reader.onprogress = (event) => {
					if (event.lengthComputable) {
						setProgress((event.loaded / event.total) * 100);
					}
				};
				reader.onload = () => {
					setPreview(reader.result as string);
					setProgress(100);
				};
				reader.readAsDataURL(selectedFile);
			} else {
				// 对于视频，显示第一帧作为预览
				const video = document.createElement('video');
				video.preload = 'metadata';
				video.onloadedmetadata = () => {
					video.currentTime = 0;
				};
				video.onseeked = () => {
					const canvas = document.createElement('canvas');
					canvas.width = video.videoWidth;
					canvas.height = video.videoHeight;
					const ctx = canvas.getContext('2d');
					ctx?.drawImage(video, 0, 0);
					setPreview(canvas.toDataURL('image/jpeg'));
					setProgress(100);
				};
				video.src = URL.createObjectURL(selectedFile);
			}
		},
		[onFileSelect]
	);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: {
			'image/jpeg': ['.jpg', '.jpeg'],
			'image/png': ['.png'],
			'video/mp4': ['.mp4']
		},
		maxFiles: 1
	});

	return (
		<Card className="w-full">
			<CardHeader>
				<CardTitle>上传文件</CardTitle>
				<CardDescription>
					支持上传 JPG、PNG 图片或 MP4 视频，最大 10MB
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div
					{...getRootProps()}
					className={`relative flex h-64 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors ${
						isDragActive
							? 'border-primary bg-primary/5'
							: 'border-muted-foreground/25'
					}`}
				>
					<input {...getInputProps()} />
					{file ? (
						<div className="relative h-full w-full">
							{/* 预览图 */}
							<img
								src={preview}
								alt="Preview"
								className="h-full w-full rounded-lg object-contain"
							/>
							{/* 删除按钮 */}
							<Button
								variant="destructive"
								size="icon"
								className="absolute right-2 top-2"
								onClick={(e) => {
									e.stopPropagation();
									clearFile();
								}}
							>
								<X className="h-4 w-4" />
							</Button>
							{/* 进度条 */}
							{progress < 100 && (
								<div className="absolute bottom-2 left-2 right-2">
									<Progress value={progress} />
								</div>
							)}
						</div>
					) : (
						<div className="flex flex-col items-center justify-center gap-2 text-muted-foreground">
							<UploadCloud className="h-10 w-10" />
							<div className="text-center">
								<p>
									{isDragActive ? '放开以上传文件' : '拖放文件到此处或点击上传'}
								</p>
								<p className="text-xs">JPG、PNG 图片或 MP4 视频</p>
							</div>
						</div>
					)}
				</div>
				{error && <p className="mt-2 text-sm text-destructive">{error}</p>}
			</CardContent>
		</Card>
	);
}
