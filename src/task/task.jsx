import { Component } from 'react';
// import ReactDOM from 'react';
import './task.css';
import { formatDistanceToNow, format, parse } from 'date-fns';

class Task extends Component {
  constructor() {
    super();
    this.state = { timerTime: 600, timerID: null };
    let timer;
  }

  TimerStart() {
    if (this.state.timerID == null) {
      this.state.timerID = setInterval(() => {
        if (this.state.timerTime > 0) {
          this.setState(({ timerTime }) => ({ timerTime: timerTime - 1 }));
        } else {
          clearInterval(this.state.timerID);
        }
      }, 1000);
    }
  }

  TimerStop() {
    clearInterval(this.state.timerID);
    this.setState(() => ({ timerID: null }));
  }

  render() {
    const { className, done, ID, description, creationDate } = this.props.props;
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
              this.props.toggleDone();
            }}
          />
          <label>
            <span className="title">{description}</span>
            <span className="description">
              <button type="button" onClick={this.TimerStart.bind(this)} className="icon icon-play" />
              <button type="button" onClick={this.TimerStop.bind(this)} className="icon icon-pause" />
              <span>{`  ${Math.floor(this.state.timerTime / 60)}:${this.state.timerTime % 60}`}</span>
            </span>
            <span className="description">`created {formatDistanceToNow(creationDate)} ago`</span>
          </label>
          <button
            type="button"
            className="icon icon-edit"
            onClick={() => {
              this.props.edit();
            }}
          />
          <button
            type="button"
            className="icon icon-destroy"
            onClick={() => {
              this.props.destroy();
            }}
          />
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            this.props.submitChange();
          }}
        >
          <input type="text" className="edit" onChange={(e) => this.props.setName(e)} />
        </form>
      </li>
    );
  }
}
export default Task;
