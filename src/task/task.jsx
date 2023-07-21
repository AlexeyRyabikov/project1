import { Component } from 'react';
// import ReactDOM from 'react';
import './task.css';
import { formatDistanceToNow, format, parse } from 'date-fns';

class Task extends Component {
  constructor() {
    super();
    this.state = { TaskName: '' }; // timerID: null,
    let timer;
  }

  componentDidMount() {
    const { description } = this.props.props;
    this.setState({ TaskName: description });
  }

  // TimerStop() {
  //   clearInterval(this.state.timerID);
  //   this.setState(() => ({ timerID: null }));
  // }

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
            <span className="title">{this.state.TaskName}</span>
            <span className="description">
              {/* this.TimerStart.bind(this) */}
              {/* onClick={this.TimerStop.bind(this)} */}
              <button type="button" onClick={this.props.TimerStart} className="icon icon-play" />
              <button type="button" onClick={this.props.TimerStop} className="icon icon-pause" />
              <span>{`  ${Math.floor(this.props.time / 60)}:${this.props.time % 60}`}</span>
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
          <input
            type="text"
            className="edit"
            value={this.state.TaskName}
            onChange={(e) => this.setState({ TaskName: e.target.value })}
          />
        </form>
      </li>
    );
  }
}
export default Task;
