export const viewCategorySplitResultIntoFormat = (AssocData) => {
  const newFormat = AssocData.map((item) => {
    const combineObj = {
      brand: {
        username: item.brand.username,
      },
      profile: {
        profileImage: item.brand.profile.profileImage,
      },
      category: {
        title: item.title,
        itemPrice: item.itemPrice,
        itemPriceDiscount: item.itemPriceDiscount,
        itemPriceCurrency: item.itemPriceCurrency,
        itemRemainder: item.itemRemainder,
        itemImageOne: item.itemImageOne,
        publicId: item.publicId,
        createdAt: item.createdAt,
        itemCategory: item.itemCategory,
        description: item.description,
        venue: item.venue,
      },
      _id: item._id, // intended for cursor opaque purposes
    };
    return combineObj;
  });
  return newFormat;
};

export const viewMessageSplitResultIntoFormat = (AssocData) => {
  const newFormat = AssocData.map((item) => {
    const combineObj = {
      brand: item.brand[0],
      profile: item.profile[0],
      user: {
        publicId: item.user[0].publicId,
      },
      message: {
        _id: item._id,
        publicId: item.publicId,
        content: item.content,
        from: item.from,
        to: item.to,
        item: item.item,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      },
      _id: item._id, // intended for cursor opaque purposes
    };
    return combineObj;
  });
  return newFormat;
};

export const viewBrandSplitResultIntoFormat = (AssocData) => {
  const newFormat = AssocData.map((item) => {
    const combineObj = {
      brand: {
        coverPhoto: item.coverPhoto,
        category: item.category,
        createdAt: item.createdAt,
        brandName: item.brandName,
        username: item.username,
      },
      profile: {
        profileImage: item.profile[0].profileImage,
        firstName: item.profile[0].firstName,
        lastName: item.profile[0].lastName,
      },
      _id: item._id, // intended for cursor opaque purposes
    };
    return combineObj;
  });
  return newFormat;
};
