//type
import MenuTableProps from '@interfaces/Menu/MenuTable';
import { StoreMenus } from '@interfaces/supabase';
//mui
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

/**
 * Renders a table showing the menu item and price of the store
 *
 * @param {MenuTableProps} - The menu containing item and prices
 * @returns {JSX.Element} - The MenuTable component
 */
const MenuTable = ({ menu }: MenuTableProps): JSX.Element => (
	<TableContainer sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2, mt: 2 }}>
		<Table size='small'>
			<TableHead>
				<TableRow>
					<TableCell>Item</TableCell>
					<TableCell>Price</TableCell>
				</TableRow>
			</TableHead>
			<TableBody>
				{menu.map((item: StoreMenus) => (
					<TableRow key={item.item_id}>
						<TableCell>{item.item_name}</TableCell>
						<TableCell>{`$${item.item_price}`}</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	</TableContainer>
);

export default MenuTable;
