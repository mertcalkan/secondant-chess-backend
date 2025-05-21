export const API = {
  BASE_URL: "https://secondant-chess-backend.onrender.com/",
  headers: {
    accept: "/",
  },
};

export const fetchGames = async () => {
  const response = await fetch("https://secondant-chess-backend.onrender.com/api/games"); 
  if (!response.ok) {
    throw new Error("Failed to fetch games");
  }
  return response.json();
};

export const fetchPositions = async () => {
  const response = await fetch("https://secondant-chess-backend.onrender.com/api/positions"); 
  if (!response.ok) {
    throw new Error("Failed to fetch games");
  }
  return response.json();
};
export const fetchGameDetails = async (
  gameId: string
): Promise<GameDetails> => {
  try {
    const response = await fetch(
      `${API.BASE_URL}/game/${gameId}`,
      {
        method: "GET",
        headers: API.headers,
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch game details: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching game details:", error);
    throw error;
  }
};