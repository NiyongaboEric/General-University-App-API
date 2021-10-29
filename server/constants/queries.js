export const newBrandTarget = { path: 'profile', populate: { path: 'user' } };
export const newItemBrandTarget = {
  path: 'brand',
  populate: {
    path: 'profile',
    populate: {
      path: 'user',
    },
  },
};

export const categoryBrandTarget = {
  path: 'brand',
};

export const profileUserTarget = {
  path: 'user',
};
