import {Request, Response, Router} from "express";
import {CookieMakerApp} from "../index";
import {MyRouter} from "../types/my-router";


export class OrderRouter implements MyRouter {
    public readonly router: Router = Router();
    public readonly urlPrefix: string = '/';

    constructor(
        private cmapp: CookieMakerApp,
    ) {
        this.cmapp = cmapp;
        this.router = Router();
        this.setUpRoutes();
    }

    private setUpRoutes(): void {
        this.router.get('/order/summary', this.summary);
        this.router.get('/order/thanks', this.thanks);
    }

    private summary = (req: Request, res: Response) => {
        const {sum, addons, base, allBases, allAddons} = this.cmapp.getCookieSettings(req);

        res.render('order/summary', {
            cookie: {
                base,
                addons,
            },
            allBases,
            allAddons,
            sum,
        });
    };

    private thanks = (req: Request, res: Response) => {
        const {sum} = this.cmapp.getCookieSettings(req);

        res
            .clearCookie('cookieBase')
            .clearCookie('cookieAddons')
            .render('order/thanks', {
                sum,
            });
    }

}
