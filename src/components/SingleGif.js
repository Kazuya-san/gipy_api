import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ReactComponent as Back } from "../utils/assets/back.svg";
import { ratingMap, giphy_url } from "../utils/constants";

const SingleGif = () => {
  const params = useParams();
  const { id } = params;
  const [Gif, setGif] = useState({});

  useEffect(() => {
    const fetchGif = async () => {
      const response = await fetch(
        `${giphy_url}/${id}?api_key=${process.env.REACT_APP_GIPHY_API_KEY}`
      );
      const data = await response.json();
      setGif(data.data);
    };
    fetchGif();
  }, [id]);

  return (
    <div className="animatedGif">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            marginRight: "90px",
            marginTop: "-15px",
          }}
        >
          <Link to="/">
            <button
              style={{
                backgroundColor: "transparent",
                outline: "none",
                border: "none",
              }}
            >
              he
            </button>
            <Back color="white" fill="white" />
          </Link>
        </div>
        <h1>Selected Gif</h1>
      </div>
      <img
        className="gif"
        src={Gif?.images?.original?.url}
        key={Gif?.images?.original?.url}
      />

      <div className="gifinner">
        <h2
          style={{
            textAlign: "center",
          }}
        >
          {Gif.title ? Gif.title : "No title for this Gif"}
        </h2>
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
            <a href={Gif.bitly_gif_url} target="_blank">
              {Gif.bitly_gif_url}
            </a>
          </div>

          <div className="rating">
            <h4>{ratingMap[Gif.rating]}</h4>
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
  );
};

export default SingleGif;
