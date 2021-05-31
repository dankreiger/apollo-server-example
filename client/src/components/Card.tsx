import { FC } from 'react';
import { Task } from '../../../types/generated/schema';

function priorityData(priority: '_1' | '_2' | '_3') {
  switch (priority) {
    case '_1':
      return { class: 'info', text: 'Low' };
    case '_2':
      return { class: 'warning', text: 'Medium' };
    case '_3':
      return { class: 'danger', text: 'High' };
    default:
      throw new Error(
        `Priority must be '_1' | '_2' | '_3'. Received: ${priority}`
      );
  }
}

export const Card: FC<Task> = ({
  title,
  description,
  priority,
}): JSX.Element => {
  return (
    <div className="card-demo">
      <div className="card">
        <div className="card__header">
          <h3>{title}</h3>
        </div>
        <div className="card__body">
          <p>{description}</p>
        </div>
        <div className="card__footer">
          <span className={`badge badge--${priorityData(priority).class}`}>
            {priorityData(priority).text}
          </span>
        </div>
      </div>
    </div>
  );
};
