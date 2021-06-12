import Head from 'next/head';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {useDropzone} from 'react-dropzone';
import {MUX_HOME_PAGE_URL} from '../constants';
import {breakpoints, transitionDuration} from '../style-vars';
import Asterisk from './asterisk';

const AsteriskLink: React.FC = () => {
	return <Asterisk />;
};

const FOOTER_HEIGHT = '100px';

type Props = {
	title?: string;
	description?: string;
	metaTitle?: string;
	metaDescription?: string;
	image?: string;
	onFileDrop?: (acceptedFiles: File[]) => void;
	darkMode?: boolean;
	centered?: boolean;
	backNav?: boolean;
};

const Layout: React.FC<Props> = ({
	title,
	description,
	metaTitle,
	metaDescription,
	image = '/stream-new-og-image.png',
	onFileDrop,
	darkMode,
	centered,
	backNav,
	children,
}) => {
	const router = useRouter();
	const {getRootProps, isDragActive} = useDropzone({onDrop: onFileDrop});
	const isDroppablePage = Boolean(onFileDrop);
	const containerProps = isDroppablePage ? getRootProps() : {};

	return (
		<>
			<Head>
				<title>Remotion Showcase Uploader</title>
				<link rel="shortcut icon" type="image/x-icon" href="https://www.remotion.dev/img/logo-small.png" />
				{metaTitle && <meta property="twitter:title" content={metaTitle} />}
				{metaDescription && (
					<meta property="og:description" content={description} />
				)}
				{metaDescription && (
					<meta property="twitter:description" content={description} />
				)}
				{image && <meta property="og:image" content={image} />}
				{image && (
					<meta property="twitter:card" content="summary_large_image" />
				)}
				{image && <meta property="twitter:image" content={image} />}
			</Head>
			<div className="container" {...containerProps}>
				<div className={`drag-overlay ${isDragActive ? 'active' : ''}`}>
					<h1>Upload</h1>
				</div>

				<main>
					<div className={`${centered ? 'content-wrapper-centered' : ''}`}>
						{children}
					</div>
				</main>
				<div className="footer-wrapper">
					<footer>
						<div className="nav">
							{backNav ? (
								<div className="footer-link back">
									<a onClick={() => router.back()} role="presentation">
										Back
									</a>
								</div>
							) : (
								<>
									<div>
										<Link href="/">
											<a style={{mixBlendMode: 'normal'}}>
												<AsteriskLink />
											</a>
										</Link>
									</div>
									<div style={{width: 20}} />
									<div className="footer-link mux">
										Uploader by <a href={MUX_HOME_PAGE_URL}>Mux</a>
									</div>
									<div className="divider" />
									<div className="footer-link terms">
										<Link href="/terms">
											<a>Terms</a>
										</Link>
									</div>
								</>
							)}
						</div>
					</footer>
				</div>

				<style jsx>
					{`
						.content-wrapper-centered {
							display: flex;
							flex-direction: column;
							align-items: center;
							min-height: 100%;
						}
						.container {
							transition: background ${transitionDuration} ease;
							outline: none;
						}
						.drag-overlay {
							min-height: 100%;
							width: 100%;
							position: absolute;
							z-index: 1;
							background-color: rgba(226, 253, 255, 0.95);
							transition: 0.5s;
							display: none;
							flex-direction: column;
							justify-content: center;
							align-items: center;
						}

						.drag-overlay h1 {
							font-size: 46px;
							line-height: 46px;
							text-align: center;
						}

						.drag-overlay.active {
							display: flex;
						}

						main {
							padding: 40px;
							margin-bottom: -${FOOTER_HEIGHT};
						}

						.footer-wrapper {
							width: 100%;
							margin-top: 80px;
						}
						footer {
							width: 100%;
							display: flex;
							align-items: center;
							justify-content: space-between;
							padding-left: 30px;
							padding-right: 30px;
							height: ${FOOTER_HEIGHT};
						}

						.nav {
							display: flex;
							align-items: center;
						}

						.divider {
							display: block;
							margin: 0 20px;
							height: 26px;
							width: 2px;
							mix-blend-mode: exclusion;
							background-color: #f8f8f8;
							opacity: 0.4;
						}
						.footer-link {
							font-size: 26px;
							line-height: 33px;
							mix-blend-mode: exclusion;
							color: #f8f8f8;
							opacity: 0.85;
						
						}

						.footer-link a,
						.footer-link a:visited {
							mix-blend-mode: exclusion;
							color: #f8f8f8;
							cursor: pointer;
							text-decoration: none;
							border-bottom: 2px solid #f8f8f8;
						}

						.footer-link.back a {
							border-bottom: 2px solid #f8f8f8;
						}

						.drag-overlay h1 {
							font-size: 96px;
							line-height: 120px;
						}
						.nav > .footer-link {
							padding-right: 0;
						}

						.footer-link a,
						.footer-link a:visited {
							border-bottom: 2px solid #f8f8f8;
						}

						.footer-link.mux {
							display: block;
						}

						.footer-link.terms {
							display: block;
						}

						.footer-link a:hover {
							opacity: 0.5;
						}

						@keyframes rotation {
							from {
								transform: rotate(0deg);
							}
							to {
								transform: rotate(359deg);
							}
						}
					`}
				</style>

				<style jsx global>
					{`
						html,
						body,
						#__next,
						.container {
							background: ${darkMode ? '#111' : '#f8f8f8'};
							min-height: 100%;
							-webkit-font-smoothing: antialiased;
						}
						p {
							font-size: 18px;
							line-height: 20px;
						}

						html,
						body,
						a,
						a:visited {
							padding: 0;
							margin: 0;
							font-family: --apple-system, BlinkMacSystemFont, 'Segoe UI',
								Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
								sans-serif;
						}

						a,
						a:visited {
							cursor: pointer;
							mix-blend-mode: exclusion;
							color: #f8f8f8;
						}

						p {
							mix-blend-mode: exclusion;
							color: #f8f8f8;
						}

						h1 {
							mix-blend-mode: exclusion;
							color: #f8f8f8;
						}

						h1 {
							font-family: --apple-system, BlinkMacSystemFont, 'Segoe UI',
								Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
								sans-serif;
							font-style: normal;
							font-weight: normal;
							font-size: 36px;
							line-height: 45px;
							margin: 0;
							text-align: left;
							max-width: 90vw;
						}

						h2 {
							font-family: --apple-system, BlinkMacSystemFont, 'Segoe UI',
								Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
								sans-serif;
							font-style: normal;
							font-weight: normal;
							font-size: 20px;
							line-height: 33px;
						}

						select {
							padding: 5px;
							font-family: --apple-system, BlinkMacSystemFont, 'Segoe UI',
								Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
								sans-serif;
							background: transparent;
							font-size: 20px;
							color: #222;
							width: 400px;
							line-height: 20px;
							border: none;
							background: #e8e8e8;
							border-radius: 5px;
						}

						select:hover {
							opacity: 0.75;
						}

						* {
							box-sizing: border-box;
						}

						::selection {
							background: darkgray;
							color: white;
						}

						@media only screen and (min-width: ${breakpoints.md}px) {
							h1 {
								font-size: 5vw;
								line-height: 6vw;
								text-align: left;
								max-width: 60vw;
							}
							p {
								font-size: 26px;
								line-height: 38px;
							}
						}

						@keyframes rotation {
							from {
								transform: rotate(0deg);
							}
							to {
								transform: rotate(359deg);
							}
						}
					`}
				</style>
			</div>
		</>
	);
};

export default Layout;
