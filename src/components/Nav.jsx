import styled from "styled-components";
import logo from "../images/apple-logo.png";
import { useState, useEffect } from "react";

const NavWrapper = styled.nav`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	height: 70px;
	background-color: ${(props) => (props.$show ? "#000000" : "transparent")};
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 36px;
	letter-spacing: 16px;
	z-index: 3;
	transition: background-color 0.3s ease;
`;

const Logo = styled.a`
	padding: 0;
	width: 70px;
	font-size: 0;
	display: inline-block;
	margin-bottom: 10px;

	img {
		display: block;
		width: 100%;
	}
`;

const Content = styled.div`
	margin-top: 100px;
	padding: 20px;
	font-size: 18px;
	line-height: 1.6;
`;

const Nav = () => {
	const [show, setShow] = useState(false);

	const listener = () => {
		if (window.scrollY > 50) {
			setShow(true);
		} else {
			setShow(false);
		}
	};

	useEffect(() => {
		window.addEventListener("scroll", listener);
		return () => {
			window.removeEventListener("scroll", listener);
		};
	}, []);

	return (
		<div>
			<NavWrapper $show={show}>
				<Logo href='/'>
					<img src={logo} className='logo' alt='logo' />
				</Logo>
			</NavWrapper>
		</div>
	);
};

export default Nav;
