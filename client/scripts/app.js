const App = {

  $spinner: $('.spinner img'),

  username: 'anonymous',

  initialize() {
    App.username = window.location.search.substr(10);

    FormView.initialize();
    FormView.setUser(App.username);
    RoomsView.initialize();
    MessagesView.initialize();
    Friends.initialize();
    $('.media-body').click(function() {
      Friends.toggleStatus($(this).text());
      Friends.highlightFriends();
      Friends.toggleStatus(this.val);
      Friends.highlightFriends();
    });
    // Fetch initial batch of messages
    App.startSpinner();
    App.fetch(App.stopSpinner);

    App.refresher = $('.submit, .btn-primary').click(() => {
      FormView.handleSubmit(App.stopSpinner);
      $('.message').val('');
      MessagesView.clearMessages();
      App.startSpinner();
      App.fetch(App.stopSpinner);
    });

    RoomsView.$select.change(() => {
      App.changeRoom(RoomsView.value);
    });
    App.roomSelect = $('.room-btn').click(() => {
      FormView.changeRoom(App.startSpinner);
      $('.message').val('');
      MessagesView.clearMessages();
      App.startSpinner();
      App.fetch(App.stopSpinner);
    });
  },

  fetch(callback = ()=>{}) {
    Parse.readAll((data) => {
      // examine the response from the server request:
      var obj = JSON.parse(data);
      console.log(obj);
      var currentRoom = document.getElementById('rm').value;
      for (let i = 0; i < obj.results.length; i++) {
        var room = obj.results[i].roomname;
        if (obj.results[i].text) {
          const usr = obj.results[i].username;
          const msg = obj.results[i].text;
          
          // if not include dont append 
          // hacker defense
          if (!msg.includes('<')) {
            $('#chats').prepend(`<div class="media>"<a class="media-left" href="/scripts/friends.js"><img alt="" class="media-object img-rounded" src="http://placehold.it/64x64"></a><div class="media-body"><h4 class="media-heading username">${usr}</h4><p>${msg}</p><ul class="nav nav-pills nav-pills-custom"><li><a href="/scripts/friends.js"><span class="glyphicon glyphicon-share-alt"></span></a></li><li><a href="#"><span class="glyphicon glyphicon-retweet"></span></a></li><li><a href="#"><span class="glyphicon glyphicon-star"></span></a></li><li><a href="#"><span class="glyphicon glyphicon-option-horizontal"></span></a></li></ul></div></div>`);
          }
        }
        if (room !== null && room !== undefined) {
          var roomList = Object.values(Rooms);
          if (!roomList.includes(room)) {
            Rooms[i] = room;
            $('#rm').append(`<option value="${room}">${room}</option>`);
          }
        }
        // console.log('working');
      }
      callback();
    });
  },

  changeRoom(roomName) {
    MessagesView.clearMessages();
    window.filter = roomName;

    App.startSpinner();
    App.fetch(App.stopSpinner);
  },

  startSpinner() {
    App.$spinner.show();
    FormView.setStatus(true);
  },

  stopSpinner() {
    App.$spinner.fadeOut('fast');
    FormView.setStatus(false);
  },

  // friend: () => {
  //   Parse.readAll((data) => {
  //     // examine the response from the server request:
  //     console.log(data);
  //     $('.username').click(function() {
  //     for (var i = 0; i < data.results.length; i++) {
  //       if ($('.username').text() === data.results[i].username) {
          
  //       }
  //     }
  //     callback();
  //   });
  // }
  // }

};

