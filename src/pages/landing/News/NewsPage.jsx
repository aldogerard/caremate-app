import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { PiCalendarDotsThin } from "react-icons/pi";

const NewsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const { article } = location.state || {};

  if (!article) return <p>Artikel tidak ditemukan.</p>;

  return (
    <div className="m-4 md:m-6">
      <h1 className="text-4xl font-bold">{article.title}</h1>
      <div className="flex flex-row items-center mt-4 space-x-1">
        <PiCalendarDotsThin style={{ color: "#3d3d3d" }} />
        <h3 className="text-sm md:text-base">{article.date}</h3>
      </div>
      <div className="flex flex-col md:flex-row md:space-x-5 mt-10">
        <div className="flex-1">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-auto"
          />
          <p className="mt-5 lg:text-lg text-justify">{article.description}</p>
        </div>
        <div className="flex flex-col w-full md:w-1/3 px-4 md:px-10">
          <div className="text-black mt-6 lg:mt-0 text-2xl md:text-3xl font-semibold whitespace-nowrap">
            Latest News
          </div>
          {[1, 2, 3].map((item, index) => (
            <div className="flex flex-row space-x-4 lg:mt-5" key={index}>
              <div className="bg-[#0b826c] w-2 h-14 my-1"></div>
              <div className="flex flex-col space-y-1">
                <h3 className="text-lg lg:text-xl font-medium">
                  News Title {item}
                </h3>
                <div className="flex flex-row items-center">
                  <PiCalendarDotsThin style={{ color: "#3d3d3d" }} />
                  <p className="text-[#3d3d3d] text-xs">01 November 2024</p>
                </div>
              </div>
            </div>
          ))}
          <button
            className="bg-[#0b826c] text-white rounded-2xl px-6 py-2 mx-auto textarea-md lg:text-lg mt-5 mr-44 lg:mr-32"
            onClick={() => navigate("/news")}
          >
            More News
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsPage;
