//types
import { HawkerAPIRecord } from '@interfaces/hawkerCentre';
import CentreProps from '@interfaces/HawkerCentre/Centre';
import { Store } from '@interfaces/supabase';
//libs
import { useState, useEffect } from 'react';
import axios from 'axios';
//mui
import { Container } from '@mui/material';
//components
import DetailedHawkerCard from '@components/HawkerCentre/DetailedHawkerCard';
import Header from '@components/shared/Header';
import Loader from '@components/shared/Loader';
import StoreList from '@components/Stores/StoreList';
import AddStoreModal from '@components/Stores/AddStoreModal';

/**
 *
 * Renders the full centre component for specific centre
 *
 * @param {CentreProps} - The props {id}
 * @returns {JSX.Element} - The Center component
 */
const Centre = ({ id }: CentreProps): JSX.Element => {
	const [hawkerCentre, setHawkerCentre] = useState<HawkerAPIRecord>();
	const [hawkerStores, setHawkerStores] = useState<Store[]>([]);
	const [storeFilter, setStoreFilter] = useState<string>('');
	const [addStore, setAddStore] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(true);

	/**
	 *
	 * Opens the add store form
	 */
	const openAddStoreForm = () => setAddStore(true);

	/**
	 *
	 * Closes the add store form
	 */
	const closeAddStoreForm = () => setAddStore(false);

	/**
	 * Adds the new store to the state
	 *
	 * @param {Store} store - The store added
	 */
	const onAddStore = (store: Store) => {
		setHawkerStores([...hawkerStores, store]);
		setAddStore(false);
	};

	useEffect(() => {
		/**
		 * Fetches the hawker centre info from the gov api
		 */
		const fetchCentre = async () => {
			const axiosRes = await axios.get(`/api/hawker_centre/${id}`);
			const hawkerCentre: HawkerAPIRecord = axiosRes.data;
			setHawkerCentre(hawkerCentre as HawkerAPIRecord);
		};

		/**
		 * Fetches the stores of the centre from backend api
		 */
		const fetchStores = async () => {
			const axiosRes = await axios.get(`/api/stores/${id}`);
			const hawkerStores = axiosRes.data;
			setHawkerStores(hawkerStores as Store[]);
		};

		/**
		 * Fetch the stores and centres
		 */
		const fetchData = async () => {
			await fetchCentre();
			await fetchStores();
			setLoading(false);
		};

		fetchData();
	}, [id]);

	return (
		<>
			<Header setFilter={setStoreFilter} searchTerm='a store' />
			{loading ? (
				<div style={{ marginTop: '10rem' }}>
					<Loader />
				</div>
			) : (
				<Container fixed maxWidth='lg' sx={{ py: { xs: 3, md: 5 } }}>
					<DetailedHawkerCard hawkerCentre={hawkerCentre} addStore={openAddStoreForm} />
					<StoreList stores={hawkerStores} filter={storeFilter} />
					<AddStoreModal open={addStore} closeModal={closeAddStoreForm} onAddStore={onAddStore} id={id} />
				</Container>
			)}
		</>
	);
};

export default Centre;
