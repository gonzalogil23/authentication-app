import { diskStorage } from 'multer';
import { extname } from 'path';

export const multerConfig = {
  storage: diskStorage({
    destination: '../users/uploads',
    filename: (req, file, callback) => {
      console.log(req, file);
      const { originalname } = file;
      const fileExtension = extname(originalname); // Obtener la extensión del archivo original

      // Aquí asumimos que req.body contiene la información del usuario, ajusta según tus necesidades
      const { id } = req.body;

      const fileName = `${id}.${fileExtension}`;
      callback(null, fileName);
    },
  }),
};
