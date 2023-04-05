import "./terms.scss";
import {FormattedMessage} from "react-intl";
import {useNavigate} from "react-router-dom";
import {useState} from "react";

type TermsProps = {
  setIsOpenTerms?: (boolean: boolean) => void;
  isPolitic: boolean;
}

export const Terms = ({setIsOpenTerms, isPolitic}: TermsProps) => {
  const [isTerms, setIsTerms] = useState(isPolitic);
  const navigate = useNavigate();
  return (
    <div className="wrapper-terms">
      <div
        onClick={() => {
          setIsOpenTerms ? setIsOpenTerms(false) : navigate(-1);
        }}
        className="button-back"
      >
        <span className="arrow-back">&#10094;</span>
        <span><FormattedMessage id="app.categories.back"/></span>
      </div>
      {!isTerms &&
        <div className="page-terms">
          <p className="terms">
            <h2 className="terms-title">
              Согласие на обработку персональных данных
            </h2>
            <ul className="alignment">
              <li className="">
                Настоящим я, Субъект персональных данных, в соответствии с требованиями статьи 5 и
                абзаца второго пункта первого статьи 9
                <span className="link-terms">
                  Закона Республики Беларусь от 7 мая 2021 г. №99-З «О защите персональных данных»,
                </span>
                выражаю свое свободное, однозначное и информированное согласие по оказанию услуг
                платформы на обработку, в том числе трансграничную передачу моих персональных данных
                в соответствии с условиями настоящего согласия (далее - Согласие).
              </li>
            </ul>
          </p>
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
          <ul className="alignment">
            <li className="terms">
              Я даю свое Согласие на то, что платформа вправе осуществлять трансграничную
              передачу моих персональныхданных, если на территории иностранного государства
              не обеспечивается надлежащий уровень защиты прав субъектов персональных данных.
              Перечень иностранных государств, на территории которых обеспечивается надлежащий
              уровень защиты прав субъектов персональных данных, установлен
              <span className="link-terms">
                Приказом Национального центра защиты персональных данных Республики Беларусь
                от 15 ноября2021 г. № 14 «О трансграничной передаче персональных данных»
              </span>
              (далее – Приказ № 14).
            </li>
            <li className="terms">
              Я подтверждаю, что проинформирован о рисках, возникающих в связи с отсутствием
              надлежащего уровня защиты прав субъектов персональных данных на территории
              иностранных государств, не входящих в установленный Приказом № 14 перечень,
              а именно: о риске ненадлежащих способов защиты персональных данных от
              несанкционированного или случайного доступа к ним, изменения, блокирования,
              копирования, распространения,предоставления, удаления, а также иных неправомерных
              действий в отношении предоставленных мною персональных данных.
            </li>
          </ul>
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
                  <span
                    className="link-terms"
                    onClick={() => setIsTerms(!isTerms)}
                  >
                    Политикой в отношении обработки персональных данных,
                  </span>
                  размещенной в неограниченном доступе на Интернет-сайте.
                </li>
              </ul>
            </li>
          </ol>
        </div>}
      {isTerms &&
        <div className="page-terms">
          <div className="terms">
            <div>
              <h2 className="terms-title">
                Политика конфиденциальности
              </h2>
              <ul className="alignment">
                <li>
                  Сведения о том, как мы собираем и обрабатываем Ваши персональные данные,
                  а также обеспечиваем их безопасность при использовании Вами Сервиса,
                  приведены в нашей Политике конфиденциальности.
                </li>
              </ul>
              <ul className="alignment">
                <h6 className="main-li">
                  ПОЛЬЗОВАТЕЛЬСКИЕ ДАННЫЕ
                </h6>
                <ul className="alignment">
                  <li>
                    Создавая аккаунт Lessoner, Вы сообщаете нам личную информацию, включая
                    свое имя и пароль.
                  </li>
                  <li>
                    Мы используем личную информацию, такую как адрес электронной почты,
                    для коммуникации с Вами.
                  </li>
                  <li>
                    Благодаря полученным данным мы можем поддерживать и улучшать
                    существующие сервис,а также обеспечивать безопасность Lessoner и наших
                    пользователей.
                  </li>
                  <li>
                    Начиная использовать Сервис, Пользователь, выражает свое
                    <span
                      className="link-terms"
                      onClick={() => setIsTerms(!isTerms)}
                    >
                      согласие на обработку Персональной информации
                    </span>
                    Пользователя в Сервисе в соответствии с положениями Политикой
                    конфиденциальности.
                  </li>
                </ul>
                <h6 className="main-li">
                  БЕЗОПАСНОСТЬ
                </h6>
                <ul className="alignment">
                  <li>
                    Мы принимаем меры предосторожности для поддержания безопасности и целостности
                    личной информации, которую вы предоставляете Сервису.
                  </li>
                </ul>
                <h6 className="main-li">
                  СОДЕРЖАНИЕ СООБЩЕНИЯ
                </h6>
                <ul className="alignment">
                  <li>
                    Мы не отслеживаем, не просматриваем и не осуществляем никакого контроля над
                    ресурсами, публикуемых при использовании Сервиса (хотя мы оставляем за собой
                    право блокировать ресурсы, которые, по нашему разумному мнению, могут
                    привлечь нас или наших пользователей к ответственности). Соответственно,
                    личная информация, включенная в содержание ресурсов, используемых на Сервисе,
                    не регулируется настоящей Политикой конфиденциальности. Мы рекомендуем вам
                    избегать включения личной информации о себе или других лицах в ресурсы,
                    которые будут переданы или обнародованы.
                  </li>
                </ul>
                <h6 className="main-li">
                  ИНЫЕ ПОЛОЖЕНИЯ
                </h6>
                <ul className="alignment">
                  <li>
                    Выполнение функций Сервиса возможно только при наличии доступа к сети
                    Интернет. Пользователь самостоятельно получает и оплачивает такой доступ
                    на условиях и по тарифам своего оператора связи или провайдера доступа к
                    сети Интернет.
                  </li>
                  <li>
                    Любая информация, используемая в Сервисе, предназначена исключительно для
                    личного некоммерческого использования. При этом любое копирование информации
                    Сервиса, в том числе с использованием автоматических и иных программных
                    средств получения доступа к данным, ее воспроизведение, переработка,
                    распространение, доведение до всеобщего сведения (опубликование) в сети
                    Интернет, любое использование в средствах массовой информации и/или в
                    коммерческих целях без предварительного письменного разрешения запрещается.
                  </li>
                  <li>
                    Все вопросы и претензии, связанные с использованием/невозможностью
                    использования Сервиса, а также возможным нарушением Пользователем Сервиса
                    законодательства и/или прав третьих лиц, должны направляться через форму
                    обратной связи.
                  </li>
                </ul>
              </ul>
            </div>
            <div className="politic">
              <h2 className="terms-title">
                Политика обработки и хранения персональных данных
              </h2>
              <ol className="ol-terms">
                <li className="main-li">
                  Общие положения
                </li>
                <ol className="ol-terms">
                  <li>
                    Политика обработки персональных данных (далее – Политика) направлена на защиту
                    прав и свобод физических лиц, персональные данные которых обрабатывает Сервис.
                  </li>
                  <li>
                    Настоящая Политика разработана в соответствии с Законом Республики Беларусь от
                    07.05.2021 N 99-З «О защите персональных данных» (далее – Закон) и другими
                    нормативными правовыми актами, регламентирующим процессы обработки персональных
                    данных.
                  </li>
                  <li>
                    Положения настоящей Политики действуют бессрочно, до их замены.
                  </li>
                  <li>
                    Политика подлежит изменению, дополнению в случае появления новых и изменения
                    существующих законодательных актов и специальных нормативных документов об
                    обработке и защите персональных данных. Новая редакция Политики вступает в
                    силу с момента ее опубликования или обеспечения неограниченного доступа к
                    ней иным образом, если иное не предусмотрено новой редакцией Политики.
                  </li>
                  <li>
                    Политика является общедоступным документом.
                  </li>
                </ol>
                <li className="main-li">
                  Цели обработки персональных данных
                </li>
                <ol className="ol-terms">
                  <li>
                    Сервис обрабатывает персональные данные на законной и справедливой основе для
                    оказания услуг и передачи информации Субъекту персональных данных
                    (далее – Клиент) в процессе оказания услуги.
                  </li>
                  <li>
                    Сервис обрабатывает персональные данные Клиента с соблюдением норм
                    законодательства Республика Беларусь с целью:
                    <ol className="marker-ol">
                      <li>
                        приема обращений и заявок от Клиента;
                      </li>
                      <li>
                        информирования о новых услугах, специальных акциях и предложениях;
                      </li>
                      <li>
                        информационной рассылки.
                      </li>
                    </ol>
                  </li>
                </ol>
                <li className="main-li">
                  Перечень персональных данных, на обработку которых дает согласие Клиент
                </li>
                <p className="subtext">
                  Клиент предоставляет минимально необходимые для
                  оказания услуги персональные данные:
                </p>
                <ol className="ol-terms">
                  <li>
                    фамилия, имя, отчество (при его наличии);
                  </li>
                  <li>
                    номер мобильного телефона;
                  </li>
                  <li>
                    число, месяц, год рождения;
                  </li>
                  <li>
                    пол;
                  </li>
                  <li>
                    адрес электронной почты.
                  </li>
                </ol>
                <li className="main-li">
                  Срок, на который дается согласие Клиента на обработку персональных данных
                </li>
                <p className="subtext">
                  Клиент дает согласие на обработку персональных данных
                  до удаления аккаунта по требованию Клиента.
                </p>
                <li className="main-li">
                  Обработка персональных данных Клиента
                </li>
                <ol className="ol-terms">
                  <li>
                    Сервис обрабатывает персональные данные Клиента в рамках правоотношений с
                    ним в соответствии с законодательством Республики Беларусь.
                  </li>
                  <li>
                    Сервис получает персональные данные непосредственно у Клиента.
                  </li>
                  <li>
                    Сервис обрабатывает персональные данные автоматизированными и
                    неавтоматизированными способами, с использованием средств вычислительной
                    техники и без использования таких средств.
                  </li>
                  <li>
                    Действия по обработке персональных данных включают получение, сбор,
                    обработку, накопление, хранение и использование.
                  </li>
                  <li>
                    Сервис обрабатывает персональные данные Клиента с его согласия,
                    предоставляемого Клиентом и/или его законными представителями путем
                    проставления отметки о согласии в форме регистрации на сайте Сервиса
                    (далее – Сайт).
                  </li>
                </ol>
                <li className="main-li">
                  Сведения об обеспечении безопасности персональных данных Клиента
                </li>
                <ol className="ol-terms">
                  <li>
                    Сервис при обработке персональных данных принимает необходимые правовые,
                    организационные и технические меры или обеспечивает их принятие для защиты
                    персональных данных от неправомерного или случайного доступа к ним, уничтожения,
                    изменения, блокирования, копирования, предоставления, распространения
                    персональных данных, а также от иных неправомерных действий в отношении
                    персональных данных.
                  </li>
                  <li>
                    Для авторизации доступа к личному кабинету на сайте и используется username
                    и пароль Клиента. Ответственность за сохранность данной информации несет
                    Клиент. Клиент не вправе передавать собственный логин и пароль третьим лицам,
                    а также обязан предпринимать меры по обеспечению их конфиденциальности.
                  </li>
                  <li>
                    Меры по обеспечению безопасности персональных данных при их обработке,
                    применяемые Сервисом, планируются и реализуются в целях обеспечения
                    соответствия требованиям Закона, а также иных законодательных актов
                    Республики Беларусь.
                  </li>
                </ol>
                <li
                  className="main-li">Права Клиентов
                </li>
                <p
                  className="subtext">Клиент имеет право на:
                </p>
                <ol className="ol-terms">
                  <li>
                    получение информации, касающейся обработки персональных данных;
                  </li>
                  <li>
                    уточнение (изменение) его персональных данных в случае, если они являются
                    неполными, устаревшими, неточными;
                  </li>
                  <li>отзыв данного им согласия на обработку персональных данных;
                  </li>
                  <li>защиту своих прав и законных интересов, в том числе на возмещение убытков
                    и компенсацию морального вреда в судебном порядке;
                  </li>
                  <li>получение информации о предоставлении персональных данных третьим лицам;
                  </li>
                  <li>обжалование действий или бездействия Сервиса в уполномоченный орган по
                    защите прав потребителей или в судебном порядке.
                  </li>
                  <li>
                    Для реализации своих прав и законных интересов Клиент имеет право обратиться
                    к Пользователю информации в порядке, предусмотренном законодательством
                    Республики Беларусь.
                  </li>
                </ol>
                <li className="main-li">
                  Заключительные положения
                </li>
                <ol className="ol-terms">
                  <li>
                    Политика и отношения между Сервисом и Клиентом регулируются и толкуются в
                    соответствии с законодательством Республики Беларусь. Вопросы, не
                    урегулированные Политикой, подлежат разрешению в соответствии с
                    законодательством Республики Беларусь.
                  </li>
                  <li>
                    Политика представляет собой публичную оферту, в соответствии с частью 2 статьи
                    407 Гражданского Кодекса Республики Беларусь. Факт проставления отметки о
                    согласии с содержанием Политики Клиентом на Сайте является полным и
                    безоговорочным акцептом настоящей Политики.
                  </li>
                  <li>
                    Настоящая Политика в отношении каждого из Клиентов вступает в силу с момента
                    предоставления согласия с Политикой, и действует до момента удаления аккаунта по
                    требованию Клиента.
                  </li>
                </ol>
              </ol>
            </div>
          </div>
        </div>}
    </div>
  );
};