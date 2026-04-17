//mui
import { Box, Typography, Link } from '@mui/material';

/**
 * Renders the footer component
 *
 * @returns {JSX.Element} - The footer component
 */
const Footer = (): JSX.Element => {
	return (
		<Box
			sx={{
				bgcolor: 'rgba(10, 20, 36, 0.96)',
				color: 'rgba(255, 255, 255, 0.9)',
				mt: 8,
				py: 4,
				px: 2,
				display: 'flex',
				justifyContent: 'center',
				flexWrap: 'wrap',
				gap: 2,
				borderTop: '1px solid rgba(255,255,255,0.1)',
			}}
			component='footer'
		>
			<Typography variant='subtitle2' align='center' color='inherit' gutterBottom>
				Built by
				<Link underline='hover' href='https://github.com/seangoats'>
					@seangoats&nbsp;
				</Link>
			</Typography>
			<Typography variant='subtitle2' align='center' color='inherit' gutterBottom>
				| {'Copyright © 2022 '}{' '}
				<Link underline='hover' color='inherit' href='https://github.com/seangoats/HawkerHawk'>
					Hawker Hawk
				</Link>{' '}
			</Typography>
		</Box>
	);
};

export default Footer;
