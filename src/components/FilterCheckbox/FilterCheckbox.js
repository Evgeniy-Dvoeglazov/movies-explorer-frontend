import './FilterCheckbox.css';
import { useState } from 'react';

function FilterCheckbox() {
    const [isCheckboxActive, setIsCheckboxActive] = useState(false);

    function switchCheckbox() {
      setIsCheckboxActive(!isCheckboxActive);
    }

  return (
    <div className="filterCheckbox">
      <label className={`filterCheckbox__label ${isCheckboxActive &&'filterCheckbox__label_active'}`}>
        <input  className="filterCheckbox__btn" type="checkbox" onClick={switchCheckbox} />
      </label>
      <p className="filterCheckbox__description">Короткометражки</p>
    </div>
  );
}

export default FilterCheckbox;
