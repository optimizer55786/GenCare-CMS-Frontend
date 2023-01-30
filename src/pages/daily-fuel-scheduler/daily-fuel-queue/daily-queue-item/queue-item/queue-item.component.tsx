import { Space, Card as AntdCard } from "antd";
import classNames from "classnames";
import SvgIcon from "../../../../../components/atoms/SvgIcon/SvgIcon";

import "./queue-item.less";

interface Props {
  header: string;
  body: string;
  footer?: string;
  background: string;
  type: "normal" | "video";
  onClick?: () => void;
}

const QueueItem = ({
  header,
  body,
  footer,
  type,
  background,
  onClick,
}: Props) => {
  let sharedClasses = classNames("daily-fuel-queue-card", "card-footer");
  let bodyClasses = classNames({
    "card-body-normal": type === "normal",
    "card-body-video": type === "video",
    videoPlayButton: type === "video",
  });

  return (
    <AntdCard
      className={sharedClasses}
      title={header}
      bordered={false}
      cover={
        <CardContent
          type={type}
          bodyClasses={bodyClasses}
          body={body}
          onClick={onClick}
          background={background}
        />
      }
    ></AntdCard>
  );
};

QueueItem.defaultProps = {
  type: "normal",
};

export default QueueItem;

interface CardContentProps {
  type: string;
  bodyClasses: string;
  body: string;
  onClick?: () => void;
  background: string;
}

const CardContent = ({
  type,
  bodyClasses,
  body,
  onClick,
  background,
}: CardContentProps) => {
  return (
    <div className="queue-item-card-body-container">
      {type === "normal" ? (
        <div className={bodyClasses}>
          <div>{body}</div>
        </div>
      ) : (
        <SvgIcon
          name={"content-type-video"}
          width={100}
          height={100}
          onClick={onClick}
          className={bodyClasses}
          color="#57a88b"
        />
      )}
      <img className="card-cover-img" alt="card-cover-image" src={background} />
    </div>
  );
};
