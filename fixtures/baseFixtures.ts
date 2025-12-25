import{test as base,expect} from '@playwright/test'
import { HomePage } from '../pages/HomePage'
import { LoginPageFixture } from '../pages/LoginPageFixture'
type Myfeature={homePage:HomePage}
export const test=base.extend<Myfeature>({
   homePage: async ({page,baseURL},use,testInfo) => {
   const hp=new LoginPageFixture(page); 
   await hp.home(baseURL);
   const homePage=await hp.doLogin(testInfo.project.metadata.userName,testInfo.project.metadata.password);
   await use (homePage);
}

})
export{expect};