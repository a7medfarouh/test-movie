import axios from "axios";
import React, { createContext, useState, useEffect } from "react";



export let MediaContext = createContext("");
export default function MediaContextProvider(props) {
  const [TrendingAll, setTrendingAll] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingTv, setTrendingTv] = useState([]);
  const [trendingPeople, setTrendingPeople] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getTrending(mediaType, callback) {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/${mediaType}/day?api_key=44ee5523e457e74020effc2bddc4592e`
    );
    callback(data.results);
    setLoading(false);
    // console.log(data.results);
  }
  async function getTrendingAll() {
    let { data } = await axios.get(
      `https://api.themoviedb.org/4/discover/movie?vote_average.gte=7.8&with_original_language=en&without_genres=16&api_key=f1aca93e54807386df3f6972a5c33b50`
    );
    setTrendingAll(data.results);
  }
  useEffect(() => {
    getTrending("movie", setTrendingMovies);
    getTrending("tv", setTrendingTv);
    getTrending("person", setTrendingPeople);
    getTrendingAll();
  }, []);
  return (
    <>
      <MediaContext.Provider
        value={{
          TrendingAll,
          trendingMovies,
          trendingTv,
          trendingPeople,
          loading,
          setLoading,
          getTrending,
          setTrendingMovies,
          setTrendingTv,
          setTrendingPeople,
        }}
      >
        {props.children}
      </MediaContext.Provider>
    </>
  );
}
