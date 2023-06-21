import './Form.css';

function Form(props) {
  return (
    <form className="form__form" noValidate>
      {props.children}
      <button className="form__button button-opacity" type="submit">{props.buttonText}</button>
    </form>
  );
}

export default Form;
