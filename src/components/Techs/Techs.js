import './Techs.css';

function Techs() {
  return (
    <section className="techs">
      <div className="techs__container">
        <h2 className="techs__title">Технологии</h2>
        <div className="techs__text">
          <h3 className="techs__text-title">7&nbsp;технологий</h3>
          <p className="techs__text-description">На&nbsp;курсе веб-разработки мы&nbsp;освоили технологии, которые применили в&nbsp;дипломном проекте.</p>
        </div>
        <ul className="techsItems">
          <li className="techItem">HTML</li>
          <li className="techItem">CSS</li>
          <li className="techItem">JS</li>
          <li className="techItem">React</li>
          <li className="techItem">Git</li>
          <li className="techItem">Express.js</li>
          <li className="techItem">mongoDB</li>
        </ul>
      </div>
    </section>
  );
}

export default Techs;
