export const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const year = date.getUTCFullYear() + 1,
          month = date.getUTCMonth(),
          day = date.getUTCDate();
    return `${day}.${month}.${year}`
}

export const handleError = (response, history) => {
  switch(response.status){
      case 401:
        history.push("/sign-in");
        return response.data
      case 403:
        return response.data
      default:
        return "Some server error has occured"
  }
}