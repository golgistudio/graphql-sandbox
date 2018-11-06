import { addLocaleData } from "react-intl";

import itLocaleData from "react-intl/locale-data/it";
import zhLocaleData from "react-intl/locale-data/zh";

const initializeReactIntl = () => {
  addLocaleData([...itLocaleData, ...zhLocaleData]);
};

export default initializeReactIntl;
