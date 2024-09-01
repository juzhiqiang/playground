import { useContext } from "react";
import logoSvg from "../../assets/react.svg";
import styles from "./index.module.less";
import {
  DownloadOutlined,
  MoonOutlined,
  ShareAltOutlined,
  SunOutlined,
} from "@ant-design/icons";
import { PlaygroundContext } from "../../Playground/PlaygroundContext";
import { message } from "antd";
import copy from "copy-to-clipboard";
import { downloadFiles } from "../../Playground/utils";

export default function Header() {
  const { theme, setTheme, files } = useContext(PlaygroundContext);

  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <img alt="logo" src={logoSvg} />
        <span>React Playground</span>
      </div>
      <div className={styles.links}>
        {theme === "light" && (
          <MoonOutlined
            title="切换暗色主题"
            className={styles.theme}
            onClick={() => setTheme("dark")}
          />
        )}
        {theme === "dark" && (
          <SunOutlined
            title="切换亮色主题"
            className={styles.theme}
            onClick={() => setTheme("light")}
          />
        )}
        <ShareAltOutlined
          style={{ marginLeft: 10 }}
          onClick={() => {
            copy(window.location.href);
            message.success("链接已复制到剪贴板");
          }}
        />
        <DownloadOutlined
          style={{ marginLeft: "10px" }}
          onClick={async () => {
            await downloadFiles(files);
            message.success("下载完成");
          }}
        />
      </div>
    </div>
  );
}
