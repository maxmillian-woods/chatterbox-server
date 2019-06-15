const FormView = {
  $form: $('form'),
  currentUser: null,

  initialize() {
    FormView.$form.on('submit', FormView.handleSubmit);
  },

  setUser(username) {
    FormView.currentUser = username;
  },

  handleSubmit(event) {
    // Stop the browser from submitting the form
    const msgText = $('.message').val();
    const room = document.getElementById('rm').value;
    const msg = {
      username: FormView.currentUser,
      text: msgText,
      roomname: room
    };

    Parse.create(msg, data => {
      if (!msg.text.includes('<')) {
        $('#chats').prepend(
          `<div class="media>"<a class="media-left" href="/scripts/friends.js"><img alt="" class="media-object img-rounded" src="http://placehold.it/64x64"></a><div class="media-body"><h4 class="media-heading username">${
            msg.username
          }</h4><p>${
            msg.text
          }</p><ul class="nav nav-pills nav-pills-custom"><li><a href="/scripts/friends.js"><span class="glyphicon glyphicon-share-alt"></span></a></li><li><a href="#"><span class="glyphicon glyphicon-retweet"></span></a></li><li><a href="#"><span class="glyphicon glyphicon-star"></span></a></li><li><a href="#"><span class="glyphicon glyphicon-option-horizontal"></span></a></li></ul></div></div>`
        );
      }
    });
    $('#refresh').click();
  },

  setStatus(active) {
    const status = active ? 'true' : null;
    FormView.$form.find('input[type=submit]').attr('disabled', status);
  },
  changeRoom(event) {
    const msgText = $('#message').val();
    const msg = { username: FormView.currentUser, roomname: msgText };
    Parse.create(msg, data => {});
  }
};
