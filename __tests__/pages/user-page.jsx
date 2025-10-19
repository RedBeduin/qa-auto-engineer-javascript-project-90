import { expect } from "@playwright/test";
import textVault from "../../__fixtures__/text-vault";
import users from "../../__fixtures__/users";

export class UserPage {
  constructor(page) {
    this.page = page;
    this.createUserButton = this.page.getByLabel("Create", { exact: true });
    this.userEmail = this.page.getByLabel("Email");
    this.userFirstName = this.page.getByLabel("First name");
    this.userLastName = this.page.getByLabel("Last name");
    this.userPassword = this.page.getByLabel("Password");
    this.saveButton = this.page.getByLabel("Save");
    this.createUserTextSuccess = this.page.getByText(
      textVault.createUserTextSuccess
    );
    this.createUserDeleteButton = this.page.getByLabel(
      textVault.createUserDeleteButton
    );
    this.createUserShow = this.page.getByLabel(textVault.createUserShow);

    this.createUserEditButton = this.page.getByLabel(
      textVault.createUserEditButton
    );
    this.saveDeleteButton = this.page.getByText("SaveDelete");

    this.undoButtonUser = this.page.getByRole("button", { name: "Undo" });

    this.checkUser1 = this.page.getByRole("row", {
      name: `Select this row ${textVault.userForDeletion1}`,
    });

    this.checkUser2 = this.page.getByRole("row", {
      name: `Select this row ${textVault.userForDeletion2}`,
    });

    this.checkUser3 = this.page.getByRole("row", {
      name: `Select this row ${textVault.userForDeletion3}`,
    });

    this.checkEach = page.getByLabel("Select all");

    this.itemSelected = this.page.getByRole("heading", {
      name: "items selected",
    });

    this.noUser = this.page.getByText("No User yet.");
  }

  async checkUsers(page) {
    for (const user of users) {
      await expect(page.getByText(user.Email, { exact: true })).toBeVisible();
      await expect(
        page.getByText(user.LastName, { exact: true })
      ).toBeVisible();
      await expect(
        page.getByText(user.FirstName, {
          exact: true,
        })
      ).toBeVisible();
    }
  }
}
