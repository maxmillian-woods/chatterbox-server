var MessagesView = {

  $chats: $('#chats'),

  initialize: function() {
    window.filter = null;
  },

  // clear messages 
  clearMessages: function() {
    MessagesView.$chats.empty();
  },

  // render messages 

  renderMessage: function (msg) {
    if (!msg.username || !msg.text || !msg.roomname) {
      return;
    }
    if (window.filter === null) {
      window.filter = msg.roomname.toLowerCase();
    }
    if (window.filter !== msg.roomname.toLowerCase()) {
      return;
    }
    MessagesView.$chats.append(MessageView.render(msg));
  },

  render: function() {
  }
  
};


