import "../components/modal/modal.scss";
import Button from "../components/Button";
import PasswordAndConfirm from "../components/PasswordAndConfirm";

const CodPage=()=>{

  return(
    <div className='field'>
      <div className='modal'>
        <h2 className='title'>Now a code will come to your phone. Enter it in a line.</h2>
        <PasswordAndConfirm minSymbol={5} maxSymbol={5} isConfirm={false} error={'Code must contain 5 characters'}/>
        <button className='passwordLink'>
          Resend cod
        </button>
        <Button buttonType={'submit'} buttonText={'Finish'} className={'button'}/>
      </div>
    </div>
  )
}
export default CodPage;