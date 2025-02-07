const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/movies`

const index = async () => {
    try {
        const res = await fetch(BASE_URL);

        if (!res.ok) throw new Error("Failed to fetch movies.");

        const data = await res.json();

        return data;
    } catch (err) {
        console.log(err);
    }
}

const getMyMovies = async () => {
    try {
        const res = await fetch(BASE_URL, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });

        const data = await res.json();

        return data;
    } catch (err) {
        console.log(err);
    }
}

const show = async (movieId) => {
    try {
        const res = await fetch(`${BASE_URL}/${movieId}`);

        const data = await res.json();

        return data;
    } catch (err) {
        console.log(err);
    }
}

const create = async (movieFormData) => {
    try {
        const res = await fetch(BASE_URL, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: movieFormData,
        });

        const data = await res.json();

        return data;
    } catch (err) {
        console.log(err)
    }
}

export { index, getMyMovies, show, create }