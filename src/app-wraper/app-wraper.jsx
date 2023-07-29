import React, { useState, useEffect } from 'react';

import Tasklist from '../tasklist/tasklist';

const IDobj = {
  actualnum: 0,
  getfunc() {
    this.actualnum += 1;
    return this.actualnum;
  },
};
function createItem(descr, done = false, min = 0, sec = 0) {
  return {
    time: min * 60 + Number(sec),
    className: '',
    description: descr,
    done,
    visible: true,
    ID: IDobj.getfunc(),
    creationDate: new Date(),
    timerID: null,
  };
}
const AppWraper = function () {
  const [listOfItems, setListOfItems] = useState([createItem('task1'), createItem('task2'), createItem('task3')]);
  const [textInput, setTextInput] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');
  const escapeInputWithoutSave = () => {
    setListOfItems((listOfItems) => {
      for (let i = 0; i < listOfItems.length; i += 1) {
        if (listOfItems[i].className.includes('editing')) {
          listOfItems[i].className = listOfItems[i].className.replace('editing', '');
        }
      }
      return [...listOfItems];
    });
  };
  useEffect(() => {
    document.addEventListener('click', (e) => {
      let mousedInput = false;
      if (e.target.name) {
        if (e.target.name.includes('input') || e.target.name.includes('editButton')) {
          mousedInput = true;
        }
      }
      if (!mousedInput) {
        setTextInput('');
        setMinutes('');
        setSeconds('');
        escapeInputWithoutSave();
      }
    });
    document.addEventListener('keydown', (e) => {
      if (e.code === 'Escape') {
        setTextInput('');
        setMinutes('');
        setSeconds('');
        escapeInputWithoutSave();
      }
    });
  }, []);

  const selectDone = (e) => {
    e.preventDefault();
    setListOfItems((listOfItems) => {
      const newList = listOfItems.map((item) => {
        if (!item.done) {
          item.visible = true;
        } else {
          item.visible = false;
        }
        return item;
      });
      return newList;
    });
  };
  const deleteDone = () => {
    setListOfItems((listOfItems) => {
      const newList = listOfItems.filter((item) => !item.done);
      return newList;
    });
  };

  const selectActive = () => {
    setListOfItems((listOfItems) => {
      const newList = listOfItems.map((item) => {
        if (item.done) {
          item.visible = true;
        } else {
          item.visible = false;
        }
        return item;
      });
      return newList;
    });
  };

  const selectAll = () => {
    setListOfItems((listOfItems) => {
      const newList = listOfItems.map((item) => {
        item.visible = true;
        return item;
      });
      return newList;
    });
  };

  const submitCreateItem = (e) => {
    e.preventDefault();
    if (textInput) {
      setListOfItems((listOfItems) => {
        const needArr = [...listOfItems.slice(0), createItem(textInput, false, minutes, seconds)]; // false, minutes, seconds
        return needArr;
      });
      setTextInput('');
      setMinutes('');
      setSeconds('');
    }
  };

  const changeItem = (e) => {
    setTextInput(e.target.value);
  };

  const countItemsDone = () => listOfItems.filter((it) => !it.done).length;

  const TimerStart = (i) => {
    if (listOfItems[i].timerID == null) {
      setListOfItems((listOfItems) => {
        listOfItems[i].timerID = setInterval(() => {
          if (listOfItems[i].time > 0) {
            setListOfItems((listOfItems) => {
              listOfItems[i].time -= 1;
              return [...listOfItems];
            });
          }
        }, 1000);
        return listOfItems;
      });
    }
  };
  const TimerStop = (i) => {
    clearInterval(listOfItems[i].timerID);
    setListOfItems((listOfItems) => {
      listOfItems[i].timerID = null;
      return listOfItems;
    });
  };
  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <form type="submit" onSubmit={submitCreateItem} className="new-todo-form">
          <input
            onChange={(e) => setTextInput(e.target.value)}
            value={textInput}
            name="inputName"
            className="new-todo"
            placeholder="What needs to be done?"
          />
          <input
            name="inputMinutes"
            onChange={(e) => setMinutes(e.target.value)}
            value={minutes}
            className="new-todo-form__timer"
            placeholder="Min"
            type="number"
          />
          <input
            name="inputSeconds"
            onChange={(e) => setSeconds(e.target.value)}
            value={seconds}
            className="new-todo-form__timer"
            placeholder="Sec"
            type="number"
          />
          <input type="submit" name="inputButton" style={{ display: 'none' }} />
        </form>
      </header>
      <section className="main">
        <Tasklist
          edit={(i) =>
            setListOfItems((listOfItems) => {
              listOfItems[i].className = 'editing';
              return [...listOfItems];
            })
          }
          destroy={(i) => {
            clearInterval(listOfItems[i].timerID);
            setListOfItems((listOfItems) => {
              const newList = [...listOfItems.slice(0, i), ...listOfItems.slice(i + 1)];
              return newList;
            });
          }}
          toggleDone={(i) => {
            setListOfItems((listOfItems) => {
              listOfItems[i].done = !listOfItems[i].done;
              return [...listOfItems];
            });
          }}
          listOfItems={listOfItems}
          setName={(e, i) => {
            setListOfItems((listOfItems) => {
              listOfItems[i].description = e.target.value;
              return [...listOfItems];
            });
          }}
          submitChange={(i, newName) => {
            setListOfItems((listOfItems) => {
              listOfItems[i].description = newName;
              listOfItems[i].className = '';
              return [...listOfItems];
            });
          }}
          TimerStart={(i) => {
            TimerStart(i);
          }}
          TimerStop={(i) => {
            TimerStop(i);
          }}
        />
        <footer className="footer">
          <span className="todo-count">{countItemsDone()} items left</span>
          <ul className="filters">
            <li>
              {/* <button onclick={this.selectAll} class="selected">All</button> */}
              <button type="button" onClick={selectAll}>
                All
              </button>
            </li>
            <li>
              <button type="button" onClick={selectDone}>
                Active
              </button>
            </li>
            <li>
              <button type="button" onClick={selectActive}>
                Completed
              </button>
            </li>
          </ul>
          <button type="button" className="clear-completed" onClick={deleteDone}>
            Clear completed
          </button>
        </footer>
      </section>
    </section>
  );
};
export default AppWraper;
