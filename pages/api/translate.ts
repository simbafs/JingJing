import { NextApiRequest, NextApiResponse } from 'next';

import translate from '@vitalets/google-translate-api'

export default function hadler(req:NextApiRequest, res: NextApiResponse) {
	const text = (req.query.t as string);
	translate(text, {to: 'en'})
		.then(data => res.status(200).send({ result: data.text }))
		.catch(e => res.status(404).send(e))
}
