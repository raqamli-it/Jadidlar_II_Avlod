// import Tab from "../components/components/Tab";

// import { useTranslation } from "react-i18next";
// import React, { useState, useEffect } from "react";
// import HomCardXikmat from "./Home/HomCardXikmat";
// import CardAsarlar from "./components/CardAsarlar";
// import { DataService } from "../config/dataService";
// import { endpoints } from "../config/endpoints";
// import Spinner from "./components/Spinner";
// import Empty from "./components/Empty";
// import { useSelector } from "react-redux";

// export default function HomeTab() {
//   const { t } = useTranslation();
//   // Asarlar api
//   const lang = useSelector((state) => state.langReducer?.value);
//   const [apiData, setApiData] = useState();
//   const fetchData = async () => {
//     const response = await DataService.get(endpoints.asarlarRandomTilImlo); //endpoint o'zgartirilsin  endpoindi tayyor
//     setApiData(response);
//     // console.log("Manananan haqihaqhahaha", response);
//   };
//   useEffect(() => {
//     fetchData();
//   }, [lang]);

//   // Maqolalar api
//   const [apiDataMaqola, setApiDataMaqola] = useState();
//   const fetchDataMaqola = async () => {
//     const response = await DataService.get(endpoints.maqolaRandomTilImlo); //endpoint o'zgartirilsin  endpoindi tayyor

//     setApiDataMaqola(response);
//   };
//   useEffect(() => {
//     fetchDataMaqola();
//   }, []);

//   // Hikmatli So'zlar api
//   const [apiDataHikmat, setApiDataHikmat] = useState();
//   const fetchDataHikmat = async () => {
//     const response = await DataService.get(endpoints.hikmatliRandom);
//     // console.log("hikmatlarjon", response.results);
//     setApiDataHikmat(response);
//   };
//   useEffect(() => {
//     fetchDataHikmat();
//   }, []);
//   //

//   const [activeTab, setActiveTab] = useState(1);
//   const tablist = [
//     { id: 1, title: "asarlar_" },
//     { id: 2, title: "maqolalar_" },
//     { id: 3, title: "hikmatlar_" },
//   ];

//   const onChangeTab = (id) => {
//     setActiveTab(id);
//   };
//   const Mains = () => {
//     switch (activeTab) {
//       case 1:
//         return (
//           <div>
//             {apiData ? (
//               <div>
//                 {apiData?.length > 0 ? (
//                   <CardAsarlar apiData={apiData} url="asarlar" />
//                 ) : (
//                   <Empty />
//                 )}
//               </div>
//             ) : (
//               <Spinner />
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
//             {apiDataHikmat.length > 0 ? (
//               <div>
//                 {apiDataHikmat ? (
//                   <HomCardXikmat apiData={apiDataHikmat} />
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
//       <h2>{t("til_va_imlo_")}</h2>
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
import HomCardXikmat from "./Home/HomCardXikmat";

const HomeTab = () => {
  const { t } = useTranslation();
  const lang = useSelector((state) => state.langReducer?.value);

  const [apiData, setApiData] = useState({
    asarlar: null,
    maqolalar: null,
    hikmatlar: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [asarlar, maqolalar, hikmatlar] = await Promise.all([
          DataService.get(endpoints.asarlarRandomTilImlo),
          DataService.get(endpoints.maqolaRandomTilImlo),
          DataService.get(endpoints.hikmatliRandom),
        ]);
        setApiData({
          asarlar,
          maqolalar,
          hikmatlar,
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
    { id: 3, title: "hikmatlar_" },
  ];

  const onChangeTab = (id) => {
    setActiveTab(id);
  };

  const renderContent = () => {
    const tabKeys = ["asarlar", "maqolalar", "hikmatlar"];
    const selectedData = apiData[tabKeys[activeTab - 1]];
    const url = tabKeys[activeTab - 1];

    return loading ? (
      <Spinner />
    ) : selectedData?.length > 0 ? (
      activeTab === 3 ? (
        <HomCardXikmat apiData={selectedData} />
      ) : (
        <CardAsarlar apiData={selectedData} url={url} lazyLoading={true} />
      )
    ) : (
      <Empty />
    );
  };

  return (
    <div className="container_full">
      <h2>{t("til_va_imlo_")}</h2>
      <Tab onChange={onChangeTab} active={activeTab} tablist={tablist} />
      {renderContent()}
    </div>
  );
};

export default memo(HomeTab);