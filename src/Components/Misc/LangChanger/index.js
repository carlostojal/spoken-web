import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "./LangChanger.css";

export default function LangChanger() {

  const { i18n } = useTranslation();

  const [lang, setLang] = useState(localStorage.getItem("lang"));

  const onChange = () => {
    let newLang = "en";
    if(lang === "pt")
      newLang = "en";
    else if(lang === "pt")
      newLang = "en";
    else
      newLang = "pt";
    i18n.changeLanguage(newLang);
    localStorage.setItem("lang", newLang);
    setLang(newLang);
  }

  return (
    <button className="text" onClick={onChange}>
      [{ lang === "pt" ?
        "EN" :
        "PT"
      }]
    </button>
  );
}