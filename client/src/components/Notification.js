const Notification = ({ message, successStatus }) => {
  if (!message) {
    return null
  }

  let color = successStatus ? 'green' : 'red';

  const notificationStyle = {
    color,
    borderStyle: 'solid',
    borderColor: color,
    borderRadius: 5,
    padding: 10,
  }

  return <p style={notificationStyle}>{message}</p>
}



export default Notification;