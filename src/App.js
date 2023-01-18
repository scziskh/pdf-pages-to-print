import logo from "./logo.svg";
import "./App.css";
import Header from "./components/header";
import UploadFile from "./components/upload-file";
import SimpleFile from "./components/upload-file/simple-file";

const App = () => {
  return (
    <div className="App">
      <Header />
      <UploadFile />
    </div>
  );
};

export default App;
