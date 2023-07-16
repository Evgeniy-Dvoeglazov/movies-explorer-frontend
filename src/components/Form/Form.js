import './Form.css';

function Form(props) {
  return (
    <form className="form" onSubmit={props.onSubmit} noValidate>
      {props.children}
      {props.serverError && <span className="form__submit-error">Что-то пошло не так...</span>}
      <button className={`form__button button-opacity ${props.isValid ? '' : 'form__button_disabled'}`} type="submit" disabled={props.isLoading}>{props.buttonText}</button>
    </form>
  );
}

export default Form;
