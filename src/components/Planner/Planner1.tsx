import './planner.scss';
import { FC, useState } from 'react';

const tasks: string[] = [];

const Planner1 = () => {
  const [inputValue, setInputValue] = useState('');

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
            if (inputValue) {
              tasks.push(inputValue);
              setInputValue('');
            }
          }}
          className="Planner__add-button"
          type="button"
        >
          ADD
        </button>

        <ul>
          {tasks.map((task) => (
            <li
              key={Math.random()}
            >
              {task}
            </li>
          ))}

        </ul>
      </div>
    </div>
  );
};

export default Planner1;
