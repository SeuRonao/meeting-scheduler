import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation("translation", { keyPrefix: "pages.Home" });
  return (
    <>
      <h1 className="text-center my-3">{t("title")}</h1>
      {t("intro-array", { joinArrays: "\n" })}
      <h2 className="my-3">{t("motivation")}</h2>
      {t("motivation-array", { joinArrays: "\n" })}
      <h2 className="my-3">{t("use")}</h2>
      {t("use-array", { joinArrays: "\n" })}
      <h2 className="my-3">{t("challenges")}</h2>
      {t("challenges-array", { joinArrays: "\n" })}
      <ul>
        {(
          t("challenges-bullet-array", { returnObjects: true }) as Array<string>
        ).map((value, index) => {
          return <li key={index}>{value}</li>;
        })}
      </ul>
      <h2 className="my-3">{t("learning")}</h2>
      {t("learning-array", { joinArrays: "\n" })}
      <ul>
        {(
          t("learning-bullet-array", { returnObjects: true }) as Array<string>
        ).map((value, index) => {
          return <li key={index}>{value}</li>;
        })}
      </ul>
    </>
  );
}
