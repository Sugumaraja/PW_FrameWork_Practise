import{test,expect} from '@playwright/test'
import{ LoginPage }from'../pages/LoginPage'
import { productListPage } from '../pages/ProductListPage';





test('productCount',async({page})=>{
    let lp=new LoginPage(page);
    await lp.goToLogin();
    await lp.doLogin('sugu@nal.com','Pass');
    let plp:productListPage=await lp.doSearchProduct('mac')
    let count:number=await plp.getProdCount();
    expect (count).toEqual(4);

})
