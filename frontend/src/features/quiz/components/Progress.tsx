import type { JSX } from "react";

const Progress = (): JSX.Element => {
    return (
        <div className="progress">
            <div className="progress__container">
                <div className="progress__bar">
                    <div className="progress__bar-fill" style={{ width: "50%" }}></div>
                </div>
            </div>
        </div>
    );
};

export default Progress;