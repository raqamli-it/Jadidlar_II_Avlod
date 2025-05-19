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
//   const { t } = useTranslation();
//   // Arxiv xujjatlari api
//   const lang = useSelector((state) => state.langReducer?.value);
//   const [apiDataArxiv, setApiDataArxiv] = useState();
//   const fetchDataArxiv = async () => {
//     const response = await DataService.get(endpoints.arxivRandom); //endpoint o'zgartirilsin  endpoindi tayyor
//     console.log(response);
//     setApiDataArxiv(response);
//   };
//   useEffect(() => {
//     fetchDataArxiv();
//   }, [lang]);
//   //

//   // Matbuot api
//   const [apiDataMatbuot, setApiDataMatbuot] = useState();
//   const fetchDataMatbuot = async () => {
//     const response = await DataService.get(
//       endpoints.maqolaRandomMatbuotIqtisod,
//       {
//         type: "Iqtisod",
//       }
//     );
//     //endpoint o'zgartirilsin  endpoindi tayyor
//     setApiDataMatbuot(response);
//   };

//   useEffect(() => {
//     fetchDataMatbuot();
//   }, []);
//   //

//   const [activeTab, setActiveTab] = useState(1);
//   const tablist = [
//     { id: 1, title: "arxiv_" },
//     { id: 2, title: "matbuot_" },
//   ];

//   const onChangeTab = (id) => {
//     setActiveTab(id);
//   };
//   const Mains = () => {
//     switch (activeTab) {
//       case 1:
//         return (
//           <div>
//             {apiDataArxiv?.length > 0 ? (
//               <div>
//                 {apiDataArxiv ? (
//                   <CardAsarlar apiData={apiDataArxiv} url="arxiv_hujjatlar" />
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
//             {apiDataMatbuot?.length > 0 ? (
//               <div>
//                 {apiDataMatbuot ? (
//                   <CardAsarlar apiData={apiDataMatbuot} url="maqolalar" />
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
//       <h2>{t("manbalar_")}</h2>
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

  const [apiDataArxiv, setApiDataArxiv] = useState(null);
  const [apiDataMatbuot, setApiDataMatbuot] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [arxivResponse, matbuotResponse] = await Promise.all([
          DataService.get(endpoints.arxivRandom),
          DataService.get(endpoints.maqolaRandomMatbuotIqtisod, { type: "Iqtisod" }),
        ]);
        setApiDataArxiv(arxivResponse);
        setApiDataMatbuot(matbuotResponse);
      } catch (error) {
        console.error("API yuklashda xatolik:", error);
      }
      setLoading(false);
    };

    fetchData();
  }, [lang]);

  const [activeTab, setActiveTab] = useState(1);
  const tablist = [
    { id: 1, title: "arxiv_" },
    { id: 2, title: "matbuot_" },
  ];

  const onChangeTab = (id) => {
    setActiveTab(id);
  };

  const renderContent = () => {
    const apiData = activeTab === 1 ? apiDataArxiv : apiDataMatbuot;
    const url = activeTab === 1 ? "arxiv_hujjatlar" : "maqolalar";

    return loading ? (
      <Spinner />
    ) : apiData?.length > 0 ? (
      <CardAsarlar apiData={apiData} url={url} lazyLoading={true} />
    ) : (
      <Empty />
    );
  };

  return (
    <div className="container_full">
      <h2>{t("manbalar_")}</h2>
      <Tab onChange={onChangeTab} active={activeTab} tablist={tablist} />
      {renderContent()}
    </div>
  );
};

export default memo(HomeTab);