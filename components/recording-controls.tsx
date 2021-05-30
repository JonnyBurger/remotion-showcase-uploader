import React from 'react';
import {RecordState} from '../types';
import Button from './button';

type Props = {
	recordState: RecordState;
	isLoadingPreview: boolean;
	isReviewing: boolean;
	startRecording: () => void;
	cancelRecording: () => void;
	stopRecording: () => void;
	submitRecording: () => void;
	reset: () => void;
};

const RecordingControls: React.FC<Props> = ({
	recordState,
	isLoadingPreview,
	isReviewing,
	startRecording,
	cancelRecording,
	stopRecording,
	submitRecording,
	reset,
}) => {
	const renderRecordingControl = React.useCallback(() => {
		if (isReviewing) {
			return null;
		}

		if (recordState === RecordState.IDLE) {
			return (
				<Button type="button" onClick={startRecording}>
					Start recording
				</Button>
			);
		}

		if (recordState === RecordState.PREPARING) {
			return (
				<Button type="button" onClick={cancelRecording}>
					Cancel recording
				</Button>
			);
		}

		if (RecordState.RECORDING) {
			return (
				<Button type="button" onClick={stopRecording}>
					Stop recording
				</Button>
			);
		}
	}, [
		isReviewing,
		recordState,
		startRecording,
		cancelRecording,
		stopRecording,
	]);

	return (
		<div className="container">
			<div className="button">{renderRecordingControl()}</div>
			<div className="button">
				<Button
					type="button"
					onClick={submitRecording}
					disabled={!isReviewing || isLoadingPreview}
				>
					{isLoadingPreview ? 'Loading preview...' : 'Submit'}
				</Button>
			</div>
			<div className="button">
				<Button type="button" onClick={reset}>
					Reset
				</Button>
			</div>
			<style jsx>
				{`
					.container {
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
					.container .button {
						margin: 8px 0;
					}
				`}
			</style>
		</div>
	);
};

export default RecordingControls;
