import React from 'react';
import Aux from '../../hoc/Auxilary';
import classes from './Layout.scss';

const Layout = (props) => (
	<Aux>
		<div className={classes.Layout}>
			<h1>Connect Four</h1>
		</div>
		<main>
			{props.children}
		</main>
	</Aux>
);

export default Layout;