import { Component } from 'react';
// import ReactDOM from 'react';
import './tasklist.css';
// import { id } from 'date-fns/locale';

import Task from '../task/task';

const Tasklist = function (props) {
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
    } // ()=>console.log('сработало')this.checked}
  }
  return <ul className="todo-list">{mass}</ul>;
};

export default Tasklist;
