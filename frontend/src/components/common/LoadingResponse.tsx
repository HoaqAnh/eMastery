import type { JSX } from "react";
import "@styles/components/LoadingResponse.css";

const LoadingResponse = (): JSX.Element => (
  <section className="dots-container">
    <div className="dot"></div>
    <div className="dot"></div>
    <div className="dot"></div>
    <div className="dot"></div>
    <div className="dot"></div>
  </section>
);

export default LoadingResponse;
