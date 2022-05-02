import './planner.scss';
import { FC, useState } from 'react';
// import { title } from 'process';

// const tasks: string[] = [];
// const initialArray = [
//   {
//     title: '',
//     isDone: false,
//     inProgress: false,
//     beingEdited: false,
//   },
// ];

type TaskListProps = {
  title: string,
  isDone: boolean,
  inProgress: boolean,
  beingEdited: boolean,
  priority: string,
};

const Planner4 = () => {
  const [inputValue, setInputValue] = useState('');
  const [editInputValue, setEditInputValue] = useState('');
  const [taskLists, setTaskLists] = useState<TaskListProps[]>([]);
  const [allTaskLists, setAllTaskLists] = useState<TaskListProps[]>([...taskLists]);
  const [Priority, setPriority] = useState('low');

  const completed = (index: number) => {
    const newtaskLists = [...allTaskLists];
    newtaskLists[index].isDone = !newtaskLists[index].isDone;
    return newtaskLists;
  };

  const getEdit = (index:number) => {
    const newArray = [...allTaskLists];
    newArray[index].beingEdited = true;
    return newArray;
  };

  const getUnedited = (index:number) => {
    const newArray = [...allTaskLists];
    newArray[index].beingEdited = false;
    newArray[index].title = editInputValue;
    return newArray;
  };

  const getOriginalInputValue = (index:number) => {
    const newArray = [...allTaskLists];
    newArray[index].beingEdited = false;
    newArray[index].title = allTaskLists[index].title;
    return newArray;
  };

  const buttons = [
    {
      title: 'All',
      action: () => setTaskLists(allTaskLists),
    },
    {
      title: 'In Progress',
      action: () => {
        const tasksInProgress = allTaskLists.filter((allTaskList) => !allTaskList.isDone);
        return setTaskLists(tasksInProgress);
      },
    },
    {
      title: 'Completed',
      action: () => {
        const tasksCompleted = allTaskLists.filter((allTaskList) => allTaskList.isDone);
        return setTaskLists(tasksCompleted);
      },
    },
    {
      title: 'High Priority',
      action: () => {
        const highPriority = allTaskLists.filter((allTaskList) => allTaskList.priority === 'high');
        return setTaskLists(highPriority);
      },
    },
    {
      title: 'Medium Priority',
      action: () => {
        const highPriority = allTaskLists.filter((allTaskList) => allTaskList.priority === 'medium');
        return setTaskLists(highPriority);
      },
    },
    {
      title: 'Low Priority',
      action: () => {
        const highPriority = allTaskLists.filter((allTaskList) => allTaskList.priority === 'low');
        return setTaskLists(highPriority);
      },
    },
  ];

  return (
    <div className="col-xs-7">
      <div className="planner__container container-fluid">
        <div className="planner__input-container">
          <input
            className="planner__input"
            type="text"
            value={inputValue}
            onChange={(e) => (
              setInputValue(e.target.value)
            )}
          />
          <form
            className="planner__form"
            action=""
          >
            <select
              className="planner__select"
              onChange={(e) => (
                setPriority(e.target.value)
              )}
              name="Priority"
              id="Priority"
            >
              <option
                value="high"
              >
                High
              </option>
              <option
                value="medium"
              >
                Medium
              </option>
              <option
                value="low"
              >
                Low
              </option>
            </select>

            <button
              className="planner__button"
              onClick={() => {
                setAllTaskLists([...allTaskLists, {
                  title: inputValue, isDone: false, inProgress: true, beingEdited: false, priority: Priority,
                }]);
                setTaskLists([...taskLists, {
                  title: inputValue, isDone: false, inProgress: true, beingEdited: false, priority: Priority,
                }]);
                setInputValue('');
              }}
              type="button"
            >
              ADD
            </button>
          </form>
        </div>
        <div className="planner__progress-bar-container">
          {allTaskLists.map((allTaskList) => (allTaskList.isDone
            ? <div style={{ order: '1' }} className="planner__progress-bar__unit unit" />
            : <div className="planner__progress-bar__unit" />))}

        </div>

        <ul className="planner__unordered-list">
          {taskLists.map(({
            title, beingEdited, isDone, priority,
          }, index) => (
            beingEdited ? (
              <div
                className={priority}
                key={title}
              >
                <li className="planner__task">
                  <input
                    type="text"
                    className="planner__input"
                    value={editInputValue}
                    placeholder={title}
                    onChange={(e) => { setEditInputValue(e.target.value); }}
                  />
                  <button
                    className="planner__button"
                    onClick={() => {
                      setTaskLists(getUnedited(index));
                      setEditInputValue('');
                    }}
                  >
                    Save
                  </button>
                  <button
                    className="planner__button"
                    onClick={() => {
                      setTaskLists(getOriginalInputValue(index));
                    }}
                  >
                    Cancel
                  </button>
                </li>
              </div>
            ) : (
              <div
                className={priority}
                key={title}
              >
                <li
                  className="planner__task"
                >
                  <input
                    type="checkbox"
                    className="planner__checkbox"
                    onChange={() => { setTaskLists(completed(index)); }}
                    checked={isDone}
                  />
                  {isDone ? <s>{title}</s> : title}
                  <button
                    className="planner__button"
                    onClick={() => { setTaskLists(getEdit(index)); }}
                  >
                    Edit
                  </button>
                  <button
                    className="planner__button"
                    onClick={() => {
                      setTaskLists(allTaskLists.filter((_, i) => (i !== index)));
                      setTaskLists(taskLists.filter((_, i) => (i !== index)));
                    }}
                  >
                    x
                  </button>
                </li>
              </div>
            )))}

        </ul>
        <div className="planner__button-container">
          {buttons.map(({ title, action }) => (
            <button
              className="planner__button"
              key={Math.random()}
              onClick={() => { action(); }}
            >
              {title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Planner4;
