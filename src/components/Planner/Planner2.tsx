import './planner.scss';
import { FC, useState } from 'react';

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

const Planner2 = () => {
  const [inputValue, setInputValue] = useState('');
  const [taskLists, setTaskLists] = useState<TaskListProps[]>([]);
  const [allTaskLists, setAllTaskLists] = useState<TaskListProps[]>([...taskLists]);

  const completed = (index: number) => {
    const newtaskLists = [...allTaskLists];
    newtaskLists[index].isDone = !newtaskLists[index].isDone;
    return newtaskLists;
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
      <div className="Planner2__container">

        <input
          className="Planner2__input"
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
          {taskLists.map((taskList, index) => (
            <div key={Math.random()}>
              <li>
                <button
                  onClick={() => {
                    setTaskLists(taskLists.filter((_, i) => i !== index));
                    setAllTaskLists(taskLists.filter((_, i) => i !== index));
                  }}
                >
                  X
                </button>
                <input
                  checked={taskList.isDone}
                  type="checkbox"
                  onChange={() => setTaskLists(completed(index))}

                />
                {taskList.isDone ? <s>{taskList.title}</s> : taskList.title}
              </li>

            </div>

          ))}

        </ul>
        <div>
          {buttons.map(({ title, action }) => (
            <button
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

export default Planner2;
