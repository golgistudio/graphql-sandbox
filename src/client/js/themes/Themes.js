import neutral from './neutral/index';
import rainbow from './rainbow/index';
import defaultTheme from './defaultTheme/index';
import ThemeManager from './ThemeManager';

export const registerAllThemes = () => {
  ThemeManager.registerTheme(neutral);
  ThemeManager.registerTheme(rainbow);
};

const Themes = () => {
  const themeArray = [];

  themeArray.push({
    displayName: defaultTheme.displayName,
    name: defaultTheme.name
  });

  themeArray.push({
    displayName: neutral.displayName,
    name: neutral.name
  });

  themeArray.push({
    displayName: rainbow.displayName,
    name: rainbow.name
  });

  return themeArray;
};

export const selectTheme = (themeName) => {
  ThemeManager.theme = themeName;
};

export default Themes;
