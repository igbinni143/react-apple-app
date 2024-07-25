import { useState, useEffect } from "react";
import axios from "../api/axios";
import requests from "../api/requests";
import styled from "styled-components";

const Banner = () => {
	const [movie, setMovie] = useState(null);
	const [isClicked, setIsClicked] = useState(false);

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		try {
			const request = await axios.get(requests.fetchNowPlaying);
			const movieId =
				request.data.results[Math.floor(Math.random() * request.data.results.length)].id;

			const { data: movieDetail } = await axios.get(`movie/${movieId}`, {
				params: {
					// 필요한 경우 추가 파라미터 설정
				},
			});

			setMovie(movieDetail);
		} catch (error) {
			console.error("Error fetching movie data:", error);
		}
	};

	if (!movie) {
		return <div>Loading...</div>;
	}

	if (isClicked) {
		const videoUrl = `https://www.youtube.com/embed/${movie.videos?.results[0]?.key}`;
		return (
			<Container>
				<iframe
					width='100%'
					height='100%'
					src={videoUrl}
					title='YouTube video player'
					frameBorder='0'
					allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
					allowFullScreen></iframe>
			</Container>
		);
	}

	return (
		<Container>
			<header
				className='banner'
				style={{
					backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
					backgroundPosition: "top center",
					backgroundSize: "cover",
				}}>
				<div className='banner__contents'>
					<h1 className='banner__title'>{movie.title || movie.name || movie.original_name}</h1>
					<div className='banner__buttons'>
						{movie.videos?.results[0]?.key ? (
							<button className='banner__button play' onClick={() => setIsClicked(true)}>
								Play
							</button>
						) : null}
					</div>
					<h1 className='banner__description'>{truncate(movie.overview, 100)}</h1>
				</div>
				<div className='banner--fadeBottom' />
			</header>
		</Container>
	);
};

const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	width: 100%;
	height: 100vh;
`;

const HomeContainer = styled.div`
	width: 100%;
	height: 100%;
`;

export default Banner;
