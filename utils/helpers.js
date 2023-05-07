
module.exports = {
    format_date: date => {
       return date.toLocaleDateString();
    },
    format_plural: (comment, amount) => {
      if (comment !== 1) {
        return `${comment}s`;
      }
      return comment;
    }  
  };