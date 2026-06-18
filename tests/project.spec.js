import { test, expect } from '@playwright/test';
import { PageManager } from '../Page/PageManager';

test('test', async ({ page }) => {
    const PageInstance = new PageManager(page)
    
    
    await PageInstance .getLogin().LaunchURL()
    await PageInstance .getLogin().login('standard_user','secret_sauce')

    await PageInstance.getSelectitems().Selectcorder()

    await PageInstance.getcheckout().checkout_product('basava','raj','2637')

    await PageInstance.getconfirmorder().confirmation()
    await PageInstance.getLogin().Logout()
 });