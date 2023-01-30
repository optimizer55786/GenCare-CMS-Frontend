import { Row, Col } from "antd";
import SubPanel from "../../../../components/templates/sub-panel/sub-panel.component";
import QueueItem from "./queue-item/queue-item.component";
import { DailyFuelQueueDataProps } from "../daily-fuel-queue.type";
import { convertFullDateWithStringMonth } from "../../../../utils/date";
import "./daily-queue-item.less";

const DailyQueueItem = ({ date, cards }: DailyFuelQueueDataProps) => {
  return (
    <SubPanel>
      <div className="schedule-date">
        <p className="text-mulish-bold text-24">
          {convertFullDateWithStringMonth(date)}
        </p>
      </div>

      <div className="schedule-queue-items-container">
        <Row>
          {cards.map((item, index) => (
            <Col
              className="daily-schedule-queue-item"
              key={index}
              xs={24}
              sm={12}
              md={12}
              lg={8}
              xl={8}
            >
              <QueueItem
                type={item.video || item.audio ? "video" : "normal"}
                header={item.card_header}
                body={item.card_body}
                footer={item.card_footer}
                background={item.card_background}
              />
            </Col>
          ))}
        </Row>
      </div>
    </SubPanel>
  );
};

export default DailyQueueItem;
