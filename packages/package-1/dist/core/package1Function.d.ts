interface Package1FunctionProps {
    propA: number;
}
interface Package1Function {
    (props: Package1FunctionProps): `propA: ${Package1FunctionProps['propA']}`;
}
/** Docs for package1Function */
declare const package1Function: Package1Function;
export { package1Function };
//# sourceMappingURL=package1Function.d.ts.map