import React from "react";
import PropTypes from "prop-types";
import Tooltip from "./Tooltip";

const ReviewHighlighter = ({ review }) => {
  const highlightContent = () => {
    let highlightedContent = [];
    let lastIndex = 0;

    review.analytics.forEach((analytics, index) => {
      analytics.highlight_indices.forEach((highlight) => {
        const [start, end] = highlight;
        // Push the text before the highlighted portion
        if (start > lastIndex) {
          highlightedContent.push(
            <span key={`text-${index}`}>{review.content.substring(lastIndex, start)}</span>
          );
        }
        // Push the highlighted portion wrapped in Tooltip
        const highlightedText = review.content.substring(start, end);
        highlightedContent.push(
          <Tooltip key={`tooltip-${index}`} content={getTooltipContent(analytics)}>
            <span
              style={{
                backgroundColor: getSentimentColor(analytics.sentiment),
                cursor: "help",
              }}
            >
              {highlightedText}
            </span>
          </Tooltip>
        );
        lastIndex = end;
      });
    });

    // Push the remaining text if any
    if (lastIndex < review.content.length) {
      highlightedContent.push(
        <span key={`text-remaining`}>{review.content.substring(lastIndex)}</span>
      );
    }

    return highlightedContent;
  };

  const getTooltipContent = (analytics) => {
    return `${analytics.topic}`;
  };

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case "Positive":
        return "#D9F2DD";
      case "Negative":
        return "#F2DBD9";
      case "Mixed":
        return "#e8bd6d3d";
      case "Neutral":
        return "#eaf09b6b";
      default:
        return "black";
    }
  };

  return <div>{highlightContent()}</div>;
};

ReviewHighlighter.propTypes = {
  review: PropTypes.object.isRequired,
};

export default ReviewHighlighter;
