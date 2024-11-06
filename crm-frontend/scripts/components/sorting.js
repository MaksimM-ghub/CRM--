  
  export function sortClients(clients, prop, dir) {
    return clients.sort((userOne, userTwo) => {
      if (
        !dir == false
          ? userOne[prop] < userTwo[prop]
          : userOne[prop] > userTwo[prop]
      )
        return -1;
    });
  }