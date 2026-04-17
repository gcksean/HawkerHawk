//type
import HeaderProps from '@interfaces/shared/Header';
//lib
import Link from 'next/link';
//mui
import { AppBar, Toolbar, Typography, Box, Chip } from '@mui/material';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
//components
import SearchBar from '@components/shared/SearchBar';

/**
 * Renders the Header for the pages
 *
 * @param {HeaderProps} - The setFilter function and the searchTerm
 * @returns {JSX.Element} - The header component
 */
const Header = ({ setFilter, searchTerm }: HeaderProps): JSX.Element => (
	<AppBar
		position='sticky'
		elevation={0}
		sx={{
			bgcolor: 'rgba(15, 30, 52, 0.88)',
			backdropFilter: 'blur(10px)',
			borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
		}}
	>
		<Toolbar sx={{ minHeight: '72px !important', gap: 2, py: 1 }}>
			<Link href='/'>
				<a
					style={{
						textDecoration: 'none',
						color: 'inherit',
					}}
				>
					<Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
						<RestaurantMenuIcon sx={{ fontSize: '1.5rem' }} />
						<Typography variant='h6' color='inherit'>
							HawkerHawk
						</Typography>
						<Chip
							label='Singapore'
							size='small'
							sx={{ bgcolor: 'rgba(255, 255, 255, 0.16)', color: '#fff', display: { xs: 'none', md: 'inline-flex' } }}
						/>
					</Box>
				</a>
			</Link>

			<Box sx={{ ml: 'auto', width: { xs: '100%', md: 'min(560px, 60vw)' } }}>
				<SearchBar setFilter={setFilter} searchTerm={searchTerm} />
			</Box>
		</Toolbar>
	</AppBar>
);
export default Header;
