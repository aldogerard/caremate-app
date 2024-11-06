import React, { useState } from "react";
import { PiCalendarDotsThin } from "react-icons/pi";
import { RiVerifiedBadgeFill } from "react-icons/ri";


const CampaignDetails = () => {
  const article =
    "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet.";
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };
  const maxLength = 300;
  return (
    <div className="m-4 md:m-6 h-screen">
      <h1 className="text-4xl font-bold">
        Berbagi Alat Tulis Kepada Penggapai Mimpi
      </h1>
      <div className="flex flex-col md:flex-row md:space-x-5 mt-10">
        <div className="flex-1">
          <img
            src="https://mi.polinela.ac.id/wp-content/uploads/2021/12/bursa_kerja_it_bootcamp_enigmacamp_d3_mi_polinela.jpg"
            alt="Campaign 1"
            className="w-full h-auto"
          />
          <div className="flex flex-row items-center mt-4 space-x-1">
            <RiVerifiedBadgeFill style={{ color: "green" , width: "40px", height: "40px"}} />
            <h3 className="text-sm md:text-base">
              Griyatim Fathia is organizing this campaign
            </h3>
          </div>

          <div className="w-full border mt-5">

          </div>
          <p className="mt-5 lg:text-lg text-justify">
            {isExpanded ? article : `${article.slice(0, maxLength)}...`}
          </p>
          <button
            onClick={toggleReadMore} // Toggle status ketika diklik
            className="text-blue-500 hover:underline font-semibold"
          >
            {isExpanded ? "Read Less" : "Read More"} {/* Ubah teks tombol */}
          </button>
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
            className="bg-[#0b826c] text-white rounded-2xl px-5 py-2 mx-auto text-lg mt-5"
            onClick={() => navigate("/news")}
          >
            More News
          </button>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetails;
