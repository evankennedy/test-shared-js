import React from 'react';

interface Package1ComponentProps {
	propA: number;
}

interface Package1Component {
	(props: Package1ComponentProps): JSX.Element;
}

/** Docs for Package1Component */
const Package1Component: Package1Component = ({ propA }) => <>propA: {propA}</>;

export { Package1Component };
