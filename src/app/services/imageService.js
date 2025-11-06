import { imageApi } from "./imageApi";

export const imageService = {
  upload: (image) => {
    const formData = new FormData();
    formData.append("image", image); 

    return imageApi.post('/images', formData)

  }
};
