const removeItemFromArr = (arr, item) => {
  const results = [];
  for (const eachItem of arr) {
    if (eachItem !== item) {
      results.push(item);
    }
  }
  return results;
};

const Friends = {
  friends: [],
  
  initialize() {
    //$('.username').click(function(event) {
    $('#chats').on('click', '.username', function() {
      console.log('clicked!');
      Friends.toggleStatus($(this).text());
      Friends.highlightFriends();
    });
  },

  toggleStatus(username) {
    if (Friends.friends.includes(username)) {
      Friends.friends = removeItemFromArr(Friends.friends, username);
    } else {
      Friends.friends.push(username);
    }
  },

  highlightFriends() {

    const els = document.getElementsByClassName('username'); 
    for (const element of els) {
      if (Friends.friends.includes(element.innerText)) {
        //$('.username').toggle("highlight");
        element.style.color = 'red';
      } else {
        element.style.removeProperty('color');
      }
    } 
  }
}; 