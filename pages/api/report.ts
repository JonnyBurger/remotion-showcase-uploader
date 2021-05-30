import {NextApiRequest, NextApiResponse} from 'next';
import {sendAbuseReport} from '../../lib/slack-notifier';

const notify = async ({
	playbackId,
	reason,
	comment,
}: {
	playbackId: string;
	reason: string;
	comment?: string;
}) => {
	try {
		await sendAbuseReport({playbackId, reason, comment});
	} catch (e) {
		console.error('Error reporting to slack', e); // eslint-disable-line no-console
	}
};

export default async (
	req: NextApiRequest,
	res: NextApiResponse
): Promise<void> => {
	const {method} = req;

	switch (method) {
		case 'POST':
			await notify(req.body);
			res.json({message: 'thank you'});
			break;
		default:
			res.setHeader('Allow', ['POST']);
			res.status(405).end(`Method ${method} Not Allowed`);
	}
};
