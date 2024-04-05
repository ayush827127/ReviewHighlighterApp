import React, { useState, useEffect } from "react";
import { FaStar, FaRegStarHalfStroke, FaRegStar } from "react-icons/fa6";
import ReviewHighlighter from "./ReviewHighlighter";

const ReviewList = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await fetch("../../public/reviewsData.json");
      const data = await response.json();
      setReviews(data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  return (
    <section>
      <div className="card mb-4">
      {/* <!-- Card Header --> */}
      <div className="card-header d-lg-flex align-items-center justify-content-between">
        <div className="mb-3 mb-lg-0">
          <h3 className="mb-0">Reviews</h3>
        </div>
      </div>
      {/* <!-- Card Body --> */}
      <div className="card-body">
        {/* <!-- List Group --> */}
        <ul className="list-group list-group-flush border-top">
          {/* <!-- List Group Item --> */}
          {reviews.map((review) => (
          <li key={review.review_id} className="list-group-item px-0 py-4">
            <div className="d-flex">
              <img
                src={review.source.icon}
                alt=""
                className="rounded-circle avatar-lg shadow-1-strong"
                width="50"
                height="50"
              />
              <div className="ms-3 mt-2">
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <div>
                    <span className="fw-bold"> {review.reviewer_name} </span> wrote a review at
                    <span className="fw-bold"> {review.source.name}</span>
                    </div>
                
                    <span className="text-muted fs-6"> {review.date} </span>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="me-1">
                    <FaStar style={{ color: "#E4A11B" }} />
                    <FaStar style={{ color: "#E4A11B" }} />
                    <FaStar style={{ color: "#E4A11B" }} />
                    <FaRegStarHalfStroke style={{ color: "#E4A11B" }} />
                    <FaRegStar style={{ color: "#E4A11B" }} />
                  </span>
                  <p className="mt-2">
                    <ReviewHighlighter review={review} />
                  </p>
                </div>
              </div>
            </div>
          </li>
           ))}
        </ul>
      </div>
    </div>
    </section>
  );
};

export default ReviewList;
