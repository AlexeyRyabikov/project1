// import React from 'react';
// import ReactDOM from 'react';
import './task.css';
import { formatDistanceToNow } from 'date-fns';

function Task(dataobj) {
  const { props } = dataobj;
  const { className, done, ID, description, creationDate } = props;
  let completedClassText;
  if (done) {
    completedClassText = `${className} completed`;
  } else {
    completedClassText = className;
  }
  return (
    <li id={ID} className={completedClassText}>
      <div className="view">
        {/* checked={false}  */}
        <input
          checked={done}
          className="toggle"
          type="checkbox"
          onChange={() => {
            dataobj.toggleDone();
          }}
        />
        <label>
          <span className="description">{description}</span>
          <span className="created">`created {formatDistanceToNow(creationDate)} ago`</span>
        </label>
        <button
          type="button"
          className="icon icon-edit"
          onClick={() => {
            dataobj.edit();
          }}
        />
        <button
          type="button"
          className="icon icon-destroy"
          onClick={() => {
            dataobj.destroy();
          }}
        />
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          dataobj.submitChange();
        }}
      >
        <input type="text" className="edit" onChange={(e) => dataobj.setName(e)} />
      </form>
    </li>
  );
}
export default Task;
