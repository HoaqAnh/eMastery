import { type JSX, type ReactNode } from "react";

interface ButtonMenuProps {
    IconComponent?: ReactNode;
    BtnMenuText: string;
    onClick?: () => void;
    className?: string;
    disabled?: boolean;
}

const ButtonMenu = ({ IconComponent, BtnMenuText, onClick, className = '', disabled = false }: ButtonMenuProps): JSX.Element => {
    const combinedClassName = `${className}`.trim();
    return (
        <button className={combinedClassName} onClick={onClick} disabled={disabled}>
            {IconComponent}
            <span className="btn-text">{BtnMenuText}</span>
        </button>
    );
};

export default ButtonMenu;