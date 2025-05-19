// import React, { useEffect, useState } from "react";
// import NewsMainStyle from "./NewsMainStyle";
// import Menu from "../components/components/Menu";
// import { DataService } from "../config/dataService";
// import { endpoints } from "../config/endpoints";
// import { useNavigate, useParams } from "react-router-dom";
// import Spinner from "../components/components/Spinner";
// import Pagination from "../components/Pagination";
// import Empty from "../components/components/Empty";

// export default function NewsMain() {
//   const navigate = useNavigate();
//   const route = useParams();
//   // bu qism api lar bilan ishlash uchun
//   const [apiData, setApiData] = useState();

//   const fetchData = async () => {
//     const response = await DataService.get(endpoints.news, {
//       page: 1,
//       limit: 15,
//     });
//     setApiData(response);
//     let x = document.querySelector("title");
//     x.textContent = "Voqealar / Yangiliklar  ";
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);
//   //

//   const handleCurrentPage = async (page) => {
//     const response = await DataService.get(endpoints.news, {
//       limit: 15,
//       page: page,
//     });
//     setApiData(response);
//   };

//   return (
//     <div className="news_main">
//       <Menu title={"yangiliklar_"} link="/yangiliklar" />
//       {apiData ? (
//         <div className="event_content">
//           {apiData?.results?.length > 0 ? (
//             <div>
//               <NewsMainStyle apiData={apiData?.results} link={apiData?.link} />
//               <Pagination
//                 totalItems={apiData?.pagination?.total}
//                 page={apiData?.pagination?.currentPage || 1}
//                 currentPage={(e) => handleCurrentPage(e)}
//               />
//             </div>
//           ) : (
//             <Empty />
//           )}
//         </div>
//       ) : (
//         <Spinner />
//       )}
//     </div>
//   );
// }


import React, { useEffect, useState, memo } from "react";
import NewsMainStyle from "./NewsMainStyle";
import Menu from "../components/components/Menu";
import { DataService } from "../config/dataService";
import { endpoints } from "../config/endpoints";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../components/components/Spinner";
import Pagination from "../components/Pagination";
import Empty from "../components/components/Empty";

const NewsMain = () => {
  const navigate = useNavigate();
  const route = useParams();
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async (page = 1) => {
      setLoading(true);
      try {
        const response = await DataService.get(endpoints.news, {
          page,
          limit: 15,
        });
        setApiData(response);
        document.title = "Voqealar / Yangiliklar";
      } catch (error) {
        console.error("API yuklashda xatolik:", error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleCurrentPage = async (page) => {
    setCurrentPage(page);
    const response = await DataService.get(endpoints.news, {
      limit: 15,
      page,
    });
    setApiData(response);
  };

  return (
    <div className="news_main">
      <Menu title={"yangiliklar_"} link="/yangiliklar" />
      {loading ? (
        <Spinner />
      ) : apiData?.results?.length > 0 ? (
        <div className="event_content">
          <NewsMainStyle apiData={apiData?.results} link={apiData?.link} lazyLoading={true} />
          <Pagination
            totalItems={apiData?.pagination?.total}
            page={currentPage}
            currentPage={(e) => handleCurrentPage(e)}
          />
        </div>
      ) : (
        <Empty />
      )}
    </div>
  );
};

export default memo(NewsMain);