interface Package1FunctionProps {
	propA: number;
}

interface Package1Function {
	(props: Package1FunctionProps): `propA: ${Package1FunctionProps['propA']}`;
}

/** Docs for package1Function */
const package1Function: Package1Function = ({ propA }) =>
	`propA: ${propA}` as const;

export { package1Function };
