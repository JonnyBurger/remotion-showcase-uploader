import Link from 'next/link';
import Router, {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import useSwr from 'swr';
import Button from '../../components/button';
import FullpageLoader from '../../components/fullpage-loader';
import Layout from '../../components/layout';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

type Props = null;

const Asset: React.FC<Props> = () => {
	const router = useRouter();
	const [isDarkMode, setIsDarkMode] = useState(false);

	const {data, error} = useSwr(
		() => (router.query.id ? `/api/assets/${router.query.id}` : null),
		fetcher,
		{refreshInterval: 5000}
	);

	const asset = data?.asset;

	let errorMessage;
	let errorDetails;

	if (error) {
		errorMessage = 'Error fetching api';
	}

	if (data?.error) {
		errorMessage = data.error;
	}

	useEffect(() => {
		if (asset?.playback_id && asset.status === 'ready') {
			// Comment out the next line to simulate a constant 'Preparing...' state
			Router.push(`/v/${asset.playback_id}`);
		}
	}, [asset]);

	useEffect(() => {
		/*
		 * We want the page to finish rendering with light mode,
		 * Then after load toggle to dark mode, which does a transition animation
		 */
		setTimeout(() => setIsDarkMode(true));
	}, []);

	if (asset && asset.status === 'errored') {
		errorMessage =
			'Error creating this asset: Please upload a valid video file (gifs are not supported)';
		errorDetails = asset.errors?.messages[0];
	}

	if (errorMessage) {
		return (
			<Layout darkMode={false}>
				<div>
					<h1>{errorMessage}</h1>
				</div>
				{errorDetails && <p>{errorDetails}</p>}
				<div>
					<Link href="/">
						<Button>Home</Button>
					</Link>
				</div>
			</Layout>
		);
	}

	return (
		<Layout centered darkMode={isDarkMode}>
			<FullpageLoader text="Preparing" />
		</Layout>
	);
};

export default Asset;
