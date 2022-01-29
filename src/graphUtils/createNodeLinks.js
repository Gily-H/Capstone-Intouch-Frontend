export default function createNodeLinks(friendsData, rootUserId) {
  const nodeLinks = friendsData.map((friend) => ({
    source: rootUserId,
    target: friend.friendId,
  }));

  return nodeLinks;
}
