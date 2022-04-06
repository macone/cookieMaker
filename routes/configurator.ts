import {Request, Response, Router} from "express";
import {MyRouter} from "../types/my-router";
import {BaseRouter} from "./base";
import {get} from "../decorators/rest.decorator";

export class ConfiguratorRouter extends BaseRouter implements MyRouter {

    @get('/select-base/:baseName')
    private selectBase = (req: Request, res: Response): void => {
        const { baseName } = req.params;

        if(!(this.cmapp.data.COOKIE_BASES as Record<string, number>)[baseName]) {
            return this.cmapp.renderError(res, 'Wybrałeś bazę, która nie istnieje!')
        }

        else {
            res
                .cookie('cookieBase', baseName)
                .render('configurator/base-selected.hbs', {
                    baseName,
                })
        }
    }

    @get('/select-addon/:addonName')
    private addAddon = (req: Request, res: Response) => {
        const {addonName} = req.params;

        if(!(this.cmapp.data.COOKIE_ADDONS as Record<string, number>)[addonName]) { //sprawdzanie czy taki dodatek już istnieje
            return this.cmapp.renderError(res, `Składnik ${addonName} został wybrany`);
        }

        const addons = this.cmapp.getAddonsFromReq(req);

        if (addons.includes(addonName)) { //sprawdzanie czy dodatek został już dodany
            return this.cmapp.renderError(res, `Składnik ${addonName} został już wybrany`);
        }
        addons.push(addonName)
        res
            .cookie('cookieAddons', JSON.stringify(addons))
            .render('configurator/add-ons.hbs', {
                addonName,
            });

    };

    @get('/delete-addon/:addonName')
    private deleteAddon = (req: Request, res: Response) => {
        const {addonName} = req.params;
        const oldAddons = this.cmapp.getAddonsFromReq(req);


        if (!oldAddons.includes(addonName)) {
            return this.cmapp.renderError(res, 'Próbujesz usunąć dodatek, który nie był dodany!')
        }

        const addons = oldAddons.filter(addon => addon !== addonName);
        res
            .cookie('cookieAddons', JSON.stringify(addons))
            .render('configurator/deleted.hbs', {
                addonName,
            });
    }
}