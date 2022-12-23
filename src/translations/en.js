/* eslint-disable max-len */
import {
  CODE, PASSWORD, USERNAME
} from "../constants";

export const messages_en = {
  "app.name": "Lessoner",
  "app.studio": "My Studio",
  "app.categories": "Categories",
  "app.lessons": "Lessons",
  "app.lessons.loading": "Data is loading...",
  "app.about": "About",
  "app.login": "LogIn",
  "app.login.title": "Login to the Lessoner",
  "app.registration": "Register",
  "app.header.login": "Log in",
  "app.header.myStudio": "My studio",
  "app.header.goStudy": "Go study",
  "app.footer": "Footer",
  "app.lessoner": "Lessoner",
  "app.sign_in": "Sign_in",
  "app.sign_up": "Sign_up",
  "app.signUp": "Sign up",
  "app.birthdaylabel": "When is your birthday?",
  "app.checkbox":
    "I agree to the processing of my personal data in accordance with the",
  "app.checkbox.terms": "Terms",
  "app.checkbox.login": "Stay logged in",
  "app.email.name": "Email",
  "app.email.notFound": "Email not found",
  "app.firstRegistrationForm.title": "Registration",
  "app.firstRegistrationForm.existsInDb":
    "This email address is already registered",
  "app.firstRegistrationForm.invalidationRules":
    "Please enter a valid email address",
  "app.firstRegistrationForm.passwordRegEx":
    "An invalid character is present in the password. Password must be between {minSymbol} and {maxSymbol} characters; upper or lower case Latin letters (a–z, A–Z); numbers from 0 to 9; symbols {symbols}",
  "app.firstRegistrationForm.passwordLength":
    "Password must be between {minSymbol} and {maxSymbol} characters",
  "app.firstRegistrationForm.passwordConfrim": "Passwords do not match ",
  "app.firstRegistrationForm.termsAndConditions":
    "You must consent to the processing of your personal data, in accordance with the Terms",
  "app.firstRegistrationForm.haveAccount": "Alredy have an account",
  "app.genderSelector.gender": "Select Your Gender",
  "app.passwordAndConfirm.pass": "Password",
  "app.passwordAndConfirm.confirmPass": "Confirm password",
  "app.passwordAndConfirm.placeholder": `At least ${PASSWORD.minLength} characters`,
  "app.phoneNumberPage.title": "Enter your phone number",
  "app.phoneNumberPage.submit": "Submit code",
  "app.phoneNumber.label": "Phone number",
  "app.loginPage.title": "Login to the Lessoner",
  "app.loginPage.checkbox": "Stay logged in",
  "app.loginPage.password": "Forgot your password?",
  "app.header.placeholder": "Search",
  "app.phoneNumber.err": "Phone number incorrect",
  "app.navbarStudyStudio.home": "Home",
  "app.navbarStudyStudio.categories": "Categories",
  "app.navbarStudyStudio.subscription": "Subscription",
  "app.navbarStudyStudio.myLessons": "My lessons",
  "app.navbarStudyStudio.watchLater": "Watch later",
  "app.navbarStudyStudio.myLesson": "My lesson",
  "app.navbarStudyStudio.management": "Management",
  "app.navbarStudyStudio.footer": "All rights reserved.",
  "app.button.next": "Next",
  "app.button.ok": "Ok",
  "app.button.finish": "Finish",
  "app.button.signIn": "Sign in",
  "app.button.code": "Resend code",
  "app.or": "or",
  "app.pagesTitle.registration": "Registration",
  "app.pagesTitle.confirm":
    "Confirm your registration using the link we sent to your email.",
  "app.pagesTitle.phoneNumber": "Enter your phone number",
  "app.pagesTitle.enterCode": "Enter the code",
  "app.pagesTitle.aboutYourself": "Tell us about yourself",
  "app.My lessons": "My lessons",
  "app.Add new lesson": "Add new lesson",
  "app.resetPasswordPage.forgotPassword": "Forgot your password?",
  "app.resetPasswordPage.enterEmailToRecoverPassword": "Enter the email that you used when register to recover your password. You will receive a password reset link",
  "app.resetPasswordPage.weSentLink": "We've sent a link to restore access to your account to the address",
  "app.resetPasswordPage.userNotFound": "User is not found. Please enter a valid email address",
  "app.resetPasswordPage.button": "Password reset",
  "app.button.categories": "+ Add category",
  "app.setNewPasswordPage.resetPassword": "Reset Password",
  "app.setNewPasswordPage.button": "Change password",
  "app.categories.image": "Image",
  "app.categories.category": "Category",
  "app.categories.description": "Description",
  "app.categories.placeholder.description": "Category description",
  "app.categories.date": "Date of adding",
  "app.categories.amount": "Amount",
  "app.categories.actions": "Actions",
  "app.categories.addCategory": "Add new category",
  "app.categories.updateCategory": "Update category",
  "app.categories.name": "Category name",
  "app.categories.name.invalid": "The input field contains prohibited characters",
  "app.categories.name.helper": "You can enter {letters} characters",
  "app.categories.description.invalid": "The input field contains prohibited characters",
  "app.categories.description.helper": "You can enter {letters} characters",
  "app.categories.uploadCategoryImage": "Upload the category image from computer",
  "app.categories.selectFile": "Select file",
  "app.categories.uploadImage": "Upload image",
  "app.categories.or": "or",
  "app.categories.dragAandDrop": "Drag and drop",
  "app.categories.button.select": "Select file",
  "app.categories.button.cancel": "Cancel",
  "app.categories.button.save": "Save",
  "app.categories.imageInform": "The image should represent the content of the category",
  "app.categories.imageError": "Incorrect format. Try again",
  "app.categories.imageBigSize": "Large file size",
  "app.activeCategories.errorMinLength": "Please fill the field",
  "app.activeCategories.errorMaxLength": "Maximum number of characters {symbols}",
  "app.activeCategories.errorProhibitedCharacters": "The input field contains prohibited characters",
  "app.don'tAccount": "Don`t you have an account?",
  "app.code.name": "Code",
  "app.code.errorLength": `Code should be ${CODE.maxLength} characters. `,
  "app.code.invalidationRules": "An invalid character is present in the Code. ",
  "app.code.inform":
    "Now a code will come to your phone.\nEnter it in a line.\n",
  "app.code.phoneNumber": "To change number",
  "app.resetPasswordPage.inform":
    "Enter the email that you used when register to recover your password. You will receive a password reset link",
  "app.resetPasswordPage.resetPassword": "Password reset",
  "app.resetPasswordPage.text":
    "We've sent a link to restore access to your account to the address ",
  "app.setNewPasswordPage.title": "Login as username",
  "app.YourselfPage.errorIncorrectName": "UserName is incorrect",
  "app.YourselfPage.errorFieldEmpty": "The field must not be empty",
  "app.YourselfPage.errorSmalName": `UserName should be more ${USERNAME.minLength}`,
  "app.YourselfPage.errorBigName": `UserName should be less ${USERNAME.maxLength}`,
  "app.UserName": "Username",
  "app.UserName.placeholder": `${USERNAME.minLength} to ${USERNAME.maxLength} characters`,
  "app.ConfirmReg.info":
    "Confirm your registration using the link we sent to your email.",
  "app.userName.nameExists":
    "User already exists. Please enter a different username",
  "app.gender.male": "Male",
  "app.gender.female": "Female",
  "app.gender.other": "Other",
  "app.categories.back": "Back",
};