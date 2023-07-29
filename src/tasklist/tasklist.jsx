import './tasklist.css';
import Task from '../task/task';

const Tasklist = function (props) {
  const { listOfItems } = props;
  const mass = [];
  for (let i = 0; i < listOfItems.length; i += 1) {
    if (listOfItems[i].visible) {
      mass.push(
        <Task
          id={props.ID}
          ItemInfo={props.listOfItems[i]}
          destroy={() => {
            props.destroy(i);
          }}
          edit={() => {
            props.edit(i);
          }}
          toggleDone={() => {
            props.toggleDone(i);
          }}
          submitChange={(newName) => {
            props.submitChange(i, newName);
          }}
          setName={(e) => {
            props.setName(e, i);
          }}
          key={props.listOfItems[i].ID}
          TimerStart={() => {
            props.TimerStart(i);
          }}
          TimerStop={() => {
            props.TimerStop(i);
          }}
          time={props.listOfItems[i].time}
        />
      );
    }
  }
  return <ul className="todo-list">{mass}</ul>;
};

export default Tasklist;
