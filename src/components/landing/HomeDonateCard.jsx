import React from 'react'
import { RiVerifiedBadgeFill } from "react-icons/ri";


const HomeDonateCard = () => {
  return (
    <div className="rounded-[50px] bg-white border border-black relative h-[450px] w-11/12 p-2">
            <img
              className="rounded-[40px] h-1/2 object-cover -mb-4"
              src="https://mi.polinela.ac.id/wp-content/uploads/2021/12/bursa_kerja_it_bootcamp_enigmacamp_d3_mi_polinela.jpg"
              alt="Campaign 1"
            />
            <div className="mx-2">
              <h3 className="text-[#25292c] text-base font-medium mt-8">
                Berbagi Alat Tulis Kepada Penggapai Mimpi
              </h3>
              <div className="flex items-center">
                <RiVerifiedBadgeFill style={{ color: "green" }} />
                <span className="opacity-60 text-[#3d3d3d] text-xs font-normal">
                  Griya Yatim Fathia
                </span>
              </div>

              <div className="flex justify-between items-center mt-6">
                <span className="text-xs opacity-60 text-[#191919]">
                  Raised: Rp 1 juta
                </span>
                <span className="text-xs opacity-60 text-[#191919]">
                  Goal: Rp 2 juta
                </span>
              </div>
              <div className="w-full">
                <div className="h-1.5 bg-[#d9d9d9] rounded-lg mt-1">
                  <div
                    className="h-1 bg-[#e17052] rounded-lg"
                    style={{ width: "40%" }}
                  ></div>
                </div>
                <button className="bg-[#e17153] text-white rounded-3xl py-1 px-1 mt-6 text-sm w-full">
                  Donate Now
                </button>
              </div>
            </div>
          </div>
  )
}

export default HomeDonateCard