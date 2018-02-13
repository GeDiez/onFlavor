const resFormat = (status, errors, data) => {
  const codeStatus = status || 200;
  return {
    codeStatus,
    data,
    errors,
  };
};

module.exports = resFormat;
