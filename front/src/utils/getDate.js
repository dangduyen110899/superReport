const getDate = () => {
  const date = new Date()
  const dateCurrent = date.toJSON().slice(0,10).replace(/-/g,'-') + " " + date.getHours() + ":" +  date.getMinutes()
  return dateCurrent
}

export default getDate;
