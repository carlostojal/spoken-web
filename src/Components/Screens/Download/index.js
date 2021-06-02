import React from "react";
import { useTranslation } from "react-i18next";
import platform from "platform";
import Header from "../../Misc/Header";
import Button from "../../Misc/Button";
import SessionChecker from "../../Misc/SessionChecker";

export default function Download() {

  const { t } = useTranslation();

  const os = platform.parse(window.navigator.userAgent).os;

  return (
    <>
      <SessionChecker />
      <Header>
        { t("screens.download.title") }
      </Header>
      <div style={{color: "white"}}>
        { t("screens.download.labels.description") }
      </div>
      { os.family === "Android" &&
        <Button onClick={() => {
          window.open(process.env.REACT_APP_DOWNLOAD_URL, "_blank")
        }}>
          { t("screens.download.labels.download") }
        </Button>
      }
      { os.family !== "Android" &&
        <div style={{color: "white"}}>
          { t("screens.download.labels.unavailable") + " (" + os.family + ")" }
        </div>
      }
    </>
  );
}