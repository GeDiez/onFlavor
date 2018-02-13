const validation = {
  fieldsRequireds: ({ dishes, msgs }) => {
    const errors = dishes.reduce((vi, dish, i) => {
      if (!dish.name || !dish.price)
        return [...vi, 'faltan campos name o price in obj con index: ' + i];
      return vi;
    }, []);
    console.log(errors);
    return { dishes, msgs: [...msgs, ...errors] };
  },
};

module.exports = validation;
