import { SUPPORTED_MEDIA_TYPE } from "../src/medias/domain/types";

const cloudinary = {
    v2: {
        config: jest.fn(),
        uploader: {
            upload: jest.fn(() => {
                return { 
                    format: "jpg",
                    created_at: "12/09/2001",
                    filename: "est-image-file",
                    resource_type: SUPPORTED_MEDIA_TYPE.APPLICATION,
                    url: "http://github", 
                 };
            }),
        }
    }
};

export default cloudinary;