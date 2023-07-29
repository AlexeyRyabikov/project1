import { Component, useEffect, useState } from 'react';
// import ReactDOM from 'react';
import './task.css';
import { formatDistanceToNow, format, parse } from 'date-fns';

function Task({ ItemInfo, toggleDone, TimerStart, TimerStop, destroy, edit, submitChange }) {
  const { className, done, ID, description, creationDate } = ItemInfo;
  const [TaskName, setTaskName] = useState(description);
  useEffect(() => {
    if (description !== TaskName) {
      setTaskName(description);
    }
  }, [className]);
  let timer;
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
            toggleDone();
          }}
        />
        <label>
          <span className="title">{TaskName}</span>
          <span className="description">
            <button type="button" onClick={TimerStart} className="icon icon-play" />
            <button type="button" onClick={TimerStop} className="icon icon-pause" />
            <span>{`  ${Math.floor(ItemInfo.time / 60)}:${ItemInfo.time % 60}`}</span>
          </span>
          <span className="description">`created {formatDistanceToNow(creationDate)} ago`</span>
        </label>
        <button
          type="button"
          name="editButton"
          className="icon icon-edit"
          onClick={() => {
            edit();
          }}
        />
        <button
          type="button"
          className="icon icon-destroy"
          onClick={() => {
            destroy();
          }}
        />
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submitChange(TaskName);
        }}
      >
        <input
          name="inputNewName"
          type="text"
          className="edit"
          value={TaskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
      </form>
    </li>
  );
}
export default Task;
