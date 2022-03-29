import * as express from 'express'; //pobieramy moduł express
import {Application, json, Request, Response, static as expressStatic} from 'express';
import * as hbs from 'express-handlebars'; //pobieramy moduł handlebars
import * as cookieParser from 'cookie-parser'; //pobieramy moduł cookie parser
const app = express(); //tworzymy nową aplikację express
import { HomeRouter } from './routes/home'; // pobieramy customowy moduł homeRouter czyli ścieżka strony głównej
import { ConfiguratorRouter } from "./routes/configurator"; // pobieramy customowy moduł configuratorRouter czyli ścieżka konfiguratora
import { OrderRouter } from "./routes/order"; // pobieramy customowy moduł orderRouter czyli ścieżka order/zamówienie
import { handlebarsHelpers } from "./utils/handlebars-helpers";
import {COOKIE_ADDONS, COOKIE_BASES} from "./data/cookie-data";
import {Entries} from "./types/types";


export class CookieMakerApp {
    private app: Application;

    public readonly data = {
        COOKIE_BASES,
        COOKIE_ADDONS,
    };

    constructor() {
        this._configureApp();
        this._setRoutes();
        this._run();
    }

    private readonly routes = [HomeRouter, ConfiguratorRouter, OrderRouter];

    _configureApp(): void {
        this.app = express(); //tworzymy nową aplikację express

        this.app.use(json()); // aplikacja używa:
        this.app.use(expressStatic('public')); // aplikacja używa: folder statyczny public
        this.app.use(cookieParser()); // aplikacja używa: modułu odczytywania ciastek
        this.app.engine('.hbs', hbs.engine({
            extname:'.hbs', //rozszerzenie .hbs
            helpers: handlebarsHelpers, //plik gdzie znajdują się pomocne pliki dla handlebars
        })); // silnik aplikacji: handlebars
        this.app.set('view engine', '.hbs'); //aplikacja ustaw: silnik widoków .hbs
    }

    _setRoutes(): void {
        for (const router of this.routes) {
            const obj = new router(this);
            this.app.use(obj.urlPrefix, obj.router);
        }
        // this.app.use(ConfiguratorRouter.urlPrefix, new HomeRouter(this).router); // aplikacja używa: scieżkowacza strony głównej
        // this.app.use(ConfiguratorRouter.urlPrefix, new ConfiguratorRouter(this).router); // aplikacja używa: moduł configuratorRouter
        // this.app.use('/', new OrderRouter(this).router); // aplikacja używa: moduł orderRouter
    }

    _run(): void {
        this.app.listen(3000); // aplikacja nasłuchuje na porcie 3000
        console.log('Program działa na porcie http://localhost:3000.')
    }

    getAddonsFromReq(req: Request): string[] { //@TODO sprawdzic realny typ tutaj
        this.app.use(cookieParser());
        const {cookieAddons} = req.cookies as {cookieAddons: string}; //tutaj to w klamrach to jest interjs
        return cookieAddons ? JSON.parse(cookieAddons) : [];
    }

    renderError(res: Response, description: string): void {
        return res.render('errors/error.hbs', {
            description: `${description}`
        });
    }

    getCookieSettings(req: Request): {
        addons: string[],
        base: string | undefined,
        sum: number,
        allBases: Entries,
        allAddons: Entries,
    } {
        const {cookieBase: base} = req.cookies as {cookieBase?: string};
        const addons = this.getAddonsFromReq(req);
        const allBases = Object.entries(this.data.COOKIE_BASES);
        const allAddons = Object.entries(this.data.COOKIE_ADDONS);
        const sum = (base ? handlebarsHelpers.findPrice(allBases, base) : 0)
            + addons.reduce((prev, curr) => {
                return prev + handlebarsHelpers.findPrice(allAddons, curr)
            }, 0);

        return {
            //Wybrane rzeczy
            addons,
            base,

            //obliczenia
            sum,

            //inne możliwości
            allBases,
            allAddons,
        }
    }
}

new CookieMakerApp();