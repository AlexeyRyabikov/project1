import { Component } from 'react';
// import ReactDOM from 'react';
import './tasklist.css';
// import { id } from 'date-fns/locale';

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
    console.log(props);
    console.log(propers);
    console.log('залупа-3');
    const mass = [];
    for (let i = 0; i < propers.length; i += 1) {
      // this.props.propers.length
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
          />
        );
      } // ()=>console.log('сработало')this.checked}
    }
    return <ul className="todo-list">{mass}</ul>;
  }
}

// const Tasklist = (dataobj) => {
//   console.log('залупа-3');
//   const mass = [];
//   for (let i = 0; i < Object.keys(dataobj.props).length; i++) {
//     mass[i] = <Task props={dataobj.props[i]} />;
//   }
//   return <ul className="todo-list">{mass}</ul>;
// };
export default Tasklist;
