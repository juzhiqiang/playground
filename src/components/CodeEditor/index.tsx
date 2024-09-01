import { useContext } from "react";
import Editor from "../Editor";
import FileNameList from "../FileNameList";
import styles from "./index.module.less";
import { PlaygroundContext } from "../../Playground/PlaygroundContext";
import { debounce } from "radash";

export default function CodeEditor() {
  const { files, setFiles, selectedFileName, setSelectedFileName, theme } =
    useContext(PlaygroundContext);

  const file = files[selectedFileName];

  function onEditorChange(value?: string) {
    files[file.name].value = value!;
    setFiles({ ...files });
  }

  return (
    <div className={styles.codebox} style={{}}>
      <FileNameList />
      <Editor
        file={file}
        onChange={debounce({ delay: 100 }, onEditorChange)}
        options={{
          theme: `vs-${theme}`,
        }}
      />
    </div>
  );
}
