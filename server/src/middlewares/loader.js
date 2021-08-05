import render from '@jaredpalmer/after/render';
import Document from '../../../client/src/Document';
import routes from '../../../client/src/global/routes';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);
const chunks = assets;

export default async (req, res, next) => {
  const url = req.path;
  const context = {};

  try {
    if (context.url) {
      res.redirect(context.url);
    } else {
      const data = {
        assets,
        chunks,
        document: Document,
        req,
        res,
        routes,
      };
      const html = await render(data);
      res.send(html);
    }
  } catch (error) {
    console.error('Loader Error:', error);
    res.send(error);
  }
};
