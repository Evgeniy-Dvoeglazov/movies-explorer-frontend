import './Promo.css';
import earth from '../../images/earth.png'

function Promo() {
  return (
    <section className="promo">
      <div className="promo__container">
        <div className="promo__content">
          <div className="promo__text">
            <h1 className="promo__title">Учебный проект студента факультета Веб&#8209;разработки.
            </h1>
            <p className="promo__description">Листайте ниже, чтобы узнать больше про этот проект и&nbsp;его создателя.</p>
          </div>
          <img className="promo__image" src={earth} alt="изображение земного шара" />
        </div>
      </div>
    </section>
  );
}

export default Promo;
