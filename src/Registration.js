import Title from "./Title";
import FormInput from "./FormInput";
import Button from "./Button";
import Birthday from "./Birthday";

const Registration = () => {
  const passwordRegex = /^[-/\\=!#$%&'*+?^_`{|}~.A-Z\d]{6,256}$/i;
  const userNameRegex = /^[._*()<>A-Z\d]{3,50}$/i;
  // const phoneNumberRegex = /^\w*$/i;
  return (
    <div style={{
      width: '25%',
      fontSize: '0.8rem',
      border: '1px solid #0747a6',
      padding: '30px',
      marginLeft: 'auto',
      marginRight: 'auto'
    }}>
      <Title textTitle={'Registration'}/>
      <form style={{margin: '20px 0'}}>
        <FormInput label={'User name'}
                   validation={userNameRegex}
                   type={'text'}
                   required={'required'}/>
        <FormInput label={'Phone number'}
                   // validation={phoneNumberRegex}
                   type={'text'}
                   required={'required'}/>
        <FormInput label={'Password'}
                   validation={passwordRegex}
                   name={'hidden'}
                   type={'password'}
                   required={'required'}/>
        <FormInput label={'Confirm password'}
                   type={'password'}
                   required={'required'}
                   name={'hidden'}/>
        <Birthday/>
        <Button type={'submit'} textButton={'Next'}/>
      </form>
    </div>
  )
}
export default Registration;