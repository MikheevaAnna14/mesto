export class UserInfo {
  constructor({ profileNameSelector, profileOccupationSelector }) {
    this._profileName = document.querySelector(profileNameSelector);
    this._profileOccupation = document.querySelector(profileOccupationSelector);
  }

  getUserInfo() {
    return {
      name: this._profileName.textContent,
      occupation: this._profileOccupation.textContent
    }
  }

  setUserInfo(name, occupation) {
    this._profileName.textContent = name;
    this._profileOccupation.textContent = occupation;
  }

}