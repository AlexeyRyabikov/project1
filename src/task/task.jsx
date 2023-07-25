import { Component } from 'react';
// import ReactDOM from 'react';
import './task.css';
import { formatDistanceToNow } from 'date-fns';

class Task extends Component {
  constructor() {
    super();
    this.state = { TaskName: '', className: '' }; // timerID: null,
    let timer;
    const classN = '';
  }

  componentDidMount() {
    const { description } = this.props.props;
    this.setState({ TaskName: description, className: this.props.props.className });
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    return prevProps.props.className;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.props.className !== this.classN) {
      if (this.state.TaskName !== this.props.props.description) {
        this.setState({ TaskName: this.props.props.description });
      }
    }
    this.classN = prevProps.props.className;
  }

  render() {
    let completedClassText;
    if (this.props.props.done) {
      completedClassText = `${this.props.props.className} completed`;
    } else {
      completedClassText = this.props.props.className;
    }
    return (
      <li id={this.props.props.ID} className={completedClassText}>
        <div className="view">
          <input
            checked={this.props.props.done}
            className="toggle"
            type="checkbox"
            onChange={() => {
              this.props.toggleDone();
            }}
          />
          <label>
            <span className="title">{this.state.TaskName}</span>
            <span className="description">
              <button type="button" onClick={this.props.TimerStart} className="icon icon-play" />
              <button type="button" onClick={this.props.TimerStop} className="icon icon-pause" />
              <span>{` ${Math.floor(this.props.time / 60)}:${this.props.time % 60}`}</span>
            </span>
            <span className="description">`created {formatDistanceToNow(this.props.props.creationDate)} ago`</span>
          </label>
          <button
            type="button"
            className="icon icon-edit"
            onClick={() => {
              this.props.edit();
              this.setState(({ className }) => ({ className: this.props.props.className }));
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
            this.props.props.description = this.state.TaskName;
            this.props.submitChange();
          }}
        >
          <input
            type="text"
            name="inputeditTask"
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
