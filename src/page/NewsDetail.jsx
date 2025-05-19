// import React, { useEffect, useState } from "react";
// import Menu from "../components/components/Menu";
// import { useParams } from "react-router-dom";
// import { FaTelegramPlane } from "react-icons/fa";
// import { DataService } from "../config/dataService";
// import { endpoints } from "../config/endpoints";
// import { useTranslation } from "react-i18next";

// export default function NewsDetail() {
//   const route = useParams();
//   // bu qism api lar bilan ishlash uchun
//   const [apiData, setApiData] = useState();
//   const fetchData = async () => {
//     const response = await DataService.get(endpoints.newsById(route?.id));
//     setApiData(response);
//     let x = document.querySelector("title");
//     x.textContent = `Voqealar / Yangiliklar / ${response.title}`;
//   };
//   useEffect(() => {
//     fetchData();
//   }, []);
//   const { t } = useTranslation();

//   //
//   return (
//     <div className="container_full ">
//       <Menu title="Yangiliklar" link="/yangiliklar" subtitle={apiData?.title} />
//       <div className="news_page_container">
//         <div className="news_page_title">
//           <h1>{apiData?.title}</h1>
//           {/* <h1>{apiData?.title2}</h1> */}
//           {/* <span>{apiData?.date}</span> */}
//           <div dangerouslySetInnerHTML={{ __html: apiData?.text }}></div>
//           <div className="news_page_img">
//             <img src={apiData?.image} alt="" width={"100%"} />
//           </div>
//         </div>
//       </div>
//       <div className="global_share">
//         <span>{t("share_")}</span>
//         <a
//           onClick={() =>
//             (window.location.href = `https://telegram.me/share/url?url=https://jadidlarimiz.uz/yangiliklar/${apiData?.id}`)
//           }
//           target="_blank"
//         >
//           <FaTelegramPlane />
//         </a>
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useState, memo } from "react";
import Menu from "../components/components/Menu";
import { useParams } from "react-router-dom";
import { FaTelegramPlane } from "react-icons/fa";
import { DataService } from "../config/dataService";
import { endpoints } from "../config/endpoints";
import { useTranslation } from "react-i18next";

const NewsDetail = () => {
  const route = useParams();
  const { t } = useTranslation();
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await DataService.get(endpoints.newsById(route?.id));
        setApiData(response);
        document.title = `Voqealar / Yangiliklar / ${response.title}`;
      } catch (error) {
        console.error("API yuklashda xatolik:", error);
      }
      setLoading(false);
    };

    fetchData();
  }, [route?.id]);

  return (
    <div className="container_full">
      <Menu title="Yangiliklar" link="/yangiliklar" subtitle={apiData?.title} />
      {loading ? (
        <p>{t("loading")}</p>
      ) : (
        <div className="news_page_container">
          <div className="news_page_title">
            <h1>{apiData?.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: apiData?.text }}></div>
            <div className="news_page_img">
              {/* Lazy Loading qo‘shildi */}
              <img src={apiData?.image} alt={apiData?.title} loading="lazy" width="100%" />
            </div>
          </div>
        </div>
      )}
      <div className="global_share">
        <span>{t("share_")}</span>
        <a
          href={`https://telegram.me/share/url?url=https://jadidlarimiz.uz/yangiliklar/${apiData?.id}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaTelegramPlane />
        </a>
      </div>
    </div>
  );
};

export default memo(NewsDetail);