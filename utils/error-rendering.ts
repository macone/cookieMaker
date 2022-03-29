import {Response} from "express";

export const renderError = (res: Response, description: string) => {
  return res.render('errors/error.hbs', {
      description: `${description}`
  });
};
