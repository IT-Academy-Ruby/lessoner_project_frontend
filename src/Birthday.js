const Birthday = () => {
  const date = new Date();
  const today = date.getFullYear() + '-' + (date.getUTCMonth() < 9 ? '0' : '') + (date.getUTCMonth() + 1) + '-' + (date.getUTCDate() < 10 ? '0' : '') + date.getUTCDate();
  console.log(today)
  return (
    <div>
      <label style={{fontWeight: 'bold', margin: '5px 0', display: 'block'}}>When is your birthday?</label>
      <input type={'date'}
             min='1900-01-01'
             max={today}
             style={{
               boxSizing: 'border-box', width: '100%', padding: '0.5em',
               border: '1px solid blue',
               borderRadius: '0.2em'
             }}/>
      <p>We will not show your birthday to other users.</p>
    </div>
  )
}
export default Birthday;