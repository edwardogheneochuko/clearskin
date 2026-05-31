import { Toaster } from "react-hot-toast";
import { getToastConfig } from "@/assets/data/toastConfig";
import useThemeStore from "@/store/themeStore";

const ToasterWithTheme = () => {
  const theme  = useThemeStore((s) => s.theme);
  const config = getToastConfig(); 

  return <Toaster {...config} key={theme} />;
};

export default ToasterWithTheme;