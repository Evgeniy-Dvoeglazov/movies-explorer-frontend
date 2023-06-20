import './NotFoundPage.css';

function NotFoundPage() {
  return (
    <section className="notFoundPage">
      <div className="notFoundPage__container">
        <h2 className="notFoundPage__title">404</h2>
        <p className="notFoundPage__description">Страница не&nbsp;найдена</p>
        <a href="#" className="notFoundPage__link link-opacity" rel="noreferrer">Назад</a>
      </div>
    </section>
  );
}

export default NotFoundPage;
