$(document).ready(function () {
  $('#check-duplicate').click(function (e) {
    e.preventDefault();
    var email = $('#username').val();

    $.ajax({
      url: '/check_duplicate',
      data: { username: email },
      type: 'POST',
      success: function (response) {
        alert(response.message);
      },
      error: function (error) {
        console.log(error);
      },
    });
  });
});
