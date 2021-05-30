import {forwardRef, ReactNode, Ref} from 'react';

type Props = {
	buttonLink?: boolean;
	onClick?: () => void;
	href?: string;
	disabled?: boolean;
	otherProps?: unknown;
	fullW?: boolean;
	type?: 'button' | 'submit' | 'reset' | undefined;
	children: string | ReactNode;
};

type ButtonOrAnchor = Ref<HTMLButtonElement | HTMLAnchorElement>;

const Button = forwardRef<ButtonOrAnchor, Props>((props, ref) => {
	const {
		buttonLink,
		type,
		children,
		onClick,
		href,
		fullW,
		disabled,
		...otherProps
	} = props;
	return (
		<>
			{buttonLink ? (
				<a
					{...otherProps}
					ref={ref as Ref<HTMLAnchorElement>}
					href={href}
					onClick={onClick}
				>
					{children}
				</a>
			) : (
				<button
					ref={ref as Ref<HTMLButtonElement>}
					// eslint-disable-next-line react/button-has-type
					type={type || 'button'}
					onClick={onClick}
					{...otherProps}
				>
					{children}
				</button>
			)}
			<style jsx>
				{`
					button {
						cursor: pointer;
						width: ${fullW ? '100%' : 'auto'};
					}
					a {
						text-decoration: none;
						display: inline-block;
					}
					a,
					button {
						font-size: 26px;
						font-family: --apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
							Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
							sans-serif;
						line-height: 33px;
						background: #fff;
						border: 2px solid ${disabled ? '#b0b0b0' : '#222222'};
						color: ${disabled ? '#b0b0b0' : '#222222'};
						padding: 10px 20px;
						border-radius: 50px;
						transition: all 0.2s ease;
					}
					button:hover {
						background: ${disabled ? '#fff' : '#222'};
						color: ${disabled ? '#b0b0b0' : '#fff'};
						cursor: ${disabled ? 'not-allowed' : 'pointer'};
					}
				`}
			</style>
		</>
	);
});

export default Button;
