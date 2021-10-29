const validate = (contact) => {
  const errors = {};

  if (contact.trim().length === 0) {
    errors.needed = 'Both country code and numbers can not be empty';
  }
  if (contact.length > 14) {
    errors.maximum = 'maximum phone number is fourteen(14) digits';
  } else if (contact.length <= 7) {
    errors.minimum = 'Minimum phone number is seven(7) digits';
  }
  if (/\b \b/.test(contact.trim())) {
    errors.space = 'Phone number can not contain space';
  } else if (!/^[0-9]*$/.test(contact)) {
    errors.text = 'Phone number can not contain letters and special characters';
  }
  return Object.values(errors);
};

export default validate;
