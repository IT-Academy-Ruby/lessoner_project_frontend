const Button = ({type, textButton}) => {
  return (
    <button type={type} style={{width:'100%', padding:'0.8em', margin:'0.5em 0', border:'1px solid blue'}}>{textButton}</button>
  )
}
export default Button;