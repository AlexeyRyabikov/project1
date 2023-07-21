import React from 'react';
// import ReactDOM from 'react-dom/client';

import Tasklist from '../tasklist/tasklist';

const IDobj = {
  actualnum: 0,
  getfunc() {
    this.actualnum += 1;
    return this.actualnum;
  },
};
function createItem(descr, done = false, min = 0, sec = 0) {
  const objlist = {
    time: min * 60 + Number(sec),
    className: '',
    description: descr,
    done,
    visible: true,
    ID: IDobj.getfunc(),
    creationDate: new Date(),
    timerID: null,
  };
  return objlist;
}
class Finalcode extends React.Component {
  constructor() {
    super();
    this.state = {
      listOfItems: [createItem('task1'), createItem('task2'), createItem('task3')],
      textInput: '',
      minutes: '',
      seconds: '',
    };
  }

  selectDone = (e) => {
    e.preventDefault();
    this.setState(({ listOfItems }) => {
      const fuck = listOfItems.map((item) => {
        if (!item.done) {
          item.visible = true;
        } else {
          item.visible = false;
        }
        return item;
      });
      return { listOfItems: fuck };
    });
  };
  // TimerStart() {
  //   if (this.state.timerID == null) {
  //     this.state.timerID = setInterval(() => {
  //       if (this.state.timerTime > 0) {
  //         this.setState(({ timerTime }) => {
  //           return { timerTime: timerTime - 1 };
  //         });
  //       } else {
  //         clearInterval(this.state.timerID);
  //       }
  //     }, 1000);
  //   }
  // }

  // TimerStop() {
  //   clearInterval(this.state.timerID);
  //   this.setState(() => ({ timerID: null }));
  // }
  deleteDone = () => {
    this.setState(({ listOfItems }) => {
      const fuck = listOfItems.filter((item) => !item.done);
      return { listOfItems: fuck };
    });
  };

  selectActive = () => {
    this.setState(({ listOfItems }) => {
      const fuck = listOfItems.map((item) => {
        if (item.done) {
          item.visible = true;
        } else {
          item.visible = false;
        }
        return item;
      });
      return { listOfItems: fuck };
    });
  };

  selectAll = () => {
    this.setState(({ listOfItems }) => {
      const fuck = listOfItems.map((item) => {
        item.visible = true;
        return item;
      });
      return { listOfItems: fuck };
    });
  };

  submitCreateItem = (e) => {
    e.preventDefault();
    if (this.state.textInput) {
      this.setState(({ textInput, listOfItems, minutes, seconds }) => {
        const needArr = [...listOfItems.slice(0), createItem(textInput, false, minutes, seconds)]; // false, minutes, seconds
        // console.log(needArr)
        return { listOfItems: needArr };
      });
      this.setState(() => ({ textInput: '', minutes: '', seconds: '' }));
    }
  };

  changeItem = (e) => {
    this.setState(() => {
      const newVal = e.target.value;
      return { textInput: newVal };
    });
  };

  setMinutes = (e) => {
    this.setState(() => {
      const newVal = e.target.value;
      return { minutes: newVal };
    });
  };

  setSeconds = (e) => {
    this.setState(() => {
      const newVal = e.target.value;
      return { seconds: newVal };
    });
  };

  countItemsDone = () => this.state.listOfItems.filter((it) => !it.done).length;

  TimerStart(i) {
    if (this.state.listOfItems[i].timerID == null) {
      this.state.listOfItems[i].timerID = setInterval(() => {
        if (this.state.listOfItems[i].time > 0) {
          this.setState(({ listOfItems }) => {
            listOfItems[i].time -= 1;
            return { listOfItems };
          });
        } else {
          clearInterval(this.state.listOfItems[i].timerID);
        }
      }, 1000);
    }
  }

  TimerStop(i) {
    clearInterval(this.state.listOfItems[i].timerID);
    this.setState(({ listOfItems }) => {
      listOfItems[i].timerID = null;
    });
  }

  render() {
    // (e)=>{this.setState(({listOfItems})=>{e.preventDefault()
    // const newList=[...(listOfItems.slice(0)),createItem('fdsfsd')]
    // return {listOfItems:newList}})}
    const { state } = this;
    const { listOfItems } = state;
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <form type="submit" onSubmit={this.submitCreateItem} className="new-todo-form">
            <input
              // name="text"
              onChange={this.changeItem}
              value={state.textInput}
              className="new-todo"
              placeholder="What needs to be done?"
              // autoFocus
            />
            <input
              name="minutes"
              onChange={this.setMinutes}
              value={state.minutes}
              className="new-todo-form__timer"
              placeholder="Min"
            />
            <input
              name="seconds"
              onChange={this.setSeconds}
              value={state.seconds}
              className="new-todo-form__timer"
              placeholder="Sec"
            />
            <input type="submit" style={{ display: 'none' }} />
          </form>
        </header>
        <section className="main">
          <Tasklist
            edit={(i) => this.setState(({ listOfItems }) => (listOfItems[i].className = 'editing'))}
            destroy={(i) => {
              this.setState(({ listOfItems }) => {
                const newList = [...listOfItems.slice(0, i), ...listOfItems.slice(i + 1)];
                return { listOfItems: newList };
              });
            }}
            toggleDone={(i) => {
              this.setState(({ listOfItems }) => (listOfItems[i].done = !listOfItems[i].done));
            }}
            propers={listOfItems}
            setName={(e, i) => {
              this.setState(({ listOfItems }) => {
                listOfItems[i].description = e.target.value;
              });
            }}
            submitChange={(i) => {
              this.setState(({ listOfItems }) => {
                listOfItems[i].className = '';
                return listOfItems;
              });
            }}
            TimerStart={(i) => {
              this.TimerStart(i);
            }}
            TimerStop={(i) => {
              this.TimerStop(i);
            }}
          />
          <footer className="footer">
            <span className="todo-count">{this.countItemsDone()} items left</span>
            <ul className="filters">
              <li>
                {/* <button onclick={this.selectAll} class="selected">All</button> */}
                <button type="button" onClick={this.selectAll}>
                  All
                </button>
              </li>
              <li>
                <button type="button" onClick={this.selectDone}>
                  Active
                </button>
              </li>
              <li>
                <button type="button" onClick={this.selectActive}>
                  Completed
                </button>
              </li>
            </ul>
            <button type="button" className="clear-completed" onClick={this.deleteDone}>
              Clear completed
            </button>
          </footer>
        </section>
      </section>
    );
  }
}
// let root=ReactDOM.createRoot(document.getElementById('root'))
// root.render(<Finalcode/>)
export default Finalcode;
