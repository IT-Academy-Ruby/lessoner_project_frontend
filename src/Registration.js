import Title from "./Title";
import FormInput from "./FormInput";
import Button from "./Button";

const Registration = () => {
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Z\d]{6,256}$/i;
  return (
    <div style={{
      width: '25%',
      fontSize: '0.8rem',
      border: '1px solid blue',
      padding: '30px',
      marginLeft: 'auto',
      marginRight: 'auto'
    }}>
      <Title textTitle={'Registration'}/>
      <form style={{margin: '20px 0'}}>
        <FormInput label={'Password'} validation={passwordRegex} name={'hidden'} type={'password'} required={'required'}/>
        <FormInput label={'Confirm password'} type={'password'} required={'required'} name={'hidden'}/>
        <Button type={'submit'} textButton={'Next'}/>
      </form>
    </div>
  )
}
export default Registration;