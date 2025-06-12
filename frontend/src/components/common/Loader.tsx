import { type JSX } from "react";
import "@styles/loader.css";

const Loader = (): JSX.Element => {
  return (
    <div className="loader">
      <div className="spinner">
        <div className="spinner1" />
      </div>
    </div>
  );
};

export default Loader;
