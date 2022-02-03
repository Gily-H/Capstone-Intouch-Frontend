export default function createRootData(rootData, dimensions) {
  const root = {
    id: rootData.id,
    firstName: rootData.firstName,
    lastName: rootData.lastName,
    imageUrl: rootData.imageUrl,
    googleId: rootData.googleId,
    fx: dimensions.width / 2,
    fy: dimensions.width / 2,
  };

  return root;
}
