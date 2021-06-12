import {GetStaticPaths, GetStaticProps} from 'next';
import {useRouter} from 'next/router';
import {useEffect, useRef, useState} from 'react';
import FullpageLoader from '../../../components/fullpage-loader';
import Layout from '../../../components/layout';
import ReportForm from '../../../components/report-form';
import VideoPlayer from '../../../components/video-player';
import {HOST_URL} from '../../../constants';
import logger from '../../../lib/logger';

type Params = {
	id: string;
};

export type Props = {
	playbackId: string;
	poster: string;
};

export const getStaticProps: GetStaticProps = async (context) => {
	const {params} = context;
	const {id: playbackId} = params as Params;
	const poster = `https://image.mux.com/${playbackId}/thumbnail.png`;
	const shareUrl = `${HOST_URL}/v/${playbackId}`;

	return {props: {playbackId, shareUrl, poster}};
};

export const getStaticPaths: GetStaticPaths = async () => {
	return {
		paths: [],
		fallback: true,
	};
};

const META_TITLE = 'Remotion Showcase Upload';
const Playback: React.FC<Props> = ({playbackId, poster}) => {
	const [isLoaded, setIsLoaded] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const [size, setSize] = useState<null | {
		width: number;
		height: number
	}>(null)
	const [openReport, setOpenReport] = useState(false);
	const copyTimeoutRef = useRef<number | null>(null);
	const router = useRouter();


	useEffect(() => {
		return () => {
			if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
		};
	}, []);

	if (router.isFallback) {
		return (
			<Layout
				metaTitle="View this video"
				image={poster}
				centered
				darkMode
			>
				<FullpageLoader text="Loading player..." />;
			</Layout>
		);
	}

	const onError = (evt: ErrorEvent) => {
		setErrorMessage('This video does not exist');
		setIsLoaded(false);
		logger.error('Error', evt);
	};

	const showLoading = !isLoaded && !errorMessage;

	const startTime =
		(router.query?.time && parseFloat(router.query.time as string)) || 0;


	const currentDate = new Date()
	const dateString = `${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}-${currentDate.getFullYear()}`

	return (
		<Layout
			metaTitle={META_TITLE}
			image={poster}
			centered={showLoading}
			darkMode
		>
			{errorMessage && <h1 className="error-message">{errorMessage}</h1>}
			{showLoading && <FullpageLoader text="Loading player" />}
			<div className="wrapper">
				{!openReport && (
					<VideoPlayer
						playbackId={playbackId}
						poster={poster}
						currentTime={startTime}
						onLoaded={() => setIsLoaded(true)}
						onError={onError}
						onSize={s => setSize(s)}
					/>
				)}
				<div style={{
					color: 'white'
				}}>
					
					<pre>
						{`
{
	title: "<enter title>",
	type: "mux_video",
	muxId: "${playbackId}",
	description: (
		<>
			Add a description here
		</>
	),
	height: ${size ? size.height : 'Loading, please wait...'},
	width: ${size ? size.width : 'Loading please wait...'},
	submittedOn: new Date("${dateString}"),
	links: [
		{
			type: "source_code",
			url: "<add github url or delete this object>",
		},
		{
			type: "video",
			url: "<add video link or delete this object>",
		},
		{
			type: "website",
			url: "<add product link or delete this object>",
		},
		{
			type: "tutorial",
			url: "<add link to tutorial or delete this object>",
		},
	],
},
						`}
					</pre>
				</div>

				<div className="actions">
					{!openReport && (
						<a
							onClick={() => setOpenReport(!openReport)}
							onKeyPress={() => setOpenReport(!openReport)}
							role="button"
							tabIndex={0}
							className="report"
						>
							{openReport ? 'Back' : 'Report abuse'}
						</a>
					)}
				</div>
				<div className="report-form">
					{openReport && (
						<ReportForm
							playbackId={playbackId}
							close={() => setOpenReport(false)}
						/>
					)}
				</div>
			</div>
			<style jsx>
				{`
					.actions a:first-child {
						padding-right: 30px;
					}
					.error-message {
						color: #ccc;
					}
					.report-form {
						margin-top: 20px;
					}
					.wrapper {
						display: ${isLoaded ? 'flex' : 'none'};
						flex-direction: column;
						flex-grow: 1;
						align-items: center;
						justify-content: center;
					}
				`}
			</style>
		</Layout>
	);
};

export default Playback;
