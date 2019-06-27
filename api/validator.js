const isEmpty = ad => ad && ad.toString().trim() !== '';


const isEmail = (email) => {
  const mailFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return mailFormat.test(String(email).toLowerCase());
};

const isNumber = num => typeof num === 'number' && !isNaN(num);

module.exports = {
  isEmpty,
  isEmail,
  isNumber,
};
