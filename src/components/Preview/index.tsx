import { useContext, useEffect, useRef, useState } from "react";
import { PlaygroundContext } from "../../Playground/PlaygroundContext";
import CompilerWorker from "./compiler.worker?worker";
import Editor from "../Editor";
import styles from "./index.module.less";
import { IMPORT_MAP_FILE_NAME } from "../../Playground/files";
import iframeRaw from "./iframe.html?raw";
import { Message } from "../Message";
import { debounce } from "radash";

interface MessageData {
  data: {
    type: string;
    message: string;
  };
}

export default function Preview() {
  const getIframeUrl = () => {
    const res = iframeRaw
      .replace(
        '<script type="importmap"></script>',
        `<script type="importmap">${files[IMPORT_MAP_FILE_NAME].value}</script>`
      )
      .replace(
        '<script type="module" id="appSrc"></script>',
        `<script type="module" id="appSrc">${compiledCode}</script>`
      );
    return URL.createObjectURL(new Blob([res], { type: "text/html" }));
  };

  const { files } = useContext(PlaygroundContext);
  const [compiledCode, setCompiledCode] = useState("");
  const [iframeUrl, setIframeUrl] = useState(getIframeUrl());
  const [error, setError] = useState("");
  const compilerWorkerRef = useRef<Worker>();

  useEffect(
    debounce({ delay: 500 }, () => {
      compilerWorkerRef.current?.postMessage(files);
    }),
    [files]
  );

  useEffect(() => {
    if (!compilerWorkerRef.current) {
      compilerWorkerRef.current = new CompilerWorker();
      compilerWorkerRef.current.addEventListener("message", ({ data }) => {
        console.log("worker", data);
        if (data.type === "COMPILED_CODE") {
          setCompiledCode(data.data);
        } else {
          //console.log('error', data);
        }
      });
    }
  }, []);

  useEffect(() => {
    setIframeUrl(getIframeUrl());
  }, [files[IMPORT_MAP_FILE_NAME].value, compiledCode]);

  const handleMessage = (msg: MessageData) => {
    const { type, message } = msg.data;
    if (type === "ERROR") {
      setError(message);
    }
  };

  useEffect(() => {
    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return (
    <div className={styles.preview}>
      <iframe
        src={iframeUrl}
        style={{
          width: "100%",
          height: "100%",
          padding: 0,
          border: "none",
        }}
      />
      <Message type="error" content={error} />
      {/* <Editor
        file={{
          name: "dist.js",
          value: compiledCode,
          language: "javascript",
        }}
      /> */}
    </div>
  );
}
