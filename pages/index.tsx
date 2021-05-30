import {useCallback, useRef, useState} from 'react';
import Button from '../components/button';
import Layout from '../components/layout';
import UploadProgressFullpage from '../components/upload-progress-fullpage';
import {breakpoints} from '../style-vars';

type Props = null;

const Index: React.FC<Props> = () => {
	const [file, setFile] = useState<File | null>(null);
	const [showUploadPage, setShowUploadPage] = useState(true);
	const inputRef = useRef<HTMLInputElement | null>(null);

	const onDrop = useCallback((acceptedFiles) => {
		if (acceptedFiles?.[0]) {
			setFile(acceptedFiles[0]);
			setShowUploadPage(true);
		} else {
			console.warn('got a drop event but no file'); // eslint-disable-line no-console
		}
	}, []);

	const onInputChange = () => {
		if (inputRef.current?.files?.[0]) {
			setFile(inputRef.current.files[0]);
			setShowUploadPage(true);
		}
	};

	if (file && showUploadPage) {
		return (
			<UploadProgressFullpage
				file={file}
				resetPage={() => setShowUploadPage(false)}
			/>
		);
	}

	return (
		<Layout onFileDrop={onDrop}>
			<div>
				<div>
					<h1>Remotion Showcase</h1>
					<h1>Uploader</h1>
					<h2 style={{maxWidth: '70vw'}}>
						If you{"'"}d like to submit your Remotion creation to the showcase,
						use this page to upload your video. We will host it on a CDN,
						generate a thumbnail and animated GIF hover preview.
					</h2>
					<h2 style={{maxWidth: '70vw'}}>
						After the video has been uploaded, grab the {"'"}muxId{"'"} and make
						a pull request to the Remotion docs. We will review your PR within a
						few days.
					</h2>
				</div>
				<div className="cta">
					<div className="drop-notice">
						<h2>↓ Drag & drop a video file anywhere</h2>
					</div>
					<label htmlFor="file-input">
						<Button type="button" onClick={() => inputRef.current?.click()}>
							<span className="cta-text-mobile">Add a video</span>
							<span className="cta-text-desktop">Upload a video</span>
						</Button>
						<input
							ref={inputRef}
							id="file-input"
							type="file"
							onChange={onInputChange}
						/>
					</label>
				</div>
			</div>
			<style jsx>
				{`
					h1 {
						font-weight: bold;
						line-height: 1.2;
					}
					input {
						display: none;
					}
					.drop-notice {
						display: none;
					}

					.cta {
						display: flex;
						flex-direction: column;
						position: absolute;
						right: 0;
						bottom: 0;
						align-items: flex-end;
						justify-content: flex-end;
						margin-bottom: 100px;
						margin-right: 30px;
					}
					.cta .button {
						margin: 8px 0;
					}

					.cta {
						margin-top: 30px;
						display: flex;
						flex-direction: column;
					}
					.cta-text-mobile {
						display: inline-block;
					}
					.cta-text-desktop {
						display: none;
					}

					@media only screen and (min-width: ${breakpoints.md}px) {
						.drop-notice {
							display: block;
							text-align: right;
							float: right;
							color: #fff;
							margin-bottom: 5px;
							opacity: 0.5;
							mix-blend-mode: exclusion;
						}
						.drop-notice h2 {
							margin-top: 0;
						}

						.cta-text-mobile {
							display: none;
						}
						.cta-text-desktop {
							display: inline-block;
						}
					}
				`}
			</style>
		</Layout>
	);
};

export default Index;
