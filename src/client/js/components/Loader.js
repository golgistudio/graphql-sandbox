import PropTypes from "prop-types";
import React from "react";
import Radium from "radium";

import { loader, loader_bg, loader_li,
  firstChild, secondChild, thirdChild, fourthChild, fifthChild
} from './loader-styles';

const Loader = ({ pulse }) => {


  let html;

  if (pulse) {
    html = (
        <div style={loader_bg}>
          <ul style={loader}>
            <li style={[loader_li, firstChild]} ></li>
            <li style={[loader_li, secondChild]} ></li>
            <li style={[loader_li, thirdChild]} ></li>
            <li style={[loader_li, fourthChild]} ></li>
            <li style={[loader_li, fifthChild]} ></li>
          </ul>
        </div>
    );
  } else {
    // html = (
    //   <div className="app__loader app__loader--rotate">
    //     <svg className="loader__svg">
    //       <circle
    //         className="loader__circle"
    //         cx="50"
    //         cy="50"
    //         r="20"
    //         fill="none"
    //         strokeWidth="2"
    //       />
    // //     </svg>
    // //   </div>
    // );
  }

  return html;
};

Loader.propTypes = {
  pulse: PropTypes.bool.isRequired
};

Loader.defaultProps = {
  pulse: true
};

export default Radium(Loader);
