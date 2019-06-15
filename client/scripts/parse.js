const Parse = {

  server: 'http://127.0.0.1:3000/classes/messages',

  create(message, successCB, errorCB = null) {
    $.ajax({
      url: Parse.server,
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: successCB,
      error: errorCB || (error => {
        console.error('chatterbox: Failed to fetch messages', error);
      })
    });
  },

  readAll(successCB, errorCB = null) {
    $.ajax({
      url: Parse.server,
      type: 'GET',
      data: { order: '-createdAt' },
      contentType: 'application/json',
      success: successCB,
      error: errorCB || (error => {
        console.error('chatterbox: Failed to fetch messages', error);
      })
    });
  }

};


/* Example of helper function */
// function dogController(){
//   getRandomDog(function(model){
//     const view = createDog(model.message)
//     $('.dogContainer').empty()
//     $('.dogContainer').append(view)
//   })
// }

// $('#getDog').click(dogController)

