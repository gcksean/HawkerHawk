import { Store } from '@interfaces/supabase';
import type { NextApiRequest, NextApiResponse } from 'next';
import cors from '@utils/cors';
import { addStore, getStoresByHawkerCentre } from '@utils/storeData';

export default async function handler(req: NextApiRequest, res: NextApiResponse<Store[] | Store>) {
	await cors(req, res);

	const {
		query: { id },
		method,
		body,
	} = req;

	if (method === 'POST') {
		try {
			const store = addStore(
				Number(id),
				body.store_info,
				body.store_name,
				body.store_unit,
				body.weekdays,
				body.weekends_ph,
				body.closed
			);
			return res.status(200).json(store);
		} catch (err) {
			console.log(err);
			return res.status(500).end();
		}
	}

	try {
		const stores = getStoresByHawkerCentre(Number(id));
		return res.status(200).json(stores);
	} catch (err) {
		console.log(err);
		return res.status(500).end();
	}
}
