//types
import { Store } from '@interfaces/supabase';
import AddStoreFormProps from '@interfaces/Stores/AddStoreForm';
//lib
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
//mui
import { Button, TextField, Typography, Grid } from '@mui/material';

/**
 * The yup validation for the store
 */
const validationSchema = yup.object({
	store_info: yup.string().min(5, 'Should be at least 5 characters').required('Store info is required'),
	store_name: yup.string().min(5, 'Should be at least 5 characters').required('Store name is required'),
	store_unit: yup.string().min(5, 'Should be at least 5 characters').required('Store unit is required'),
	weekdays: yup.string().min(5, 'Should be at least 5 characters').required('Weekdays opening hours are required'),
	weekends_ph: yup.string().min(5, 'Should be at least 5 characters').required('Weekends/PH opening hours are required'),
	closed: yup.string().min(5, 'Should be at least 5 characters').required('Closed days are required'),
});

/**
 * Renders the add store form
 *
 * @param {AddStoreFormProps} props - The onAddStore callback and store id
 * @returns {JSX.Element} - The add store form
 */
const AddStoreForm = ({ onAddStore, id }: AddStoreFormProps): JSX.Element => {
	const formik = useFormik({
		initialValues: {
			store_info: '',
			store_name: '',
			store_unit: '',
			weekdays: '',
			weekends_ph: '',
			closed: '',
		},
		validationSchema: validationSchema,
		onSubmit: async (values) => {
			formik.resetForm();
			const data = await axios.post(`/api/stores/${id}`, values);
			onAddStore(data.data as Store);
		},
	});

	return (
		<form onSubmit={formik.handleSubmit}>
			<Typography variant='h5' sx={{ mb: 2 }}>
				Add a new store
			</Typography>
			<Grid container spacing={1.2}>
				<Grid item xs={12} md={6}>
					<TextField
						fullWidth
						id='store_name'
						name='store_name'
						label='Store Name'
						value={formik.values.store_name}
						onChange={formik.handleChange}
						error={formik.touched.store_name && Boolean(formik.errors.store_name)}
						helperText={formik.touched.store_name && formik.errors.store_name}
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<TextField
						fullWidth
						id='store_unit'
						name='store_unit'
						label='Store Unit No.'
						value={formik.values.store_unit}
						onChange={formik.handleChange}
						error={formik.touched.store_unit && Boolean(formik.errors.store_unit)}
						helperText={formik.touched.store_unit && formik.errors.store_unit}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						fullWidth
						id='store_info'
						name='store_info'
						label='Store Info'
						value={formik.values.store_info}
						onChange={formik.handleChange}
						error={formik.touched.store_info && Boolean(formik.errors.store_info)}
						helperText={formik.touched.store_info && formik.errors.store_info}
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<TextField
						fullWidth
						id='weekdays'
						name='weekdays'
						label='Weekdays Opening Hours'
						value={formik.values.weekdays}
						onChange={formik.handleChange}
						error={formik.touched.weekdays && Boolean(formik.errors.weekdays)}
						helperText={formik.touched.weekdays && formik.errors.weekdays}
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<TextField
						fullWidth
						id='weekends_ph'
						name='weekends_ph'
						label='Weekends/PH Opening Hours'
						value={formik.values.weekends_ph}
						onChange={formik.handleChange}
						error={formik.touched.weekends_ph && Boolean(formik.errors.weekends_ph)}
						helperText={formik.touched.weekends_ph && formik.errors.weekends_ph}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						fullWidth
						id='closed'
						name='closed'
						label='Closed Days'
						value={formik.values.closed}
						onChange={formik.handleChange}
						error={formik.touched.closed && Boolean(formik.errors.closed)}
						helperText={formik.touched.closed && formik.errors.closed}
					/>
				</Grid>
			</Grid>
			<Button sx={{ marginTop: '1rem' }} color='primary' variant='contained' fullWidth size='large' type='submit'>
				Submit
			</Button>
		</form>
	);
};

export default AddStoreForm;
