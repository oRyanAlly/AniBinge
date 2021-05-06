import React from 'react';
import styled from 'styled-components';
const Card = styled.div`
	display: flex;
	width: 225px;
	height: 318px;
	padding-right: 10px;
	justify-content: center;
	overflow: hidden;
	cursor: pointer;
	animation: 1s ease-out 0s 1 fadeIn;

	@keyframes fadeIn {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
	:hover {
		img {
			opacity: 0.3;
			transition: all 0.8s ease-in;
		}
		p {
			visibility: visible;
			opacity: 1;
			transition: all 1s ease-in;
		}
	}

	img {
		object-fit: contain;
		width: 225px;
		height: 318px;
		transition: all 1s ease-out;
	}

	p {
		position: absolute;
		width: 225px;
		color: white;
		align-self: flex-end;
		text-align: center;
		text-shadow: 2px 2px #323234;
		margin-bottom: 135px;
		visibility: none;
		opacity: 0;
		transition: all 1s ease-out;
	}
`;
export function Anime(props) {
	return (
		<div>
			<Card>
				<img
					src={props.src}
					className="animePoster"
					key={props.mal_id}
					alt=""
				/>
				<p>{props.title}</p>
			</Card>
		</div>
	);
}
export default Anime;
