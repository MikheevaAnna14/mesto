export class UserInfo {
  constructor({ profileNameSelector, profileOccupationSelector, avatarSelector }) {
    this._profileName = document.querySelector(profileNameSelector);
    this._profileOccupation = document.querySelector(profileOccupationSelector);
    this._avatarSelector = document.querySelector(avatarSelector);
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

  setAvatar(avatar) {
    this._avatarSelector.src = avatar.avatar;
  }

}
