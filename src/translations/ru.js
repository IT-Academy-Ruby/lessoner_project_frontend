/* eslint-disable max-len */
import {
  CODE, PASSWORD, USERNAME
} from "../constants";

export const messages_ru = {
  "app.name": "The Lessoner",
  "app.studio": "Моя студия",
  "app.categories": "Категории",
  "app.lessons": "Уроки",
  "app.lessons.loading": "Загрузка данных...",
  "app.about": "О нас",
  "app.login": "Авторизация",
  "app.login.title": "Авторизация в Lessoner",
  "app.registration": "Регистрация",
  "app.header.login": "Авторизоваться",
  "app.header.myStudio": "Моя студия",
  "app.header.goStudy": "Учиться",
  "app.footer": "Подвал",
  "app.lessoner": "Lessoner",
  "app.sign_in": "Войти",
  "app.sign_up": "Зарегистрироваться",
  "app.signUp": "Зарегистрироваться",
  "app.birthdaylabel": "Когда у тебя день рождения?",
  "app.checkbox":
    "Даю согласие на обработку моих персональных данных в соответствии с",
  "app.checkbox.terms": "Условиями",
  "app.checkbox.login": "Остаться в системе",
  "app.email.name": "Электронная почта",
  "app.email.notFound": "Электронная почта не найдена",
  "app.email.error":
    "Пожалуйста, введите действительный адрес электронной почты",
  "app.firstRegistrationForm.title": "Регистрация",
  "app.firstRegistrationForm.existsInDb":
    "Этот адрес электронной почты уже зарегистрирован",
  "app.firstRegistrationForm.invalidationRules":
    "Пожалуйста, введите корректный адрес электронной почты",
  "app.firstRegistrationForm.passwordRegEx":
    "В пароле присутствует недопустимый символ. Пароль должен быть от {minSymbols} до {maxSymbols} символов; заглавные или строчные латинские буквы (a–z, A–Z); цифры от 0 до 9; символы {symbols}",
  "app.firstRegistrationForm.passwordLength":
    "Пароль должен быть от {minSymbols} до {maxSymbols} символов",
  "app.firstRegistrationForm.passwordConfrim": "Пароли не совпадают",
  "app.firstRegistrationForm.termsAndConditions":
    "Вы должны дать согласие на обработку ваших персональных данных в соответствии с Условиями",
  "app.firstRegistrationForm.haveAccount": "Уже есть аккаунт",
  "app.genderSelector.gender": "Укажите свой пол",
  "app.passwordAndConfirm.pass": "Пароль",
  "app.passwordAndConfirm.confirmPass": "Подтвердите пароль",
  "app.passwordAndConfirm.placeholder": `Не менее ${PASSWORD.minLength} символов`,
  "app.phoneNumberPage.title": "Введите номер вашего телефона",
  "app.phoneNumber.label": "Номер телефона",
  "app.phoneNumberPage.submit": "Отправить код",
  "app.loginPage.title": "Зарегистрироваться на Учитель",
  "app.loginPage.checkbox": "Оставаться в системе",
  "app.loginPage.password": "Забыли пароль?",
  "app.header.placeholder": "Поиск",
  "app.phoneNumber.err": "Некорректный номер телефона",
  "app.navbarStudyStudio.home": "Дом",
  "app.navbarStudyStudio.categories": "Категории",
  "app.navbarStudyStudio.subscription": "Моя студия",
  "app.navbarStudyStudio.myLessons": "Мои уроки",
  "app.navbarStudyStudio.watchLater": "Смотреть позже",
  "app.navbarStudyStudio.myLesson": "Мой урок",
  "app.navbarStudyStudio.management": "Управление",
  "app.navbarStudyStudio.contacts": "Контакты",
  "app.navbarStudyStudio.aboutUs": "О нас",
  "app.navbarStudyStudio.darkTheme": "Темная тема",
  "app.navbarStudyStudio.lightTheme": "Светлая тема",
  "app.navbarStudyStudio.logIn": "Войти",
  "app.navbarStudyStudio.logOut": "Выйти",
  "app.navbarStudyStudio.footer": "Все права защищены.",
  "app.navbarStudyStudio.policy": "Политика конфиденциальности.",
  "app.button.next": "Дальше",
  "app.button.ok": "Хорошо",
  "app.button.finish": "Закончить",
  "app.button.signIn": "Войти",
  "app.button.code": "Отправить код еще раз",
  "app.or": "или",
  "app.button.addsubtitles": "Добавить субтитры",
  "app.button.cancel": "Отменить",
  "app.button.save": "Сохранить",
  "app.pagesTitle.registration": "Регистрация",
  "app.pagesTitle.confirm":
    "Подтвердите регистрацию по ссылке, которую мы отправили вам на почту.",
  "app.pagesTitle.phoneNumber": "Введите свой номер телефона",
  "app.pagesTitle.enterCode": "Введите код",
  "app.pagesTitle.aboutYourself": "Расскажите нам о себе",
  "app.My lessons": "Мои уроки",
  "app.Add new lesson": "Добавить новый урок",
  "app.resetPasswordPage.forgotPassword": "Забыли свой пароль?",
  "app.resetPasswordPage.enterEmailToRecoverPassword": "Введите адрес электронной почты, который вы использовали при регистрации, чтобы восстановить пароль. Вы получите ссылку для сброса пароля",
  "app.resetPasswordPage.weSentLink": "Мы отправили ссылку для восстановления доступа к вашему аккаунту на адрес",
  "app.resetPasswordPage.userNotFound": "Пользователь не найден. Пожалуйста, введите корректный адрес электронной почты",
  "app.resetPasswordPage.button": "Сбросить пароль",
  "app.button.categories": "+ Добавить категорию",
  "app.setNewPasswordPage.resetPassword": "Сбросить пароль",
  "app.setNewPasswordPage.button": "Изменить пароль",
  "app.categories.image": "Изображение",
  "app.categories.category": "Категория",
  "app.categories.description": "Описание",
  "app.categories.placeholder.description": "Описание категории",
  "app.categories.date": "Дата добавления",
  "app.categories.amount": "Количество",
  "app.categories.actions": "Действия",
  "app.categories.addCategory": "Добавить новую категорию",
  "app.categories.updateCategory": "Обновить категорию",
  "app.categories.name": "Название категории",
  "app.categories.name.invalid": "Поле ввода содержит запрещенные символы",
  "app.categories.name.helper": "Вы можете ввести {letters} символов",
  "app.categories.description.invalid": "Поле ввода содержит запрещенные символы",
  "app.categories.description.helper": "Вы можете ввести {letters} символов",
  "app.categories.uploadCategoryImage": "Загрузить изображение категории с компьютера",
  "app.categories.selectFile": "Выберите файл",
  "app.categories.uploadImage": "Загрузить изображение",
  "app.categories.or": "или",
  "app.categories.dragAandDrop": "Перетащите",
  "app.categories.button.select": "Выбрать файл",
  "app.categories.button.cancel": "Отмена",
  "app.categories.button.save": "Сохранить",
  "app.activeCategories.errorMinLength": "Пожалуйста заполните поле",
  "app.activeCategories.errorMaxLength": "Максимальное количество символов {symbols}",
  "app.activeCategories.errorProhibitedCharacters": "Поле ввода содержит запрещенные символы.",
  "app.don'tAccount": "У вас нет аккаунта?",
  "app.code.name": "Код",
  "app.code.errorLength": `Код должен содержать ${CODE.maxLength} символов. `,
  "app.code.invalidationRules": "В коде присутствует недопустимый символ. ",
  "app.code.inform":
    "Теперь на ваш телефон придет код.\n Введите его в строку.",
  "app.code.phoneNumber": "Изменить номер",
  "app.resetPasswordPage.inform":
    "Введите адрес электронной почты, который вы использовали при регистрации для восстановления пароля. Вы получите ссылку для сброса пароля",
  "app.resetPasswordPage.resetPassword": "Сброс пароля",
  "app.resetPasswordPage.text":
    "Мы отправили ссылку для восстановления доступа к вашему аккаунту на адрес ",
  "app.setNewPasswordPage.title": "Войти как пользователь",
  "app.YourselfPage.errorIncorrectName": "Неверное имя пользователя",
  "app.YourselfPage.errorFieldEmpty": "Поле не должно быть пустым",
  "app.YourselfPage.errorSmalName": `Имя пользователя должно быть длинее ${USERNAME.minLength} символов`,
  "app.YourselfPage.errorBigName": `Имя пользователя должно быть короче ${USERNAME.maxLength} символов`,
  "app.UserName": "Имя пользователя",
  "app.UserName.placeholder": `${USERNAME.minLength} до ${USERNAME.maxLength} символов`,
  "app.ConfirmReg.info":
    "Подтвердите регистрацию по ссылке, которую мы отправили вам на почту.",
  "app.userName.nameExists":
    "Пользователь уже существует. Пожалуйста, введите другое имя пользователя",
  "app.gender.male": "Мужской",
  "app.gender.female": "Женский",
  "app.gender.other": "Другой",
  "app.categories.back": "Назад",
  "app.editVideoLesson.title": "Изменить урок",
  "app.editVideoLesson.errorNotFilled": "Поле не заполнено",
  "app.editVideoLesson.errorProhibitedCharacters": "Поле ввода содержит запрещенные символы",
  "app.editVideoLesson.errorMaxCharacters": "Максимальное количество символов {maxNameLength}",
  "app.editVideoLesson.errorMaxCharactersDescr": "Максимальное количество символов - {maxDescriptionLength}",
  "app.editVideoLesson.errorMaxHachTagDescr": "Максимальное количество хэштегов - {maxDescriptionHashTagCount}",
  "app.editVideoLesson.lableName": "Имя",
  "app.editVideoLesson.lableCategory": "Категория",
  "app.editVideoLesson.lableCategoryMusic": "Музыка",
  "app.editVideoLesson.lableCategoryDesign": "Дизайн",
  "app.editVideoLesson.lableDescription": "Описание",
  "app.editVideoLesson.lableSubtitles": "Субтитры",
  "app.editVideoLesson.lableSubtitlesText": "Добавьте субтитры, чтобы охватить большую аудиторию.",
  "app.editVideoLesson.lableThumbnail": "Миниатюра",
  "app.editVideoLesson.lableThumbnailText": "Выберите или загрузите изображение, которое показывает, что в вашем видео.",
};

