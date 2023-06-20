import './FilterCheckbox.css';

function FilterCheckbox() {

  function switchChackbox() {
    document.querySelector('.filterCheckbox__label').classList.toggle('filterCheckbox__label_active');
  }

  return (
    <div className="filterCheckbox">
      <label className="filterCheckbox__label">
        <input className="filterCheckbox__btn" type="checkbox" onClick={switchChackbox} />
      </label>
      <p className="filterCheckbox__description">Короткометражки</p>
    </div >
  );
}

export default FilterCheckbox;
