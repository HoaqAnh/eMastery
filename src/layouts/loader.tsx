import { type JSX } from "react";
import "../styles/layouts/loader.css";

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