import React, { useContext, useEffect } from "react";
import { Helmet } from "react-helmet";
import { MediaContext } from "../Context/MediaContext";
import { SearchContext } from "../Context/SearchContext";
import Loader from "../Loader/Loader";
import MovieItems from "../MovieItems/MovieItems";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCreative, Keyboard } from "swiper"
import 'swiper/css';
import 'swiper/css/bundle'
import{ useRef, useState } from "react";
// Import Swiper React components


// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";



// import required modules
import { EffectCoverflow, Pagination } from "swiper";

export default function Home() {
    let { search, searchToApi } = useContext(SearchContext);
    let { TrendingAll,trendingMovies, trendingTv, trendingPeople, loading, setLoading } =
      useContext(MediaContext);
    useEffect(() => {
      searchToApi();
      setLoading(false);
    }, [search]);

    console.log(TrendingAll)
    return (
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Home Page</title>
          <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
        {/* {TrendingAll?.length > 0 ? <><Swiper
      slidesPerView={1}
      centeredSlides={false}
      loop={true}
      grabCursor={true}
      effect={"creative"}
      creativeEffect={{
        prev: {
          shadow: true,
          translate: [0, 0, -400],
        },
        next: {
          translate: ["100%", 0, 0],
        },
      }}
      autoplay={{
        delay: 4000,
        disableOnInteraction: false,
      }}
      keyboard={{
        enabled: true,
      }}
      modules={[Keyboard, Autoplay, EffectCreative]}
      className="mySwiper"
    >
      {TrendingAll?.filter(img => img.backdrop_path !== null).map((movie, index) => <SwiperSlide key={index}>
        
        <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} className="slider" />
      </SwiperSlide>)}
    </Swiper></> : <Loader />} */}
        {loading && <Loader />}
        {!loading && (
          <>
            {search.length > 0 ? (
              <div className="row py-5 my-5 align-items-center">
                {search.map((movie, index) => (
                  <MovieItems key={index} movie={movie} />
                ))}
              </div>
            ) : (
              <>
                <div className="row py-5 my-5 align-items-center">
                  <h1 className="fw-bolder text-center  py-3">Trending</h1>
                  <div className="col-md-4 d-flex align-items-center">
                    <div>
                      <div className="brdr mb-3 w-25"></div>
                      <h2 className="h5">
                        Trending Movies <br /> To Watch Right Now
                      </h2>
                      <p className="text-muted py-2">
                        Watched Movies To Watch Right Now
                      </p>
                      <div className="brdr mt-3 w-100 "></div>
                    </div>
                  </div>
                  {trendingMovies
                    .filter((person) => person.profile_path !== null)
                    .slice(0, 10)
                    .map((movie, index) => (
                      <MovieItems key={index} movie={movie} />
                    ))}
                </div>
  
                <div className="row py-5 align-items-center ">
                  <div className="col-md-4 d-flex align-items-center">
                    <div>
                      <div className="brdr mb-3 w-25"></div>
                      <h1 className="h5">
                        Trending Tv <br /> To Watch Right Now
                      </h1>
                      <p className="text-muted py-2">
                        Watched Tv To Watch Right Now
                      </p>
                      <div className="brdr mt-3 w-100 "></div>
                    </div>
                  </div>
  
                  {trendingTv
                    .filter((person) => person.profile_path !== null)
                    .slice(0, 10)
                    .map((movie, index) => (
                      <MovieItems key={index} movie={movie} />
                    ))}
                </div>
  
                <div className="row py-5 align-items-center">
                  <div className="col-md-4 d-flex align-items-center">
                    <div>
                      <div className="brdr mb-3 w-25"></div>
                      <h1 className="h5">
                        Trending People <br /> To Watch Right Now
                      </h1>
                      <p className="text-muted py-2">
                        Watched People To Watch Right Now
                      </p>
                      <div className="brdr mt-3 w-100 "></div>
                    </div>
                  </div>
  
                  {trendingPeople
                    .filter((person) => person.profile_path !== null)
                    .slice(0, 10)
                    .map((movie, index) => (
                      <MovieItems key={index} movie={movie} />
                    ))}
                </div>
              </>
            )}
          </>
        )}
      </>
    );
}
