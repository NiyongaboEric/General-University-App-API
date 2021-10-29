import BrandController from '../../controllers/BrandController';
import GuestBrandController from '../../controllers/guests/GuestBrandController';

const { viewBrand, viewBrandAllItems } = BrandController;
const { guestViewAvailableBrandItems } = GuestBrandController;

export const GetUserBrand = async (parent, args) => {
  const usernameBrand = await viewBrand(args);
  return usernameBrand;
};

export const GetOwnerItemBrand = (parent, args) => {
  const { first, after, username } = args;
  const input = {
    first,
    after,
    field: username,
  };
  const fetchedItems = viewBrandAllItems(input);
  return fetchedItems;
};

export const ViewAllAvailableBrands = (parent, args) => {
  const availableBrands = guestViewAvailableBrandItems(args);
  return availableBrands;
};
