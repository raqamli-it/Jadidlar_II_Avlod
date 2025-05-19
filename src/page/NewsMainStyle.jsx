// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import dateFormat from "dateformat";
// import { useParams } from "react-router-dom";
// import { DataService } from "../config/dataService";
// import { endpoints } from "../config/endpoints";
// import Pagination from "../components/Pagination";
// import { useTranslation } from "react-i18next";

// export default function NewsMainStyle({ apiData, link }) {
//   const { t } = useTranslation();
//   const navigate = useNavigate();
//   return (
//     <section>
//       <h1 style={{ color: "#0e2b65" }}>{t("yangiliklar_")}</h1>
//       <div className="newsPage_container">
//         {apiData?.map((data) => (
//           <>
//             <div className="news_small" key={data?.id}>
//               <div className="news_content">
//                 <div className="news_small_img">
//                   <img src={data?.image} />
//                 </div>
//                 <div className="news_small_text">
//                   <div className="news_small_text_title">
//                     <h3
//                       dangerouslySetInnerHTML={{
//                         __html: data.title.replace(/\r\n/g, "<br>"),
//                       }}
//                     ></h3>
//                   </div>
//                 </div>
//                 <div className="news_flex_style">
//                   <div className="news_small_text_date">
//                     <p>{dateFormat(data?.created_at, "dd.mm.yyyy")}</p>
//                   </div>
//                   <div className="news_button_style">
//                     <button
//                       onClick={
//                         data.link
//                           ? () => window.open(data.link, "_blank")
//                           : () => navigate(`/yangiliklar/${data.id}`)
//                       }
//                       // uzoq yo'l orqali foydalanilgan
//                       // onClick={() => {
//                       //   if (link) {
//                       //     window.open(link, "_blank");
//                       //   } else {
//                       //     onClick();
//                       //   }
//                       // }}
//                     >
//                       {t("more_")}
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </>
//         ))}
//       </div>
//     </section>
//   );
// }

import React, { memo } from "react";
import { useNavigate } from "react-router-dom";
import dateFormat from "dateformat";
import { useTranslation } from "react-i18next";

const NewsMainStyle = ({ apiData, link, lazyLoading = true }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <section>
      <h1 style={{ color: "#0e2b65" }}>{t("yangiliklar_")}</h1>
      <div className="newsPage_container">
        {apiData?.map((data) => (
          <div className="news_small" key={data?.id}>
            <div className="news_content">
              <div className="news_small_img">
                {/* Lazy Loading qo‘shildi */}
                <img src={data?.image} alt={data?.title} loading={lazyLoading ? "lazy" : "eager"} />
              </div>
              <div className="news_small_text">
                <div className="news_small_text_title">
                  <h3
                    dangerouslySetInnerHTML={{
                      __html: data.title.replace(/\r\n/g, "<br>"),
                    }}
                  ></h3>
                </div>
              </div>
              <div className="news_flex_style">
                <div className="news_small_text_date">
                  <p>{dateFormat(data?.created_at, "dd.mm.yyyy")}</p>
                </div>
                <div className="news_button_style">
                  <button
                    onClick={
                      data.link
                        ? () => window.open(data.link, "_blank")
                        : () => navigate(`/yangiliklar/${data.id}`)
                    }
                  >
                    {t("more_")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default memo(NewsMainStyle);