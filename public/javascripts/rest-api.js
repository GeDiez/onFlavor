$(document).ready(function() {
  $('form').on('submit', function(ev) {
    ev.preventDefault();
    $.ajax({
      url: '/api/users/authorize',
      type: 'POST',
      data: {
        username: $('[name="username"]').val(),
        password: $('[name="password"]').val()
      },
      success: function(data) {
        console.log(data);
      }
    });
  });
});