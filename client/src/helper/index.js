export const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  const year = date.getUTCFullYear(),
    month = date.getUTCMonth() + 1,
    day = date.getUTCDate();
  return `${('0' + day).slice(-2)}.${('0' + month).slice(-2)}.${year}`
}

export const handleError = (response, history) => {
  switch (response.status) {
    case 401:
      history.push("/sign-in");
      return response.data
    case 403:
      return response.data
    default:
      return "Some server error has occured"
  }
}