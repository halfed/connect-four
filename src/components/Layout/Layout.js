import React from 'react';
import Aux from '../../hoc/Auxilary';

const Layout = (props) => (
	<Aux>
		<div>Connect Four</div>
		<main>
			{props.children}
		</main>
	</Aux>
);

export default Layout;