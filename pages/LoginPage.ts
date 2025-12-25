import { Locator, Page } from "@playwright/test";
import { elementUtil } from "../Utility/elementUtil";
import{productListPage}from './ProductListPage'
import{HomePage}from'../pages/HomePage'


export class LoginPage {
    //1. declaration of the variable Page locator/object/obj repo
    private readonly page: Page;
    private readonly eleUtil;
    private readonly email: Locator;
    private readonly pwd: Locator;
    private readonly login: Locator;
    private readonly searchField:Locator;
    private readonly searchBtn: Locator;
   


    //2.Page class constructor intialize value
    constructor(page: Page) {
        this.eleUtil = new elementUtil(page);
        this.page = page;
        this.email = page.locator('#input-email');
        this.pwd = page.locator('#input-password');
        this.login = page.getByRole('button', { name: 'Login' });;
        this.searchField=page.locator('[name="search"]');
        this.searchBtn = page.locator('.btn.btn-default.btn-lg');
        
    }


    //3.Page actions
    async goToLogin() {
        await this.page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/login');
    }
    async doLogin(email:string,pwd:string): Promise<HomePage> {
        await this.eleUtil.doFill(this.email, email);
        await this.eleUtil.doFill(this.pwd, pwd);
        await this.eleUtil.doClick(this.login);
        let actual= await this.page.title();
        return new HomePage(this.page);
    }
    async doSearchProduct(keyword:string):Promise<productListPage>{
        await this.eleUtil.doFill(this.searchField,keyword);
        await this.eleUtil.doClick(this.searchBtn);
        return new productListPage(this.page);
    }
}