import { Select } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

export const LanguageSelector = () => {
  const { i18n } = useTranslation()
  return (
    <Select
      defaultValue={i18n.language}
      onChange={(e) => i18n.changeLanguage(e.target.value)}
      backgroundColor={"white"}
    >
      <option value="en">English</option>
      <option value="pl">Polski</option>
      <option value="de">Deutsch</option>
    </Select>
  );
};
