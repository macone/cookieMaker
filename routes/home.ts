import {Request, Response, Router} from "express";
import {MyRouter} from "../types/my-router";
import {get} from "../decorators/rest.decorator";
import {BaseRouter} from "./base";


export class HomeRouter extends BaseRouter implements MyRouter {

    @get('/')
    private home = (req: Request, res: Response): void => {
        const {sum, addons, base, allBases, allAddons} = this.cmapp.getCookieSettings(req);

        res.render('home/index.hbs', {
            cookie: {
                base,
                addons,
            },
            allBases,
            allAddons,
            sum,
        });
    }
}