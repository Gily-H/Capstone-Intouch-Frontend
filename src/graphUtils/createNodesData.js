export default function createNodesData(friendsData, rootUserId) {
  const nodeData = friendsData.map((friend) => ({
    id: friend.friendId,
    firstName: friend.firstName,
    lastName: friend.lastName,
    phone: friend.phone,
    imageUrl: friend.imageUrl,
    strength: friend.strength,
    lastContact: friend.lastContact,
    userId: rootUserId,
  }));

  return nodeData;
}
