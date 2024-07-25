import axios from "axios";

const instance = axios.create({
	baseURL: "https://api.themoviedb.org/3",
	params: {
		api_key: "bec53d8a3009edc1adbfcbbf0982bbd0",
		language: "ko-KR",
	},
});

export default instance;
