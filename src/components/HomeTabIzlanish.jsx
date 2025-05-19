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
// import { useSelector } from "react-redux";

// export default function HomeTab() {
//   // Translation
//   const { t } = useTranslation();

//   // Asarlar api
//   const lang = useSelector((state) => state.langReducer?.value);
//   const [apiData, setApiData] = useState();
//   const fetchData = async () => {
//     const response = await DataService.get(endpoints.asarlarRandomIzlanish); //endpoint o'zgartirilsin  endpoindi tayyor
//     setApiData(response);
//   };
//   useEffect(() => {
//     fetchData();
//   }, [lang]);
//   //

//   // Maqolalar api
//   const [apiDataMaqola, setApiDataMaqola] = useState();
//   const fetchDataMaqola = async () => {
//     const response = await DataService.get(endpoints.maqolaRandomIzlanish); //endpoint o'zgartirilsin  endpoindi tayyor

//     setApiDataMaqola(response);
//   };
//   useEffect(() => {
//     fetchDataMaqola();
//   }, []);
//   //

//   // Dissertatsiya So'zlar api
//   const [apiDataDissertatsiya, setApiDataDissertatsiya] = useState();
//   const fetchDataDissertatsiya = async () => {
//     const response = await DataService.get(endpoints.dissertatsiyaRandom);
//     setApiDataDissertatsiya(response);
//   };

//   useEffect(() => {
//     fetchDataDissertatsiya();
//   }, []);
//   //

//   // Esdaliklar So'zlar api
//   const [apiDataEsdaliklar, setApiDataEsdaliklar] = useState();
//   const fetchDataEsdaliklar = async () => {
//     const response = await DataService.get(endpoints.hotiralarRandomIzlanish);
//     setApiDataEsdaliklar(response);
//   };
//   useEffect(() => {
//     fetchDataEsdaliklar();
//   }, []);
//   //

//   const [activeTab, setActiveTab] = useState(1);
//   const tablist = [
//     { id: 1, title: "asarlar_" },
//     { id: 2, title: "maqolalar_" },
//     { id: 3, title: "disser_" },
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
//             {apiDataDissertatsiya?.length > 0 ? (
//               <div>
//                 {apiDataDissertatsiya ? (
//                   <CardAsarlar
//                     apiData={apiDataDissertatsiya}
//                     url="dissertatsiya"
//                   />
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
//       <h2>{t("izlanishlar_")}</h2>
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
import { useSelector } from "react-redux";

const HomeTab = () => {
  const { t } = useTranslation();
  const lang = useSelector((state) => state.langReducer?.value);

  const [apiData, setApiData] = useState({
    asarlar: null,
    maqolalar: null,
    dissertatsiya: null,
    hotiralar: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [asarlar, maqolalar, dissertatsiya, hotiralar] = await Promise.all([
          DataService.get(endpoints.asarlarRandomIzlanish),
          DataService.get(endpoints.maqolaRandomIzlanish),
          DataService.get(endpoints.dissertatsiyaRandom),
          DataService.get(endpoints.hotiralarRandomIzlanish),
        ]);
        setApiData({
          asarlar,
          maqolalar,
          dissertatsiya,
          hotiralar,
        });
      } catch (error) {
        console.error("API yuklashda xatolik:", error);
      }
      setLoading(false);
    };

    fetchData();
  }, [lang]);

  const [activeTab, setActiveTab] = useState(1);
  const tablist = [
    { id: 1, title: "asarlar_" },
    { id: 2, title: "maqolalar_" },
    { id: 3, title: "disser_" },
    { id: 4, title: "esdaliklar_" },
  ];

  const onChangeTab = (id) => {
    setActiveTab(id);
  };

  const renderContent = () => {
    const tabKeys = ["asarlar", "maqolalar", "dissertatsiya", "hotiralar"];
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
      <h2 >{t("izlanishlar_")}</h2>
      <Tab onChange={onChangeTab} active={activeTab} tablist={tablist} />
      {renderContent()}
    </div>
  );
};

export default memo(HomeTab);