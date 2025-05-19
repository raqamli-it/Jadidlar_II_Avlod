// import React from "react";
// import Marquee from "react-fast-marquee";
// import FakeHavolalar from "../data/Havolalar.json";
// import { DataService } from "../config/dataService";
// import { useState } from "react";
// import { useEffect } from "react";
// import { endpoints } from "../config/endpoints";
// import { useTranslation } from "react-i18next";

// export default function Havolalar() {
//   const { t } = useTranslation();

//   // bu qism api lar bilan ishlash uchun
//   const [apiData, setApiData] = useState();
//   const fetchData = async () => {
//     const response = await DataService.get(endpoints.usefulLink);
//     // console.log(response, "havolalar");
//     setApiData(response);
//   };
//   useEffect(() => {
//     fetchData();
//   }, []);
//   //

//   return (
//     <div className="container_full">
//       <div className="info__lazy" id="aboutus">
//         <div className="text_lazy">
//           <h2>{t("foydali_")}</h2>
//         </div>
//       </div>
//       <div className="lazy">
//         <Marquee pauseOnHover>
//           {apiData?.results?.map((usefulItem, i) => (
//             <div className="item__slide" key={i}>
//               <a href={usefulItem.link}>
//                 <div className="item__img">
//                   <img src={usefulItem.logo_image} alt="" />
//                 </div>
//               </a>
//             </div>
//           ))}
//         </Marquee>

//         {/* <Marquee pauseOnHover direction="right">
//           {Shuffle(product).map((item, i) => (
//             <div className="item__slide" key={i}>
//               <img src={item.image} alt="" />
//             </div>
//           ))}
//         </Marquee> */}
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect, memo } from "react";
import Marquee from "react-fast-marquee";
import { DataService } from "../config/dataService";
import { endpoints } from "../config/endpoints";
import { useTranslation } from "react-i18next";

const Havolalar = () => {
  const { t } = useTranslation();
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await DataService.get(endpoints.usefulLink);
        setApiData(response);
      } catch (error) {
        console.error("API yuklashda xatolik:", error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="container_full">
      <div className="info__lazy" id="aboutus">
        <div className="text_lazy">
          <h2>{t("foydali_")}</h2>
        </div>
      </div>
      <div className="lazy">
        {loading ? (
          <p>{t("loading")}</p>
        ) : (
          <Marquee pauseOnHover>
            {apiData?.results?.map((usefulItem) => (
              <div className="item__slide" key={usefulItem.id}>
                <a href={usefulItem.link}>
                  <div className="item__img">
                    {/* Lazy Loading qo‘shildi */}
                    <img src={usefulItem.logo_image} alt={usefulItem.title} loading="lazy" />
                  </div>
                </a>
              </div>
            ))}
          </Marquee>
        )}
      </div>
    </div>
  );
};

export default memo(Havolalar);