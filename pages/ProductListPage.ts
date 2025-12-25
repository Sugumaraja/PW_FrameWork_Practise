import { Page, Locator } from "@playwright/test"
import { elementUtil } from '../Utility/elementUtil'
import{productDetailPage}from './ProductDetailPage'

export class productListPage {
    private readonly page: Page;
    private readonly eleUtil: elementUtil;
    private readonly prodList: Locator;
    private readonly prodImage:string
    


    constructor(page: Page) {
        this.page = page;
        this.eleUtil = new elementUtil(page);
        this.prodList = page.locator('.product-thumb');
        this.prodImage='.image>a';
        

    }
    async selectProduct(index?:number):Promise<productDetailPage>{
        await this.eleUtil.doClick(this.prodImage,index);
        return new productDetailPage(this.page)
    }
    async getProdCount(): Promise<number> {
        return await this.prodList.count();
    }
   

}