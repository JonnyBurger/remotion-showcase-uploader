interface Props {
	size?: number;
}

const Asterisk: React.FC<Props> = () => (
	<img style={{height: 46, width: 46}} src="/logo-small.png" />
);

export default Asterisk;
