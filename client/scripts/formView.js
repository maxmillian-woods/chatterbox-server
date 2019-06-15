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
    const msg = {username: FormView.currentUser, text: msgText, roomname: room};
    
    Parse.create(msg, (data) => {
      console.log(data);
    });
    $('#refresh').click();
  },

  setStatus(active) {
    const status = active ? 'true' : null;
    FormView.$form.find('input[type=submit]').attr('disabled', status);
  },
  changeRoom(event) {
    const msgText = $('#message').val();
    const msg = {username: FormView.currentUser, roomname: msgText};
    Parse.create(msg, (data) => {
    });
  }

};