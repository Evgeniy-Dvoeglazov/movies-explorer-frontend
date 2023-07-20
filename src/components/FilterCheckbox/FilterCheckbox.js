import './FilterCheckbox.css';

function FilterCheckbox(props) {

  function onSwitchCheckbox(e) {
    const shortMovieChange = e.target.checked;
    props.handleSwitchCheckbox(shortMovieChange);
  }

  return (
    <div className="filterCheckbox">
      <label className={`filterCheckbox__label ${props.isCheckboxActive && 'filterCheckbox__label_active'}`}>
        <input className="filterCheckbox__btn" checked={props.isCheckboxActive} type="checkbox" onChange={onSwitchCheckbox} />
      </label>
      <p className="filterCheckbox__description">Короткометражки</p>
    </div>
  );
}

export default FilterCheckbox;
