import { type JSX } from "react";

const NotFoundPage = (): JSX.Element => (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>404 - Not Found</h1>
        <p>The page you are looking for does not exist.</p>
        <a href="/">Go back to Home</a>
    </div>
);

export default NotFoundPage;