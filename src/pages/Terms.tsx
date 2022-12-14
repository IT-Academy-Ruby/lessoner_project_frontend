import "./terms.scss";
import {FormattedMessage} from "react-intl";
import {Link} from "react-router-dom";

const Terms = () => {
  return (
    <div className="wrapper-terms">
      <Link to="/user/sign_up" className="button-back">
        <span className="arrow-back">&#10094;</span>
        <span><FormattedMessage id="app.categories.back"/></span>
      </Link>
      <div className="page-terms">
        <span className="terms">
          <h3 className="terms-title">
            Согласие на обработку персональных данных
          </h3>
          <span>
            Настоящим я, Субъект персональных данных, в соответствии с требованиями статьи 5 и
            абзаца второго пункта первого статьи 9
            <Link to="https://pravo.by/upload/docs/op/H12100099_1620939600.pdf" className="link">
              Закона Республики Беларусь от 7 мая 2021 г. №99-З «О защите персональных данных»,
            </Link>
            выражаю свое свободное, однозначное и информированное согласие по оказанию услуг
            платформы на обработку, в том числе трансграничную передачу моих персональных данных
            в соответствии с условиями настоящего согласия (далее - Согласие).
          </span>
        </span>
        <ol className="ol-terms">
          <li>
            Обработка персональных данных, в том числе трансграничная передача персональных
            данных, для которой необходимо мое согласие как Субъекта персональных данных,
            осуществляется в целях повышения адресности предложений и услуг платформы при
            направлении Субъекту персональных данных рассылок рекламного и информационного
            характера, в том числе уведомлений и коммерческих предложений, связанных с услугами
            платформы.
          </li>
          <li>
            Согласие дается на обработку и трансграничную передачу следующих персональных данных:
            <ul>
              <li>
                2.1. фамилия, имя, отчество (при его наличии);
              </li>
              <li>
                2.2. номер мобильного телефона;
              </li>
              <li>
                2.3. число, месяц, год рождения;
              </li>
              <li>
                2.4. пол;
              </li>
              <li>
                2.5. адрес электронной почты.
              </li>
            </ul>
          </li>
          <li>
            Срок, на который дается согласие Субъекта персональных данных: с момента его
            предоставления и в течение всего срока действия договора об оказании услуг,
            либо до отзыва Субъектом персональных данных настоящего Согласия.
          </li>
          <li>
            Перечень действий с персональными данными Субъекта персональных данных: сбор,
            систематизация, хранение, изменение, использование, обезличивание, блокирование,
            предоставление, в том числе трансграничная передача персональных данных, и удаление.
          </li>
        </ol>
        <span className="terms">
          Я даю свое Согласие на то, что платформа вправе осуществлять трансграничную
          передачу моих персональныхданных, если на территории иностранного государства
          не обеспечивается надлежащий уровень защиты прав субъектов персональных данных.
          Перечень иностранных государств, на территории которых обеспечивается надлежащий
          уровень защиты прав субъектов персональных данных, установлен
          <Link
            to="https://etalonline.by/document/?regnum=u621e3030&q_id=4388578"
            className="link">
            Приказом Национального центра защиты персональных данных Республики Беларусь
            от 15 ноября2021 г. № 14 «О трансграничной передаче персональных данных»
          </Link>
          (далее – Приказ № 14).
        </span>

        <span className="terms">
          Я подтверждаю, что проинформирован о рисках, возникающих в связи с отсутствием
          надлежащего уровня защиты прав субъектов персональных данных на территории
          иностранных государств, не входящих в установленный Приказом № 14 перечень,
          а именно: о риске ненадлежащих способов защиты персональных данных от
          несанкционированного или случайного доступа к ним, изменения, блокирования,
          копирования, распространения,предоставления, удаления, а также иных неправомерных
          действий в отношении предоставленных мною персональных данных.
        </span>
        <ol className="ol-terms">
          <li>
            Обработка представленных Субъектом персональных данных осуществляется как с
            использованием средств автоматизации, так и без использования средств автоматизации.
          </li>
          <li>
            Направление Субъекту персональных данных, в том числе с привлечением третьих лиц,
            предложений платформы, рекламной и справочной информации об услугах платформы будет
            осуществляться посредством рассылки SMS- и (или) Viber-уведомлений, рассылки
            уведомлений на электронную почту.
          </li>
          <li>
            Настоящим я, Субъект персональных данных, подтверждаю, что:
            <ul>
              <li>
                3.1. мне разъяснены права, связанные с обработкой моих персональных данных,
                механизм реализации таких прав, а также последствия дачи мною Согласия или
                моего отказа в даче такого Согласия в соответствии с положениями Закона Республики
                Беларусь от 7 мая 2021 г. №99-З «О защите персональных данных»;
              </li>
              <li>
                3.2. я ознакомлен с
                <Link to="" className="link">
                  Политикой в отношении обработки персональных данных,
                </Link>
                размещенной в неограниченном доступе на Интернет-сайте.
              </li>
            </ul>
          </li>
        </ol>
      </div>
    </div>
  );
};

export default Terms;