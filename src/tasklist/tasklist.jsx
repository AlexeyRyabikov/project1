import { Component } from 'react';
import './tasklist.css';

import Task from '../task/task';

class Tasklist extends Component {
  static propTypes = {
    propers: (props, propName) => {
      const value = typeof props[propName];
      if (value === 'object') {
        return null;
      }
      return new TypeError(`${value},в массив переданы неправильные данные`);
    },
  };

  static defaultProps = {
    propers: [],
  };

  render() {
    const { props } = this;
    const { propers } = props;
    const mass = [];
    for (let i = 0; i < propers.length; i += 1) {
      if (propers[i].visible) {
        mass.push(
          <Task
            id={props.ID}
            props={props.propers[i]}
            destroy={() => {
              props.destroy(i);
            }}
            edit={() => {
              props.edit(i);
            }}
            toggleDone={() => {
              props.toggleDone(i);
            }}
            submitChange={() => {
              props.submitChange(i);
            }}
            setName={(e) => {
              props.setName(e, i);
            }}
            key={props.propers[i].ID}
            TimerStart={() => {
              props.TimerStart(i);
            }}
            TimerStop={() => {
              props.TimerStop(i);
            }}
            time={props.propers[i].time}
          />
        );
      }
    }
    return <ul className="todo-list">{mass}</ul>;
  }
}

export default Tasklist;
