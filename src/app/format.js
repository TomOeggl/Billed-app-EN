export const formatDate = (dateStr) => {
  const date = new Date(dateStr)
  const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date)
  const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(date)
  const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date)
  const month = mo.charAt(0).toUpperCase() + mo.slice(1)
  return `${month.substr(0,3)}. ${parseInt(da)}, ${ye.toString().substr(0,4)}`
}
 
export const formatStatus = (status) => {
  switch (status) {
    case "pending":
      return "Pending"
    case "accepted":
      return "Accepted"
    case "refused":
      return "Cancelled"
  }
}

export const dateIsValid = (dateStr) => {
  const regex = /^\d{4}-\d{2}-\d{2}$/

  if (dateStr.match(regex) === null) {
    return false
  }

  const date = new Date(dateStr)

  const timestamp = date.getTime()

  if (typeof timestamp !== 'number' || Number.isNaN(timestamp)) {
    return false
  }

  return true
}