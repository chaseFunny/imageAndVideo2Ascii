import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { isMobile } from '@/lib/utils';
import { FlipHorizontal, Pause, Play, RefreshCw } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import * as ResizablePrimitive from 'react-resizable-panels';

interface PreviewProps {
	file: File;
	previewUrl: string;
}

export function Preview({ file, previewUrl }: PreviewProps) {
	console.log(previewUrl);

	const isVideo = file?.type?.startsWith('video/');
	// 视频元素
	const videoRef = useRef<HTMLVideoElement>(null);
	// canvas 元素
	const canvasRef = useRef<HTMLCanvasElement>(null);
	// 内容元素
	const txtRef = useRef<HTMLPreElement>(null);
	// 字体大小
	const [fontSize, setFontSize] = useState(isVideo ? 5 : 4);
	// 是否展示视频
	const [showVideo, setShowVideo] = useState(true);
	// ASCII 文本
	const [asciiText, setAsciiText] = useState('');
	// 定时器
	const intervalIdRef = useRef<NodeJS.Timeout>();
	// ascii 内容 ref
	const imageRef = useRef<HTMLImageElement>(null);
	// 视频是否真正播放中
	const [isVideoPlaying, setIsVideoPlaying] = useState(false);

	// 添加新的状态控制是否更新 ASCII
	const [isUpdating, setIsUpdating] = useState(true);

	// ASCII字符映射函数
	const toText = (g: number): string => {
		if (g <= 30) return '#';
		if (g <= 60) return '&';
		if (g <= 120) return '$';
		if (g <= 150) return '*';
		if (g <= 180) return 'o';
		if (g <= 210) return '!';
		if (g <= 240) return ';';
		return ' ';
	};

	// 计算灰度值
	const getGray = (r: number, g: number, b: number): number => {
		return 0.299 * r + 0.578 * g + 0.114 * b;
	};

	// 视频转换为ASCII
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const convert: any = async () => {
		console.log(1);

		// 如果暂停了就不更新
		if (!isUpdating) return;
		const video = videoRef.current;
		const canvas = canvasRef.current;
		const ctx = canvas?.getContext('2d');
		if (!canvas || !ctx) return;

		let width, height;

		if (isVideo && video) {
			width = video.clientWidth;
			height = video.clientHeight;

			canvas.width = width;
			canvas.height = height;
			ctx.drawImage(video, 0, 0, width, height);
		} else {
			// 创建新的图片对象并等待加载
			const img = new Image();
			const calculateContainerSize = async () => {
				await new Promise((resolve) => setTimeout(resolve, 700)); // 等待dom元素渲染
				const containerWidth =
					imageRef.current?.clientWidth || imageRef.current?.width;
				const containerHeight =
					imageRef.current?.clientHeight || imageRef.current?.height;
				if (!containerHeight || !containerWidth)
					return { width: 400, height: 400 };
				return { width: containerWidth, height: containerHeight };
			};

			const { width, height } = await calculateContainerSize();

			img.crossOrigin = 'Anonymous';

			img.onload = () => {
				// 设置canvas尺寸为计算后的尺寸
				canvas.width = width;
				canvas.height = height;
				ctx.drawImage(img, 0, 0, width, height);

				// 获取图片数据并处理
				const imgData = ctx.getImageData(0, 0, width, height);
				const imgDataArr = imgData.data;
				const imgDataWidth = imgData.width;
				const imgDataHeight = imgData.height;

				let html = '';
				for (let h = 0; h < imgDataHeight; h += fontSize) {
					let p = '';
					for (let w = 0; w < imgDataWidth; w += fontSize / 2) {
						const index = (w + imgDataWidth * h) * 4;
						const r = imgDataArr[index + 0];
						const g = imgDataArr[index + 1];
						const b = imgDataArr[index + 2];
						const gray = getGray(r, g, b);
						p += toText(gray);
					}
					p += '\n';
					html += p;
				}
				setAsciiText(html);
			};
			img.src = previewUrl;
			return; // 提前返回，避免执行后续视频相关的代码
		}

		const imgData = ctx.getImageData(0, 0, width, height);
		const imgDataArr = imgData.data;
		const imgDataWidth = imgData.width;
		const imgDataHeight = imgData.height;

		let html = '';

		for (let h = 0; h < imgDataHeight; h += fontSize) {
			let p = '';
			for (let w = 0; w < imgDataWidth; w += fontSize / 2) {
				const index = (w + imgDataWidth * h) * 4;
				const r = imgDataArr[index + 0];
				const g = imgDataArr[index + 1];
				const b = imgDataArr[index + 2];
				const gray = getGray(r, g, b);
				p += toText(gray);
			}
			p += '\n';
			html += p;
		}

		setAsciiText(html);
	};

	// 处理图片和视频的效果
	useEffect(() => {
		if (!isVideo) {
			// 对于图片，直接调用一次转换
			convert();
		} else {
			// 对于视频，设置定时器
			if (intervalIdRef.current) {
				clearInterval(intervalIdRef.current);
			}
			// 只有在更新状态为 true 时才设置定时器
			if (isUpdating) {
				if (isVideoPlaying) {
					intervalIdRef.current = setInterval(convert, 20);
				} else {
					setTimeout(() => {
						convert();
					}, 1000);
				}
			}
		}

		return () => {
			if (intervalIdRef.current) {
				clearInterval(intervalIdRef.current);
			}
		};
	}, [file, previewUrl, fontSize, isUpdating, isVideoPlaying]);
	const togglePlay = async () => {
		if (videoRef.current) {
			if (videoRef.current.paused) {
				videoRef.current.play();
				setIsUpdating(true); // 播放时开启更新
				setIsVideoPlaying(true);
			} else {
				videoRef.current.pause();
				setIsUpdating(false); // 暂停时关闭更新
				setIsVideoPlaying(false);
			}
		}
	};

	const restart = () => {
		if (!videoRef.current) return;
		videoRef.current.currentTime = 0;
		videoRef.current.play();
		setIsUpdating(true); // 重启时开启更新
	};

	return (
		<Card className="w-full">
			<CardHeader>
				<CardTitle>预览</CardTitle>
				<CardDescription>调整和预览 ASCII 艺术效果</CardDescription>
				<div className="flex items-center gap-4">
					<Button onClick={() => setShowVideo(!showVideo)} variant="outline">
						{showVideo ? '隐藏' : '显示'}原始内容
					</Button>
					{isVideo && (
						<div className="flex items-center gap-2">
							<Button variant="outline" size="icon" onClick={togglePlay}>
								{isVideoPlaying ? (
									<Pause className="h-4 w-4" />
								) : (
									<Play className="h-4 w-4" />
								)}
							</Button>
							<Button variant="outline" size="icon" onClick={restart}>
								<RefreshCw className="h-4 w-4" />
							</Button>
						</div>
					)}
					<div className="flex flex-1 items-center gap-4">
						<span className="text-sm">字体大小</span>
						<Slider
							value={[fontSize]}
							onValueChange={(values) => setFontSize(values[0])}
							min={2}
							max={16}
							step={1}
							className="w-[200px]"
						/>
						<span className="text-sm">{fontSize}px</span>
					</div>
				</div>
			</CardHeader>
			<CardContent>
				<ResizablePrimitive.PanelGroup
					direction="horizontal"
					className="h-[600px] max-h-[80vh] rounded-lg border relative"
				>
					<ResizablePrimitive.Panel
						defaultSize={50}
						minSize={30}
						className={`p-3 ${showVideo && !isMobile() ? '' : 'absolute left-[-10000px] top-[-10000px] w-1/2 h-auto'}`}
					>
						<div className="h-full overflow-hidden rounded-md">
							{isVideo ? (
								<video
									crossOrigin="anonymous"
									ref={videoRef}
									src={previewUrl}
									onClick={togglePlay}
									className="h-full w-full object-contain"
									controls={false}
								/>
							) : (
								<img
									ref={imageRef}
									src={previewUrl}
									alt="Original"
									className="h-full w-full object-contain"
								/>
							)}
						</div>
					</ResizablePrimitive.Panel>

					<ResizablePrimitive.PanelResizeHandle className="w-2 bg-muted/50 hover:bg-muted/80">
						<div className="flex h-full w-full items-center justify-center">
							<FlipHorizontal className="h-4 w-4" />
						</div>
					</ResizablePrimitive.PanelResizeHandle>

					<ResizablePrimitive.Panel
						defaultSize={50}
						minSize={30}
						className="p-3 content"
					>
						<pre
							ref={txtRef}
							onClick={togglePlay}
							className=" leading-none whitespace-pre cursor-pointer"
							style={{
								fontSize: `${fontSize}px`,
								transform: asciiText
									? `scale(${fontSize * 0.167}, ${fontSize / 5})`
									: 'none'
							}}
						>
							{asciiText}
							{!asciiText && (
								<span className="!text-[16px]"> 等待生成 ASCII 内容...</span>
							)}
						</pre>
					</ResizablePrimitive.Panel>
				</ResizablePrimitive.PanelGroup>
			</CardContent>
			{/* canvas 元素，用来生成 ASCII */}
			<canvas ref={canvasRef} className="hidden" />
		</Card>
	);
}
