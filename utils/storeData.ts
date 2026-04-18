import { Store, StoreHours, StoreMenus } from '@interfaces/supabase';
import { randomUUID } from 'crypto';
import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'stores.json');

interface StoreData {
	stores: Store[];
}

/**
 * Reads the stores data from the JSON file
 */
function readData(): StoreData {
	const raw = fs.readFileSync(DATA_FILE, 'utf-8');
	return JSON.parse(raw) as StoreData;
}

/**
 * Writes the stores data back to the JSON file
 */
function writeData(data: StoreData): void {
	fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

/**
 * Returns all stores for a given hawker centre
 */
export function getStoresByHawkerCentre(hawkerSerialNo: number): Store[] {
	const { stores } = readData();
	return stores.filter((store) => store.hawker_serial_no === hawkerSerialNo);
}

/**
 * Adds a new store (with hours) to the data file and returns the created store
 */
export function addStore(
	hawkerSerialNo: number,
	storeInfo: string,
	storeName: string,
	storeUnit: string,
	weekdays: string,
	weekendsPh: string,
	closed: string
): Store {
	const data = readData();

	const storeId = randomUUID();
	const hours: StoreHours = {
		store_id: storeId,
		weekdays,
		weekends_ph: weekendsPh,
		closed,
	};
	const store: Store = {
		hawker_serial_no: hawkerSerialNo,
		store_id: storeId,
		store_name: storeName,
		store_info: storeInfo,
		store_unit: storeUnit,
		store_hours: [hours],
		store_menus: [],
	};

	data.stores.push(store);
	writeData(data);
	return store;
}

/**
 * Adds a menu item to a store and returns the created menu item
 */
export function addMenuItem(storeId: string, itemName: string, itemPrice: string): StoreMenus {
	const data = readData();

	const storeIndex = data.stores.findIndex((s) => s.store_id === storeId);
	if (storeIndex === -1) {
		throw new Error(`Store not found: ${storeId}`);
	}

	const menuItem: StoreMenus = {
		store_id: storeId,
		item_id: randomUUID(),
		item_name: itemName,
		item_price: itemPrice,
	};

	data.stores[storeIndex].store_menus.push(menuItem);
	writeData(data);
	return menuItem;
}

/**
 * Returns all menu items for a given store
 */
export function getMenuItemsByStore(storeId: string): StoreMenus[] {
	const { stores } = readData();
	const store = stores.find((s) => s.store_id === storeId);
	return store ? store.store_menus : [];
}
