const RoomsView = {

  $button: $('#add-room'),
  $select: $('#rooms select'),
  
  roomNames: [],

  initialize() {
    RoomsView.$button.click(() => {
      // RoomsView.renderRoom(this.val()); // new room name
      const insertRoomName = prompt('Please enter roomname');
      RoomsView.renderRoom();
    });
  },
  
  addRoomName(roomName) {
    if (!RoomsView.roomNames.includes(roomName)) {
      RoomsView.roomNames.push(roomName);
      return true;
    }
    return false;
  },

  // renderRoom: function(roomName) {
  //   if (!roomName) {
  //     return;
  //   }
  //   // RoomsView.$select.attr("value", );
  //   if (RoomsView.addRoomName(roomName)) {
  //     var htmlObj = RoomsView.render(
  //       {idValue: roomName, value: roomName}
  //     );
  //     RoomsView.$select.append(htmlObj);
  //   }
  // },
  
  render: _.template('<option value="<%- idValue %>"><%- value %></option>'),
};