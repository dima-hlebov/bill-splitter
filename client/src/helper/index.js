export const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const year = date.getUTCFullYear() + 1,
          month = date.getUTCMonth(),
          day = date.getUTCDate();
    return `${day}.${month}.${year}`
}

export const handleError = (err, history) => {
    if(err.response){
      if(err.response.status === 401){
        history.push("/sign-in");
      }
    }else{
      console.log(err)
    }
}