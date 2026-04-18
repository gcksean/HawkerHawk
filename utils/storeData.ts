import { Store, StoreHours, StoreMenus } from '@interfaces/supabase';
import { randomUUID } from 'crypto';
import { promises as fsPromises } from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'stores.json');

interface StoreData {
	stores: Store[];
}

/** Serialises all write operations within this process to prevent concurrent file corruption */
let writeQueue: Promise<void> = Promise.resolve();

/**
 * Reads the stores data from the JSON file asynchronously
 */
async function readData(): Promise<StoreData> {
	try {
		const raw = await fsPromises.readFile(DATA_FILE, 'utf-8');
		try {
			return JSON.parse(raw) as StoreData;
		} catch {
			throw new Error(`Data file at ${DATA_FILE} is corrupted or contains invalid JSON.`);
		}
	} catch (err: unknown) {
		const isNodeError = (e: unknown): e is NodeJS.ErrnoException => e instanceof Error && 'code' in e;
		if (isNodeError(err) && err.code === 'ENOENT') {
			throw new Error(`Data file not found at ${DATA_FILE}. Ensure data/stores.json exists in the project root.`);
		}
		throw err;
	}
}

/**
 * Writes the stores data back to the JSON file, serialised through a per-process queue
 * to prevent concurrent overwrites corrupting the file.
 */
function writeData(data: StoreData): Promise<void> {
	writeQueue = writeQueue.then(() => fsPromises.writeFile(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8'));
	return writeQueue;
}

/**
 * Returns all stores for a given hawker centre
 */
export async function getStoresByHawkerCentre(hawkerSerialNo: number): Promise<Store[]> {
	const { stores } = await readData();
	return stores.filter((store) => store.hawker_serial_no === hawkerSerialNo);
}

/**
 * Adds a new store (with hours) to the data file and returns the created store
 */
export async function addStore(
	hawkerSerialNo: number,
	storeInfo: string,
	storeName: string,
	storeUnit: string,
	weekdays: string,
	weekendsPh: string,
	closed: string
): Promise<Store> {
	const data = await readData();

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
	await writeData(data);
	return store;
}

/**
 * Adds a menu item to a store and returns the created menu item
 */
export async function addMenuItem(storeId: string, itemName: string, itemPrice: string): Promise<StoreMenus> {
	const data = await readData();

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
	await writeData(data);
	return menuItem;
}

/**
 * Returns all menu items for a given store
 */
export async function getMenuItemsByStore(storeId: string): Promise<StoreMenus[]> {
	const { stores } = await readData();
	const store = stores.find((s) => s.store_id === storeId);
	return store ? store.store_menus : [];
}
