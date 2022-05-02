import './planner.scss';
import { FC, useState } from 'react';
// import { title } from 'process';

const tasks: string[] = [];
const initialArray = [
  {
    title: '',
    isDone: false,
    inProgress: false,
    beingEdited: false,
  },
];

type TaskListProps = {
  title: string,
  isDone: boolean,
  inProgress: boolean,
  beingEdited: boolean,
};

const Planner3 = () => {
  const [inputValue, setInputValue] = useState('');
  const [taskLists, setTaskLists] = useState<TaskListProps[]>([]);
  const [allTaskLists, setAllTaskLists] = useState<TaskListProps[]>([...taskLists]);

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
    newArray[index].title = inputValue;
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
  ];

  return (
    <div className="col-xs-12">
      <div className="Planner__container">

        <input
          className="Planner__input"
          type="text"
          value={inputValue}
          onChange={(e) => (
            setInputValue(e.target.value)
          )}
        />

        <button
          onClick={() => {
            setAllTaskLists([...allTaskLists, {
              title: inputValue, isDone: false, inProgress: true, beingEdited: false,
            }]);
            setTaskLists([...taskLists, {
              title: inputValue, isDone: false, inProgress: true, beingEdited: false,
            }]);
            setInputValue('');
          }}
          className="Planner__add-button"
          type="button"
        >
          ADD
        </button>

        <div className="Planner__progress-bar-container">
          {allTaskLists.map((allTaskList) => (allTaskList.isDone
            ? <div style={{ order: '1' }} key={Math.random()} className="Planner__progress-bar__unit unit" />
            : <div key={Math.random()} className="Planner__progress-bar__unit" />))}

        </div>

        <ul>
          {taskLists.map(({ title, beingEdited, isDone }, index) => (
            beingEdited ? (
              <div key={title}>
                <input
                  type="text"
                  className="Planner-list-item__edit-input"
                  value={inputValue}
                  onChange={(e) => { setInputValue(e.target.value); }}
                />
                <button
                  className="Planner-list-item__edit-save-button"
                  onClick={() => {
                    setTaskLists(getUnedited(index));
                    setInputValue('');
                  }}
                >
                  Save
                </button>
                <button
                  className="Planner-list-item__edit-cancel-button"
                  onClick={() => {
                    setTaskLists(getOriginalInputValue(index));
                  }}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div key={title}>
                <input
                  type="checkbox"
                  className="Planner-list-item__is-done-checkbox"
                  onChange={() => { setTaskLists(completed(index)); }}
                  checked={isDone}
                />
                {isDone ? <s>{title}</s> : title}
                <button
                  className="Planner-list-item__edit-save-button"
                  onClick={() => { setTaskLists(getEdit(index)); }}
                >
                  Edit
                </button>
                <button
                  className="Planner-list-item__close-button"
                  onClick={() => {
                    setAllTaskLists(allTaskLists.filter((_, i) => (i !== index)));
                    setTaskLists(taskLists.filter((_, i) => (i !== index)));
                  }}
                >
                  x
                </button>
              </div>
            )))}

        </ul>
        <div>
          {buttons.map(({ title, action }) => (
            <button
              className="Planner__button"
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

export default Planner3;
