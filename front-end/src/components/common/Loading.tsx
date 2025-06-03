import { type JSX } from "react";
import "@styles/layouts/Loading.css";

const Loading = (): JSX.Element => {
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

export default Loading;