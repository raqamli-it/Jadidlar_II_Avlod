// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import Tab from "../components/components/Tab";
// import CardAsarlar from "../components/components/CardAsarlar";
// import Menu from "../components/components/Menu";
// import Spinner from "../components/components/Spinner";
// import Empty from "../components/components/Empty";
// import Details from "../components/components/Details";
// import { DataService } from "../config/dataService";
// import { endpoints } from "../config/endpoints";
// import HomCardXikmat from "../components/Home/HomCardXikmat";
// import { useTranslation } from "react-i18next";
// import SEO from "../components/Seo";
// import { useSelector } from "react-redux";
// import { generateTabList } from "../components/components/Tabutils"; // Tabutils.js dan import qilingan

// export default function Jadidlar() {
//   const { t } = useTranslation();
//   const lang = useSelector((state) => state.langReducer?.value);

//   const route = useParams();
//   const [apiData, setApiData] = useState();
//   const [activeTab, setActiveTab] = useState(1);

//   const fetchData = async () => {
//     const response = await DataService.get(endpoints.jadidById(route?.id));
//     setApiData(response);
//     let x = document.querySelector("title");
//     x.textContent = `Jadidlar / ${response.title}`;
//   };

//   useEffect(() => {
//     fetchData();
//   }, [lang]);

//   // Tablar uchun generatsiya qilish
//   const tabs = [
//     { id: 1, title: "jadid_", dataKey: true },
//     { id: 2, title: "asarlar_", dataKey: "asarlar" },
//     { id: 3, title: "maqolalar_", dataKey: "maqolalar" },
//     { id: 4, title: "sherlar_", dataKey: "sherlar" },
//     { id: 5, title: "esdaliklar_", dataKey: "hotiralar" },
//     { id: 6, title: "hikmat_", dataKey: "hikmatli_sozlar" },
//   ];
//   const tablist = generateTabList(apiData, tabs);

//   const onChangeTab = (id) => {
//     setActiveTab(id);
//   };

//   const ActivePanel = () => {
//     switch (activeTab) {
//       case 1:
//         return (
//           <div>
//             {apiData ? (
//               <Details
//                 image={apiData?.image}
//                 fullname={apiData?.fullname}
//                 birthday={apiData?.birthday}
//                 die_day={apiData?.die_day}
//                 bio={apiData?.bio}
//               />
//             ) : (
//               <Spinner />
//             )}
//           </div>
//         );
//       case 2:
//         return (
//           <div>
//             {apiData?.asarlar?.length > 0 ? (
//               <div>
//                 {apiData ? (
//                   <CardAsarlar apiData={apiData?.asarlar} url="asarlar" />
//                 ) : (
//                   <Spinner />
//                 )}
//               </div>
//             ) : (
//               <Empty />
//             )}
//           </div>
//         );
//       case 3:
//         return (
//           <div>
//             {apiData?.maqolalar?.length > 0 ? (
//               <div>
//                 {apiData ? (
//                   <CardAsarlar apiData={apiData.maqolalar} url="maqolalar" />
//                 ) : (
//                   <Spinner />
//                 )}
//               </div>
//             ) : (
//               <Empty />
//             )}
//           </div>
//         );
//       case 4:
//         return (
//           <div>
//             {apiData?.sherlar?.length > 0 ? (
//               <div>
//                 {apiData ? (
//                   <CardAsarlar apiData={apiData.sherlar} url="sherlar" />
//                 ) : (
//                   <Spinner />
//                 )}
//               </div>
//             ) : (
//               <Empty />
//             )}
//           </div>
//         );
//       case 5:
//         return (
//           <div>
//             {apiData?.hotiralar?.length > 0 ? (
//               <div>
//                 {apiData ? (
//                   <CardAsarlar apiData={apiData.hotiralar} url="hotiralar" />
//                 ) : (
//                   <Spinner />
//                 )}
//               </div>
//             ) : (
//               <Empty />
//             )}
//           </div>
//         );
//       case 6:
//         return (
//           <div>
//             {apiData?.hikmatli_sozlar?.length > 0 ? (
//               <div>
//                 {apiData ? (
//                   <HomCardXikmat apiData={apiData.hikmatli_sozlar} />
//                 ) : (
//                   <Spinner />
//                 )}
//               </div>
//             ) : (
//               <Empty />
//             )}
//           </div>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="jadidlar_container container_full">
//       <Menu title="jadidlar_" link="/jadidlar" subtitle={apiData?.title} />
//       <SEO
//         title={apiData?.fullname}
//         image={apiData?.image}
//         discription={apiData?.fullname}
//       />
//       <Tab tablist={tablist} onChange={onChangeTab} active={activeTab} />
//       <ActivePanel />
//     </div>
//   );
// }


import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import Tab from "../components/components/Tab";
import CardAsarlar from "../components/components/CardAsarlar";
import Menu from "../components/components/Menu";
import Spinner from "../components/components/Spinner";
import Empty from "../components/components/Empty";
import Details from "../components/components/Details";
import { DataService } from "../config/dataService";
import { endpoints } from "../config/endpoints";
import HomCardXikmat from "../components/Home/HomCardXikmat";
import SEO from "../components/Seo";
import { generateTabList } from "../components/components/Tabutils";

// Memoized components to prevent unnecessary re-renders
const MemoizedCardAsarlar = React.memo(CardAsarlar);
const MemoizedHomCardXikmat = React.memo(HomCardXikmat);
const MemoizedDetails = React.memo(Details);

// Tab configuration outside component to prevent recreation
const TAB_CONFIG = [
  { id: 1, title: "jadid_", dataKey: true },
  { id: 2, title: "asarlar_", dataKey: "asarlar" },
  { id: 3, title: "maqolalar_", dataKey: "maqolalar" },
  { id: 4, title: "sherlar_", dataKey: "sherlar" },
  { id: 5, title: "esdaliklar_", dataKey: "hotiralar" },
  { id: 6, title: "hikmat_", dataKey: "hikmatli_sozlar" },
];

export default function Jadidlar() {
  const { t } = useTranslation();
  const lang = useSelector((state) => state.langReducer?.value);
  const route = useParams();
  const [apiData, setApiData] = useState(null);
  const [activeTab, setActiveTab] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  // Memoized tab list to prevent recalculation
  const tablist = useMemo(
    () => generateTabList(apiData, TAB_CONFIG),
    [apiData]
  );

  // Fetch data with useCallback to prevent recreation
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await DataService.get(endpoints.jadidById(route?.id));
      setApiData(response);
      document.title = `Jadidlar / ${response.title}`;
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [route?.id]);

  useEffect(() => {
    fetchData();
  }, [fetchData, lang]);

  const onChangeTab = useCallback((id) => {
    setActiveTab(id);
  }, []);

  // Optimized ActivePanel component
  const ActivePanel = useMemo(() => {
    if (isLoading) return <Spinner />;

    const renderContent = (data, Component, url) => {
      if (!data || data.length === 0) return <Empty />;
      return <Component apiData={data} url={url} />;
    };

    switch (activeTab) {
      case 1:
        return apiData ? (
          <MemoizedDetails
            image={apiData?.image}
            fullname={apiData?.fullname}
            birthday={apiData?.birthday}
            die_day={apiData?.die_day}
            bio={apiData?.bio}
          />
        ) : null;
      case 2:
        return renderContent(apiData?.asarlar, MemoizedCardAsarlar, "asarlar");
      case 3:
        return renderContent(apiData?.maqolalar, MemoizedCardAsarlar, "maqolalar");
      case 4:
        return renderContent(apiData?.sherlar, MemoizedCardAsarlar, "sherlar");
      case 5:
        return renderContent(apiData?.hotiralar, MemoizedCardAsarlar, "hotiralar");
      case 6:
        return renderContent(apiData?.hikmatli_sozlar, MemoizedHomCardXikmat);
      default:
        return null;
    }
  }, [activeTab, apiData, isLoading]);

  return (
    <div className="jadidlar_container container_full">
      <Menu title="jadidlar_" link="/jadidlar" subtitle={apiData?.title} />
      <SEO
        title={apiData?.fullname}
        image={apiData?.image}
        description={apiData?.fullname}
      />
      <Tab tablist={tablist} onChange={onChangeTab} active={activeTab} />
      {ActivePanel}
    </div>
  );
}