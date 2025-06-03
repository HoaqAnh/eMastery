import { type JSX } from "react";
import "@styles/layouts/Loader.css";

const Loader = (): JSX.Element => {
    return (
        <div className="loader">
            <div className="box"></div>
            <div className="box"></div>
            <div className="box"></div>
            <div className="box"></div>
            <div className="box"></div>
            <div className="box"></div>
            <div className="box"></div>
            <div className="box"></div>
            <div className="box"></div>
        </div>
    );
}

export default Loader;