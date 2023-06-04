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
function createItem(descr, done = false) {
  const objlist = {
    className: '',
    description: descr,
    done,
    visible: true,
    ID: IDobj.getfunc(),
    creationDate: new Date(),
  };
  return objlist;
}
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
          item.visible = true;
        } else {
          item.visible = false;
        }
        return item;
      });
      return { listOfItems: fuck };
    });
  };

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
      this.setState(({ textInput, listOfItems }) => {
        const needArr = [...listOfItems.slice(0), createItem(textInput)];
        // console.log(needArr)
        return { listOfItems: needArr };
      });
      this.setState(() => ({ textInput: '' }));
    }
  };

  changeItem = (e) => {
    this.setState(() => {
      const newVal = e.target.value;
      return { textInput: newVal };
    });
  };

  countItemsDone = () => this.state.listOfItems.filter((it) => !it.done).length;

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
