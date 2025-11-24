import { imageApi } from "./imageApi";

export const imageService = {
  upload: (image) => {
    const formData = new FormData();
    formData.append("image", image);

    return imageApi.post('/images', formData)

  },

  uploadMultiple: (images) => {
    const formData = new FormData();
    images.forEach((image) => {
      formData.append("images", image);
    });

    return imageApi.post('/images/batch', formData)
  }
};
