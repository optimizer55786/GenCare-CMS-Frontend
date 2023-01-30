import classNames from "classnames";

import "./sub-panel.less"

type Props = {
    children: React.ReactNode[] | React.ReactNode;
    className?: string;
    height?: number;
}


const SubPanelBoard = ({ className, children, height }: Props) => {
    let withPrivateClassName = classNames("gen-panelboard-template", className);

    return (
        <div className={withPrivateClassName}>
            <div>
                {children}
            </div>
        </div>
    )
}

export default SubPanelBoard;