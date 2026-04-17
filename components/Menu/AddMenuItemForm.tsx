//types
import { StoreMenus } from '@interfaces/supabase';
import AddMenuItemFormProps from '@interfaces/Menu/AddMenuItemForm';
//lib
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
//mui
import { Button, TextField, Typography, Grid } from '@mui/material';

/**
 * Yup validation schema for the menu items
 */
const validationSchema = yup.object({
	item_price: yup.number().required('Item price is required'),
	item_name: yup.string().min(5, 'Should be at least 5 characters').required('Item name is required'),
});

/**
 * Creates the form that allows to add a menu item
 *
 * @param {AddMenuItemFormProps} props - The onAddItem callback and store id
 * @returns
 */
const AddMenuItemForm = ({ onAddItem, store_id }: AddMenuItemFormProps): JSX.Element => {
	const formik = useFormik({
		initialValues: {
			item_price: 0,
			item_name: '',
		},
		validationSchema: validationSchema,
		onSubmit: async (values) => {
			formik.resetForm();
			const data = await axios.post(`/api/menu/${store_id}`, values);
			console.log(data.data);
			onAddItem(data.data as StoreMenus);
		},
	});

	return (
		<form onSubmit={formik.handleSubmit}>
			<Typography variant='h6' sx={{ mb: 1.5 }}>
				Add menu item
			</Typography>
			<Grid container spacing={1.2}>
				<Grid item xs={12}>
					<TextField
						fullWidth
						id='item_name'
						name='item_name'
						label='Item Name'
						value={formik.values.item_name}
						onChange={formik.handleChange}
						error={formik.touched.item_name && Boolean(formik.errors.item_name)}
						helperText={formik.touched.item_name && formik.errors.item_name}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						fullWidth
						id='item_price'
						name='item_price'
						label='Item Price'
						value={formik.values.item_price}
						onChange={formik.handleChange}
						error={formik.touched.item_price && Boolean(formik.errors.item_price)}
						helperText={formik.touched.item_price && formik.errors.item_price}
					/>
				</Grid>
			</Grid>
			<Button sx={{ marginTop: '1rem' }} color='primary' variant='contained' fullWidth size='large' type='submit'>
				Add
			</Button>
		</form>
	);
};

export default AddMenuItemForm;
