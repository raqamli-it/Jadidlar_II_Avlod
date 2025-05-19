// import React from "react";
// import dateFormat from "dateformat";
// import "../../assets/style/block/_cardCarousel.scss";
// import { useTranslation } from "react-i18next";
// export default function Card({ img, title, brYear, dyYear, onClick }) {
//   const { t } = useTranslation();

//   return (
//     <div className="card_carusel_hm" onClick={onClick}>
//       <div className="card_carusel_img">
//         <img src={img} alt="" />
//       </div>
//       <div className="height">
//         <div className="card_carusel_body">
//           <h3>{title}</h3>
//           {brYear || dyYear ? (
//             <p className="jd_p">
//               ({brYear ? dateFormat(brYear, "yyyy") : "?"} —{" "}
//               {dyYear ? dateFormat(dyYear, "yyyy") : "?"})
//             </p>
//           ) : (
//             <div style={{ color: "#fff", fontWeight: "700" }}>
//               ( {t("unknown_")} )
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { memo } from "react";
import dateFormat from "dateformat";
import "../../assets/style/block/_cardCarousel.scss";
import { useTranslation } from "react-i18next";

const Card = ({ img, title, brYear, dyYear, onClick, lazyLoading = true }) => {
  const { t } = useTranslation();

  return (
    <div className="card_carusel_hm" onClick={onClick}>
      <div className="card_carusel_img">
        {/* Lazy loading ni props orqali boshqarish */}
        <img src={img} alt={title} loading={lazyLoading ? "lazy" : "eager"} />
      </div>
      <div className="height">
        <div className="card_carusel_body">
          <h3>{title}</h3>
          {brYear || dyYear ? (
            <p className="jd_p">
              ({brYear ? dateFormat(brYear, "yyyy") : "?"} —{" "}
              {dyYear ? dateFormat(dyYear, "yyyy") : "?"})
            </p>
          ) : (
            <div style={{ color: "#fff", fontWeight: "700" }}>
              ( {t("unknown_")} )
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// `memo` bilan keraksiz renderlarni oldini oldik
export default memo(Card);