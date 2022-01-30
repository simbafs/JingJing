import { NextApiRequest, NextApiResponse } from 'next';

import translate from '@vitalets/google-translate-api'
import nodeCache from 'node-cache';

const cache = new nodeCache({ stdTTL: 60 * 60 * 24 });

async function cachedTranslate(text: string): Promise<string>{
	if(cache.has(text)){
		return cache.get(text) as string;
	}else{
		try{
			let result = await translate(text, {to: 'en'});
			cache.set(text, result.text);
			return text;
		}catch(e){
			throw e;
		}
	}
}

export default function hadler(req:NextApiRequest, res: NextApiResponse) {
	const text = (req.query.t as string);
	cachedTranslate(text)
	.then(result => res.status(200).json({ result }))
	.catch(e => res.status(400).json({ error: e }))
}
