import {Page,Locator}from '@playwright/test'
import { elementUtil } from '../Utility/elementUtil';



export class HomePage{
    private readonly page:Page;
    private readonly eleUtil:elementUtil
    
constructor (page:Page){
    this.page=page;
    this.eleUtil=new elementUtil(page);


}
async getTitle():Promise<string>{
    return await this.page.title();
}
}