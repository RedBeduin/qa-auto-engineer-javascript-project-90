import { test } from "@playwright/test";
import { LoginPage } from "./pages/login-page.jsx";
import textVault from "../__fixtures__/text-vault.jsx";
import { PersonAccPage } from "./pages/person-acc-page.jsx";
import { UserPage } from "./pages/user-page";
import {
  inputField,
  checkField,
  click,
  checkFieldByText,
  checkCheckbox,
  openCard,
  checkFieldByTextNotVisible,
} from "./func.jsx";

test("application display", async ({ page }) => {
  await page.goto("http://localhost:5173/#/login");
  const loginPage = new LoginPage(page);
  await checkField(loginPage.userlogin);
  await checkField(loginPage.password);
  await checkField(loginPage.signIn);
});

test("login", async ({ page }) => {
  await page.goto("http://localhost:5173/#/login");
  const loginPage = new LoginPage(page);
  await inputField(loginPage.userlogin, textVault.userlogin);
  await inputField(loginPage.password, textVault.password);
  await click(loginPage.signIn);
  await checkFieldByText(textVault.welcomeTextPersonAccPage, page);
});

test("negative - login", async ({ page }) => {
  await page.goto("http://localhost:5173/#/login");
  const loginPage = new LoginPage(page);
  await inputField(loginPage.userlogin, "");
  await inputField(loginPage.password, "");
  await click(loginPage.signIn);
  await checkFieldByText(textVault.errorTextLoginPage, page);
  await inputField(loginPage.userlogin, "");
  await inputField(loginPage.password, textVault.password);
  await click(loginPage.signIn);
  await checkFieldByText(textVault.errorTextLoginPage, page);
  await inputField(loginPage.userlogin, textVault.userlogin);
  await inputField(loginPage.password, "");
  await click(loginPage.signIn);
  await checkFieldByText(textVault.errorTextLoginPage, page);
});

test("logout", async ({ page }) => {
  await page.goto("http://localhost:5173/#/login");
  const loginPage = new LoginPage(page);
  const personAccPage = new PersonAccPage(page);
  await inputField(loginPage.userlogin, textVault.userlogin);
  await inputField(loginPage.password, textVault.password);
  await click(loginPage.signIn);
  await checkFieldByText(textVault.welcomeTextPersonAccPage, page);
  await click(personAccPage.profile);
  await click(personAccPage.logout);
  await checkField(loginPage.userlogin);
  await checkField(loginPage.password);
  await checkField(loginPage.signIn);
});

test("create user", async ({ page }) => {
  await page.goto("http://localhost:5173/#/login");
  const loginPage = new LoginPage(page);
  const personAccPage = new PersonAccPage(page);
  const userPage = new UserPage(page);
  await inputField(loginPage.userlogin, textVault.userlogin);
  await inputField(loginPage.password, textVault.password);
  await click(loginPage.signIn);
  await click(personAccPage.menuUsers);
  await click(userPage.createUserButton);
  await inputField(userPage.userEmail, textVault.createUserEmail);
  await inputField(userPage.userFirstName, textVault.createUserFirstName);
  await inputField(userPage.userLastName, textVault.createUserLastName);
  await inputField(userPage.userPassword, textVault.createUserPassword);
  await click(userPage.saveButton);
  await checkFieldByText(textVault.createUserTextSuccess, page);
  await checkFieldByText(textVault.createUserShow, page);
  await checkField(userPage.createUserDeleteButton);
  await click(userPage.createUserShow);
  await checkFieldByText(textVault.createUserEmail, page);
  await checkFieldByText(textVault.createUserFirstName, page);
  await checkFieldByText(textVault.createUserLastName, page);
  await checkField(userPage.createUserEditButton);
  await click(personAccPage.menuUsers);
  await checkFieldByText(textVault.createUserEmail, page);
  await checkFieldByText(textVault.createUserFirstName, page);
  await checkFieldByText(textVault.createUserLastName, page);
});

test("user list", async ({ page }) => {
  await page.goto("http://localhost:5173/#/login");
  const loginPage = new LoginPage(page);
  const personAccPage = new PersonAccPage(page);
  const userPage = new UserPage(page);
  await inputField(loginPage.userlogin, textVault.userName);
  await inputField(loginPage.password, textVault.password);
  await click(loginPage.signIn);
  await click(personAccPage.menuUsers);
  await userPage.checkUsers(page);
});

test("editing form", async ({ page }) => {
  await page.goto("http://localhost:5173/#/login");
  const loginPage = new LoginPage(page);
  const personAccPage = new PersonAccPage(page);
  await inputField(loginPage.userlogin, textVault.userlogin);
  await inputField(loginPage.password, textVault.password);
  await click(loginPage.signIn);
  const userPage = new UserPage(page);
  await click(personAccPage.menuUsers);
  await openCard(page, '1');
  await checkField(userPage.userEmail);
  await checkField(userPage.userFirstName);
  await checkField(userPage.userLastName);
  await checkField(userPage.userPassword);
  await checkField(userPage.saveDeleteButton);
});

test("edit user", async ({ page }) => {
  await page.goto("http://localhost:5173/#/login");
  const loginPage = new LoginPage(page);
  const personAccPage = new PersonAccPage(page);
  await inputField(loginPage.userlogin, textVault.userlogin);
  await inputField(loginPage.password, textVault.password);
  await click(loginPage.signIn);
  const userPage = new UserPage(page);
  await click(personAccPage.menuUsers);
  await openCard(page, "1");
  await inputField(userPage.userEmail, textVault.editUserEmail);
  await inputField(userPage.userFirstName, textVault.editUserFirstName);
  await inputField(userPage.userLastName, textVault.editUserLastName);
  await inputField(userPage.userPassword, textVault.editUserPassword);
  await click(userPage.saveButton);
  await checkFieldByText(textVault.editUserEmail, page);
  await checkFieldByText(textVault.editUserFirstName, page);
  await checkFieldByText(textVault.editUserLastName, page);
});

test("edit user from create form", async ({ page }) => {
  await page.goto("http://localhost:5173/#/login");
  const loginPage = new LoginPage(page);
  const personAccPage = new PersonAccPage(page);
  const userPage = new UserPage(page);
  await inputField(loginPage.userlogin, textVault.userlogin);
  await inputField(loginPage.password, textVault.password);
  await click(loginPage.signIn);
  await click(personAccPage.menuUsers);
  await click(userPage.createUserButton);
  await inputField(userPage.userEmail, textVault.createUserEmail);
  await inputField(userPage.userFirstName, textVault.createUserFirstName);
  await inputField(userPage.userLastName, textVault.createUserLastName);
  await inputField(userPage.userPassword, textVault.createUserPassword);
  await click(userPage.saveButton);
  await click(userPage.createUserShow);
  await click(userPage.createUserEditButton);
  await inputField(userPage.userEmail, textVault.editUserEmail);
  await inputField(userPage.userFirstName, textVault.editUserFirstName);
  await inputField(userPage.userLastName, textVault.editUserLastName);
  await inputField(userPage.userPassword, textVault.editUserPassword);
  await click(userPage.saveButton);
  await checkFieldByText(textVault.editUserEmail, page);
  await checkFieldByText(textVault.editUserFirstName, page);
  await checkFieldByText(textVault.editUserLastName, page);
});

test("negative - edit user", async ({ page }) => {
  await page.goto("http://localhost:5173/#/login");
  const loginPage = new LoginPage(page);
  const personAccPage = new PersonAccPage(page);
  await inputField(loginPage.userlogin, textVault.userlogin);
  await inputField(loginPage.password, textVault.password);
  await click(loginPage.signIn);
  const userPage = new UserPage(page);
  await click(personAccPage.menuUsers);
  await openCard(page, '1');
  await inputField(userPage.userEmail, '');
  await inputField(userPage.userFirstName, '');
  await inputField(userPage.userLastName, '');
  await inputField(userPage.userPassword, '');
  await click(userPage.saveButton);
});

test("delete user", async ({ page }) => {
  await page.goto("http://localhost:5173/#/login");
  const loginPage = new LoginPage(page);
  const personAccPage = new PersonAccPage(page);
  await inputField(loginPage.userlogin, textVault.userlogin);
  await inputField(loginPage.password, textVault.password);
  await click(loginPage.signIn);
  const userPage = new UserPage(page);
  await click(personAccPage.menuUsers);
  await checkCheckbox(userPage.checkUser1);
  await click(userPage.createUserDeleteButton);
  await click(userPage.undoButtonUser);
  await checkFieldByText(textVault.userForDeletion1[0], page);
  await checkCheckbox(userPage.checkUser1);
  await click(userPage.createUserDeleteButton);
  await checkFieldByTextNotVisible(textVault.userForDeletion1[0], page);
  await checkCheckbox(userPage.checkUser2);
  await checkCheckbox(userPage.checkUser3);
  await click(userPage.createUserDeleteButton);
  await checkFieldByTextNotVisible(textVault.userForDeletion2[0], page);
  await checkFieldByTextNotVisible(textVault.userForDeletion3[0], page);
});

test("delete all user", async ({ page }) => {
  await page.goto("http://localhost:5173/#/login");
  const loginPage = new LoginPage(page);
  const personAccPage = new PersonAccPage(page);
  await inputField(loginPage.userlogin, textVault.userlogin);
  await inputField(loginPage.password, textVault.password);
  await click(loginPage.signIn);
  const userPage = new UserPage(page);
  await click(personAccPage.menuUsers);
  await checkCheckbox(userPage.checkEach);
  await checkField(userPage.itemSelected);
  await click(userPage.createUserDeleteButton);
  await checkField(userPage.noUser);
});