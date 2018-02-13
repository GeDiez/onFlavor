const regexUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const testUUID = ({ uuid, msgs }) => {
  if (regexUUID.test(uuid)) {
    return { uuid, msgs };
  }
  return { uuid, msgs: [...msgs, 'el uuid no es valido'] };
};

module.exports = {
  testUUID,
};
