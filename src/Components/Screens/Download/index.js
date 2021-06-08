import React from "react";
import { useTranslation } from "react-i18next";
import platform from "platform";
import Header from "../../Misc/Header";
import Button from "../../Misc/Button";

export default function Download() {

  const { t } = useTranslation();

  const os = platform.parse(window.navigator.userAgent).os;

  return (
    <>
      <Header>
        { t("screens.download.title") }
      </Header>
      <p style={{color: "white", marginTop: ".5em"}}>
        { t("screens.download.labels.description") }
      </p>
      { os.family === "Android" &&
        <div style={{marginTop: "1em", width: "100%", display: "flex", flexDirection: "column"}}>
          <Button onClick={() => {
            window.open(process.env.REACT_APP_DOWNLOAD_URL, "_blank")
          }}>
            { t("screens.download.labels.download") }
          </Button>
        </div>
      }
      { os.family !== "Android" &&
        <div style={{color: "white"}}>
          { t("screens.download.labels.unavailable") + " (" + os.family + ")" }
        </div>
      }
    </>
  );
}