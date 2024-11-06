import React from 'react'
import { GoArrowRight } from "react-icons/go";

const HomeNewsCard = () => {
  return (
    <div className="flex flex-col lg:flex-row border border-black rounded-[50px] p-5">
            <img
              className="h-[200px] w-full lg:w-60 object-cover rounded-3xl mb-4 lg:mb-0 lg:mr-4"
              src="https://mi.polinela.ac.id/wp-content/uploads/2021/12/bursa_kerja_it_bootcamp_enigmacamp_d3_mi_polinela.jpg"
              alt="Campaign 1"
            />
            <div className="flex flex-col justify-between">
              <h3 className="text-[#25292c] text-lg font-bold mt-5">
                10 Creative Ways to Raise Money for Your Favorite Charity
              </h3>
              <p className="text-[#8e8e93] text-xs font-normal">
                Lorem ipsum dolor sit amet consectetur. Amet mattis tellus et as
                ectus orc.
              </p>
              <button className="text-[#e17153] mt-5">
                <div className="flex items-center text-sm font-bold">
                  <span>Read Post</span>
                  <GoArrowRight style={{ fontWeight: "bold" }} />
                </div>
              </button>
            </div>
          </div>
  )
}

export default HomeNewsCard