// import React, { useState, useEffect } from "react";
// import Tab from "../components/components/Tab";
// import HomeCardMaqola from "./Home/HomCardMaqola";
// import HomCardXikmat from "./Home/HomCardXikmat";
// import CardAsarlar from "./components/CardAsarlar";
// import { DataService } from "../config/dataService";
// import { endpoints } from "../config/endpoints";
// import Spinner from "./components/Spinner";
// import { useTranslation } from "react-i18next";
// import Empty from "./components/Empty";

// export default function HomeTab() {
//   const { t } = useTranslation();
//   // Asarlar api
//   const [apiData, setApiData] = useState();
//   const fetchData = async () => {
//     const response = await DataService.get(endpoints.asarlarRandomTurkiston); //endpoint o'zgartirilsin  endpoindi tayyor

//     setApiData(response);
//   };
//   useEffect(() => {
//     fetchData();
//   }, []);

//   //

//   // Maqolalar api
//   const [apiDataMaqola, setApiDataMaqola] = useState();
//   const fetchDataMaqola = async () => {
//     const response = await DataService.get(endpoints.maqolaRandomTurkiston); //endpoint o'zgartirilsin  endpoindi tayyor

//     setApiDataMaqola(response);
//   };
//   useEffect(() => {
//     fetchDataMaqola();
//   }, []);
//   //

//   //

//   // Esdaliklar So'zlar api
//   const [apiDataEsdaliklar, setApiDataEsdaliklar] = useState();
//   const fetchDataEsdaliklar = async () => {
//     const response = await DataService.get(endpoints.hotiralarRandomTurkiston);
//     setApiDataEsdaliklar(response);
//   };
//   useEffect(() => {
//     fetchDataEsdaliklar();
//   }, []);

//   //

//   // Sherlar So'zlar api
//   const [apiDataSherlar, setApiDataSherlar] = useState();
//   const fetchDataSherlar = async () => {
//     const response = await DataService.get(endpoints.sherRandomTurkiston);
//     setApiDataSherlar(response);
//   };
//   useEffect(() => {
//     fetchDataSherlar();
//   }, []);
//   //

//   //

//   const [activeTab, setActiveTab] = useState(1);
//   const tablist = [
//     { id: 1, title: "asarlar_" },
//     { id: 2, title: "maqolalar_" },
//     { id: 3, title: "sherlar_" },
//     { id: 4, title: "esdaliklar_" },
//   ];

//   const onChangeTab = (id) => {
//     setActiveTab(id);
//   };
//   const Mains = () => {
//     switch (activeTab) {
//       case 1:
//         return (
//           <div>
//             {apiData?.length > 0 ? (
//               <div>
//                 {apiData ? (
//                   <CardAsarlar apiData={apiData} url="asarlar" />
//                 ) : (
//                   <Spinner />
//                 )}
//               </div>
//             ) : (
//               <Empty />
//             )}
//           </div>
//         );
//       case 2:
//         return (
//           <div>
//             {apiDataMaqola?.length > 0 ? (
//               <div>
//                 {apiDataMaqola ? (
//                   <CardAsarlar apiData={apiDataMaqola} url="maqolalar" />
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
//             {apiDataSherlar?.length > 0 ? (
//               <div>
//                 {apiDataSherlar ? (
//                   <CardAsarlar apiData={apiDataSherlar} url="sherlar" />
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
//             {apiDataEsdaliklar?.length > 0 ? (
//               <div>
//                 {apiDataEsdaliklar ? (
//                   <CardAsarlar apiData={apiDataEsdaliklar} url="hotiralar" />
//                 ) : (
//                   <Spinner />
//                 )}
//               </div>
//             ) : (
//               <Empty />
//             )}
//           </div>
//         );
//     }
//   };
//   return (
//     <div className="container_full">
//       <h2>{t("turkiston_")}</h2>
//       <Tab onChange={onChangeTab} active={activeTab} tablist={tablist} />
//       <Mains />
//     </div>
//   );
// }

import React, { useState, useEffect, memo } from "react";
import Tab from "../components/components/Tab";
import CardAsarlar from "./components/CardAsarlar";
import { DataService } from "../config/dataService";
import { endpoints } from "../config/endpoints";
import Spinner from "./components/Spinner";
import { useTranslation } from "react-i18next";
import Empty from "./components/Empty";

const HomeTab = () => {
  const { t } = useTranslation();

  const [apiData, setApiData] = useState({
    asarlar: null,
    maqolalar: null,
    sherlar: null,
    esdaliklar: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [asarlar, maqolalar, sherlar, esdaliklar] = await Promise.all([
          DataService.get(endpoints.asarlarRandomTurkiston),
          DataService.get(endpoints.maqolaRandomTurkiston),
          DataService.get(endpoints.sherRandomTurkiston),
          DataService.get(endpoints.hotiralarRandomTurkiston),
        ]);
        setApiData({
          asarlar,
          maqolalar,
          sherlar,
          esdaliklar,
        });
      } catch (error) {
        console.error("API yuklashda xatolik:", error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const [activeTab, setActiveTab] = useState(1);
  const tablist = [
    { id: 1, title: "asarlar_" },
    { id: 2, title: "maqolalar_" },
    { id: 3, title: "sherlar_" },
    { id: 4, title: "esdaliklar_" },
  ];

  const onChangeTab = (id) => {
    setActiveTab(id);
  };

  const renderContent = () => {
    const tabKeys = ["asarlar", "maqolalar", "sherlar", "esdaliklar"];
    const selectedData = apiData[tabKeys[activeTab - 1]];
    const url = tabKeys[activeTab - 1];

    return loading ? (
      <Spinner />
    ) : selectedData?.length > 0 ? (
      <CardAsarlar apiData={selectedData} url={url} lazyLoading={true} />
    ) : (
      <Empty />
    );
  };

  return (
    <div className="container_full">
      <h2>{t("turkiston_")}</h2>
      <Tab onChange={onChangeTab} active={activeTab} tablist={tablist} />
      {renderContent()}
    </div>
  );
};

export default memo(HomeTab);