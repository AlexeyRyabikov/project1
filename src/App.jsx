import React from 'react';
import ReactDOM from 'react-dom/client';

import Tasklist from './tasklist/tasklist';

console.log(Tasklist);
const IDobj = {
  actualnum: 0,
  getfunc() {
    this.actualnum += 1;
    console.log(this.actualnum);
    return this.actualnum;
  },
};
const createItem = function (descr, done = false) {
  const objlist = {
    className: '',
    description: descr,
    done,
    visible: true,
    ID: IDobj.getfunc(),
    creationDate: new Date(),
  };
  return objlist;
};
var f
class Finalcode extends React.Component {
  constructor() {
    super();
    this.state = {
      listOfItems: [createItem('task1'), createItem('task2'), createItem('task3')],
      textInput: '',
    };
  }

  selectDone = (e) => {
    e.preventDefault();
    this.setState(({ listOfItems }) => {
      const fuck = listOfItems.map((item) => {
        if (!item.done) {
          item.visible = false;
        } else {
          item.visible = true;
        }
        return item;
      });
      return { listOfItems: fuck };
    });
  };

  deleteDone = (e) => {
    this.setState(({ listOfItems }) => {
      const fuck = listOfItems.filter((item) => !item.done);
      console.log(fuck);
      return { listOfItems: fuck };
    });
  };

  selectActive = (e) => {
    this.setState(({ listOfItems }) => {
      const fuck = listOfItems.map((item) => {
        if (item.done) {
          item.visible = false;
        } else {
          item.visible = true;
        }
        return item;
      });
      return { listOfItems: fuck };
    });
  };

  selectAll = (e) => {
    this.setState(({ listOfItems }) => {
      const fuck = listOfItems.map((item) => {
        item.visible = true;
        return item;
      });
      return { listOfItems: fuck };
    });
  };

  submitCreateItem = (e) => {
    this.setState(({ textInput, listOfItems }) => {
      e.preventDefault();
      const needArr = [...listOfItems.slice(0), createItem(textInput)];
      // console.log(needArr)
      return { listOfItems: needArr };
    });
    this.setState(() => ({ textInput: '' }));
  };

  changeItem = (e) => {
    this.setState((state) => {
      const newVal = e.target.value;
      return { textInput: newVal };
    });
  };

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
          <form onSubmit={this.submitCreateItem}>
            <input
              onChange={this.changeItem}
              value={state.textInput}
              className="new-todo"
              placeholder="What needs to be done?"
              // autoFocus
            />
          </form>
        </header>
        <section className="main">
          <Tasklist
            edit={(i) => {
              console.log(listOfItems[i], 'работает ');
              return this.setState(({ listOfItems }) => (listOfItems[i].className = 'editing'));
            }}
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
                console.log('Хуй');
                return (listOfItems[i].description = e.target.value);
              });
            }}
            submitChange={(i) => {
              this.setState(({ listOfItems }) => {
                console.log('Хуй2');
                return (listOfItems[i].className = '');
              });
            }}
          />
          <footer className="footer">
            <span className="todo-count">{listOfItems.filter((it) => !it.done).length} items left</span>
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
