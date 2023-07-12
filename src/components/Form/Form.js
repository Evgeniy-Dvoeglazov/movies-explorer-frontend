import './Form.css';

function Form(props) {
  return (
    <form className="form" onSubmit={props.onSubmit} noValidate>
      {props.children}
      <button className={`form__button button-opacity ${props.isValid ? '' : 'form__button_disabled'}`} type="submit">{props.buttonText}</button>
    </form>
  );
}

export default Form;
