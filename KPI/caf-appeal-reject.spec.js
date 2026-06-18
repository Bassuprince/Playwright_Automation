import { test, expect } from '@playwright/test'
//import {login} from '../Util_files_caf/Login_util'
import { LoginPage } from '../Page/LoginPage'
import { ManagerPage } from '../Page/ManagerPage'
import  EmployeePage  from '../Page/EmployeePage'
import { HRPage } from '../Page/HRPage'
const userCAF = require('../TestData/cafData.json')



test('CAF Appeal-Reject Flow', async ({ page }) => {
 test.setTimeout(120000)

    const Login = new LoginPage(page)
    const Managerpage = new ManagerPage(page)
    const Employee = new EmployeePage(page)
    const HRmanager = new HRPage(page)

 
    // ================= MANAGER =================
    await Login.lanchURL()
    await Login.logintoKPIapp(userCAF.username_Mng, userCAF.password_Mng)
    await Managerpage.identificationDetails(userCAF.EmployeeName, userCAF.Category)
    await Managerpage.caseSubject(userCAF.CaseSubject, userCAF.Problem_Description, userCAF.Impact, userCAF.CorrectiveActionMeasure)
    const cafID = await Managerpage.captureCAFIDA()
    await Login.Logout()


    // ================= EMPLOYEE =================
    await Login.logintoKPIapp(userCAF.username_Emp, userCAF.password_Emp)
    await Employee.openCAFUsingID(cafID)
    await Employee.employeeactionappeal(userCAF.appealID)
    await Login.Logout()

     // ================= HR =================
    await Login.logintoKPIapp(userCAF.username_HR, userCAF.password_HR)
    await HRmanager.openCAFUsingID(cafID)
    await HRmanager.HRrejectflow(userCAF.commentR,userCAF.CommentRsolution)
    await Login.Logout()

})
