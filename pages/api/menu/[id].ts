import { StoreMenus } from '@interfaces/supabase';
import type { NextApiRequest, NextApiResponse } from 'next';
import cors from '@utils/cors';
import { addMenuItem, getMenuItemsByStore } from '@utils/storeData';

export default async function handler(req: NextApiRequest, res: NextApiResponse<StoreMenus[] | StoreMenus>) {
	await cors(req, res);

	const {
		query: { id },
		method,
		body,
	} = req;

	if (method === 'POST') {
		try {
			const menuItem = await addMenuItem(id as string, body.item_name, body.item_price);
			return res.status(201).json(menuItem);
		} catch (err) {
			console.log(err);
			return res.status(500).end();
		}
	}

	if (method === 'GET') {
		try {
			const menuItems = await getMenuItemsByStore(id as string);
			return res.status(200).json(menuItems);
		} catch (err) {
			console.log(err);
			return res.status(500).end();
		}
	}
}
