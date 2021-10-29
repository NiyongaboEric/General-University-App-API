export const encodeBase64 = (plainText) => {
  const buff = Buffer.from(plainText, 'utf-8');
  const base64data = buff.toString('base64');
  return base64data;
};

export const decodeBase64 = (encodedText) => {
  const buff = Buffer.from(encodedText, 'base64');
  const str = buff.toString('utf-8');
  return str;
};
