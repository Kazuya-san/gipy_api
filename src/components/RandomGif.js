import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ratingMap, giphy_url } from "../utils/constants";

function RandomGif(props) {
  const firstRenderRef = useRef(true);
  // const [searchVal, setSearchVal] = useState("");
  const [randomGif, setRandomGif] = useState({});
  const [gifs, setGifs] = useState([]);
  const [showRandomGif, setShowRandomGif] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const getrandomGif = async () => {
    const response = await fetch(
      `${giphy_url}/random?api_key=${process.env.REACT_APP_GIPHY_API_KEY}`
    );
    const data = await response.json();
    setRandomGif(data.data);
  };

  useEffect(() => {
    getrandomGif();

    if (props.searchVal.length > 0) {
      let fullUrl = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.REACT_APP_GIPHY_API_KEY}&q=${props.searchVal}&limit=25&offset=0&lang=en`;
      fetch(fullUrl)
        .then((res) => res.json())
        .then((data) => {
          setGifs(data.data);
        });
      setShowRandomGif(false);
    }
  }, []);

  useEffect(() => {
    let interval = setInterval(() => {
      getrandomGif();
    }, 10000);
    return () => clearInterval(interval);
  }, [showRandomGif]);

  const handleSearch = (e) => {
    props.setSearchVal(e.target.value);

    if (e.target.value.length < 2) {
      setShowRandomGif(true);
      setGifs([]);
      return;
    }

    if (e.target.value.length >= 2) {
      let fullUrl = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.REACT_APP_GIPHY_API_KEY}&q=${e.target.value}&limit=25&offset=0&lang=en`;
      fetch(fullUrl)
        .then((res) => res.json())
        .then((data) => {
          setGifs(data.data);
        });
    }
  };

  //console.log(gifs[0]?.images?.fixed_width_small_still?.url);

  const cancelSearch = () => {
    props.setSearchVal("");
    setShowRandomGif(true);
    setGifs([]);
  };

  return (
    <div className="App">
      <div className="search">
        <div className="input-icons">
          <i className="fa fa-search icon"></i>
          <input
            type="text"
            value={props.searchVal}
            placeholder="Search for a gif"
            onChange={(e) => handleSearch(e)}
            className="searchbar input-field"
          />
          {props.searchVal.length >= 2 && (
            <i className="fa fa-close icon2" onClick={cancelSearch}></i>
          )}
          {props.searchVal.length >= 2 && (
            <button onClick={cancelSearch} className="cancelbtn">
              cancel
            </button>
          )}
        </div>
      </div>

      <div className="randomGif">
        {gifs.length < 1 ? (
          <div className="animatedGif">
            <h1>Randomly Selected Gif</h1>
            <img
              className="gif"
              src={randomGif?.images?.original?.url}
              key={randomGif?.images?.original?.url}
            />

            <div className="gifinner">
              <h5>
                {randomGif.title ? randomGif.title : "No title for this Gif"}
              </h5>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexWrap: "wrap",
                  height: "100px",
                  marginTop: "-20px",
                }}
              >
                <div
                  style={{
                    marginRight: "30px",
                  }}
                >
                  <a href={randomGif.bitly_gif_url} target="_blank">
                    {randomGif.bitly_gif_url}
                  </a>
                </div>

                <div className="rating">
                  <h4>{ratingMap[randomGif.rating]}</h4>
                </div>
              </div>

              <div
              // style={{
              //   display: "flex",
              //   justifyContent: "center",
              //   alignItems: "center",
              // }}
              ></div>
            </div>
          </div>
        ) : (
          <div className="conatinerGif">
            {gifs.map((gif, i) => (
              <div className="gifContainerInside" key={i}>
                <Link to={`/gif/${gif.id}`}>
                  <img
                    src={gif.images.fixed_width_still.url}
                    key={gif.images.fixed_width_still.url}
                    className="img"
                  />
                  <h3 className="title">
                    {gif.title ? gif.title : "No title for this Gif"}
                  </h3>
                  {/* <a href={gif.bitly_gif_url} target="_blank">
                  Click here for Gif
                </a>
                <div className="rating">
                  <h4>{ratingMap[gif.rating]}</h4>
                </div> */}
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* <div className="containerGif">
        {true ? (
          <div className="randomGif">
            <img src={randomGif?.images?.original?.url} />
          </div>
        ) : (
          <div>Search Results here</div>
        )}
      </div> */}
    </div>
  );
}

export default RandomGif;
