import Playground from "./Playground";
import { PlaygroundContextProvider } from "./Playground/PlaygroundContext";

function App() {
  return (
    <PlaygroundContextProvider>
      <Playground />;
    </PlaygroundContextProvider>
  );
}

export default App;
