import type { JSX } from "react";

const UserQuery = ({ content }: { content: string }): JSX.Element => {
  return (
    <div className="userquery">
      <div className="userquery__content">
        <p>{content}</p>
      </div>
    </div>
  );
};

export default UserQuery;