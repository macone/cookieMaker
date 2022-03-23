const renderError = (res, description) => res.render('errors/error.hbs', {
  description: `${description}`,
});

module.exports = {
  renderError,
};
