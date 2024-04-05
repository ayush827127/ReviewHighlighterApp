import React, { useState } from "react";
import PropTypes from "prop-types";

const Tooltip = ({ content, children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const showTooltip = (event) => {
    setPosition({
      x: event.clientX,
      y: event.clientY - 90, // Adjust this value as per your design
    });
    setIsVisible(true);
  };

  const hideTooltip = () => {
    setIsVisible(false);
  };

  return (
    <>
      {isVisible && (
        <div
          style={{
            position: "absolute",
            top: position.y,
            left: position.x,
            backgroundColor: "#333",
            color: "#fff",
            padding: "5px 10px",
            borderRadius: "5px",
            zIndex: 9999,
          }}
        >
          {content}
        </div>
      )}
      <span onMouseEnter={showTooltip} onMouseLeave={hideTooltip}>
        {children}
      </span>
    </>
  );
};

Tooltip.propTypes = {
  content: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Tooltip;
