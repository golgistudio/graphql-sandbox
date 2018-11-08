import shortid from 'shortid';
import _ from 'lodash';
import defaultTheme from './defaultTheme/index';

class ThemeManager {
  constructor() {
    this.subscribe = this.subscribe.bind(this);
    this.unsubscribe = this.unsubscribe.bind(this);
    this.activeThemeName = defaultTheme.name;
    this.themeSettings = {
      [defaultTheme.name]: defaultTheme.settings
    };
    this.notificatonHandlers = [];
  }

  registerTheme(theme, setAsActive = false) {
    this.themeSettings[theme.name] = theme.settings;
    if (setAsActive) {
      this.activeThemeName = theme.name;
    }
  }

  set theme(themeName) {
    this.activeThemeName = themeName;
    this.sendNotification();
  }

  get theme() {
    return this.activeThemeName;
  }

  get settings() {
    return this.themeSettings[this.activeThemeName];
  }

  sendNotification() {
    this.notificatonHandlers.forEach((item) => {
      item.handler();
    });
  }

  unsubscribe(id) {
    const index = _.findIndex(this.notificationHandlers, { id });
    if (index === -1) {
      return;
    }
    this.notificationHandlers.splice(index, 1);
  }

  subscribe(notificationHandler) {
    const id = shortid.generate();
    this.notificatonHandlers.push({
      id,
      handler: notificationHandler
    });

    return id;
  }
}

export default new ThemeManager();
