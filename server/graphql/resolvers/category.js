import CategoryController from '../../controllers/CategoryController';
import GuestCategoryController from '../../controllers/guests/GuestCategoryController';

const { viewCategoryBrandItems, viewCategorySpecificItemBrand } = CategoryController;
const { guestViewCategoryBrandItems } = GuestCategoryController;

export const ViewAllCategories = (parent, args) => {
  const { first, after, category } = args;
  const input = {
    first,
    after,
    field: category,
  };
  const fetchedItems = viewCategoryBrandItems(input);
  return fetchedItems;
};

export const viewCategorySpecificItem = (parent, args) => {
  const { itemId } = args;
  const fetchedItems = viewCategorySpecificItemBrand(itemId);
  return fetchedItems;
};

export const ViewAvailableItemsAllCategories = (parent, args) => {
  const availableCategory = guestViewCategoryBrandItems(args);
  return availableCategory;
};
