import { Allotment } from "allotment";
import "allotment/dist/style.css";
import Header from "../components/Header";
import CodeEditor from "../components/CodeEditor";
import Preview from "../components/Preview";
import { useContext } from "react";
import { PlaygroundContext } from "./PlaygroundContext";
import "./index.less";

export default function Playground() {
  const { theme, setTheme } = useContext(PlaygroundContext);

  return (
    <div style={{ height: "calc(100vh - 50px)" }} className={theme}>
      <Header />
      <Allotment defaultSizes={[100, 100]}>
        <Allotment.Pane minSize={100}>
          <CodeEditor />
        </Allotment.Pane>
        <Allotment.Pane minSize={0}>
          <Preview />
        </Allotment.Pane>
      </Allotment>
    </div>
  );
}
