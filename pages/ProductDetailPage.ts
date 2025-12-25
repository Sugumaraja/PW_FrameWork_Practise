import { Page, Locator } from '@playwright/test'
import { elementUtil } from '../Utility/elementUtil'

export class productDetailPage {
    private readonly page: Page;
    private readonly eleUtil: elementUtil;
    private readonly prodDetailRow: string;
    private readonly prodPriceRow: string;

    private map = new Map<string, string | null>();


    constructor(page: Page) {
        this.page = page;
        this.eleUtil = new elementUtil(page);
        this.prodDetailRow = `(//div[@id='content']//ul[@class='list-unstyled'])[1]/li`;
        this.prodPriceRow = `(//div[@id='content']//ul[@class='list-unstyled'])[2]/li`;

    }


    async getProdDetails(key: string) {
        await this.getProdData();
        await this.getPrductPrice();

        return this.map.get(key);
    }

    private async getProdData() {
        await this.page.locator(this.prodDetailRow).first().waitFor({ state: "visible" });
        let data = await this.eleUtil.getAllArrayText(this.prodDetailRow);
        for (let val of data) {
            console.log('data' + val);
            let word: string[] = val.split(':');
            let key = word[0].trim().toLowerCase();
            let value = word[1].trim();
            console.log('key:' + key + 'value:' + value);
            this.map.set(key, value);

        }
    }



    private async getPrductPrice() {
        await this.page.locator(this.prodPriceRow).first().waitFor({ state: "visible" });
        let value = await this.eleUtil.getAllArrayText(this.prodPriceRow);
        let price = value[0].trim();
        console.log('got the price:'+price);
        let exPrice = value[1].split(':')[1].trim();
        console.log('got the exprice:'+exPrice);
        this.map.set('price', price);
        this.map.set('exPrice', exPrice);

    }


}