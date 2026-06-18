import { Loginpage } from "./Loginpage";
import { Selectitems } from "./Selectitems";
import { checkout } from "./checkout";
import { confirmorder} from "./confirmorder";

export class PageManager {
    constructor(page) {
        this.page = page
        this.Login = new Loginpage(page)
        this.Selectitems = new Selectitems(page)
        this.checkout = new checkout(page)
        this.confirmorder = new confirmorder(page)
    }
    getconfirmorder(){
        return this.confirmorder
    }
     
     getcheckout(){
        return this.checkout
     }
     getSelectitems(){
        return this.Selectitems
     }
    getLogin() {
        return this.Login
    }


}   