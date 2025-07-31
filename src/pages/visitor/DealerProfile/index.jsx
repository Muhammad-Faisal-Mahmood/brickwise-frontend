import { Link, useParams } from "react-router-dom";
import { Card, Avatar, Rate, Spin, Button, Input, List, Alert } from "antd";
import { useState } from "react";
import useDealerProfile from "../../../hooks/useDealerProfile";
import { useSelector } from "react-redux";

const { TextArea } = Input;

const DealerProfile = () => {
  const { id } = useParams();
  const { dealer, loading, postingReview, postReview, error } =
    useDealerProfile(id);
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(5);

  const handlePostReview = () => {
    if (reviewText.trim()) {
      postReview(reviewText, reviewRating);
      setReviewText("");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <Alert type="error" message={error} showIcon />
      </div>
    );
  }

  if (!dealer) {
    return null;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <Card className="mb-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
          <Avatar size={100} src={dealer.profileImageUrl} />
          <div className="flex-1">
            <h2 className="text-2xl font-semibold text-primary-heading dark:text-dark-heading">
              {dealer.name}
            </h2>
            <p className="text-primary-subHeading dark:text-dark-subHeading">
              Bio: {dealer.bio}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <Rate disabled allowHalf value={dealer.rating} />
              <span className="text-gray-500">
                ({dealer.reviewsCount} reviews)
              </span>
            </div>
            <p className="text-gray-600 mt-1">City: {dealer.city}</p>
            <p className="text-gray-600">Email: {dealer.email}</p>
            <p className="text-gray-600">Phone: {dealer.phone}</p>
          </div>
        </div>
      </Card>

      <Card className="mb-6">
        <h3 className="text-xl font-semibold mb-4">Created Properties</h3>
        {dealer.createdProperties?.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {dealer.createdProperties.map((property) => (
              <Link
                key={property.id}
                to={`/listings/${property.id}`}
                className="block border rounded-lg overflow-hidden hover:shadow-lg transition"
              >
                <div className="h-40 w-full overflow-hidden">
                  <img
                    src={property.mainImage}
                    alt={property.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3">
                  <h4 className="font-semibold text-primary-heading dark:text-dark-heading">
                    {property.title}
                  </h4>
                  <p className="text-gray-500 text-sm truncate">
                    {property.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs">
                      {property.type}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-xs ${
                        property.purpose === "sale"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {property.purpose === "sale" ? "For Sale" : "For Rent"}
                    </span>
                    <span className="text-xs text-green-700 font-medium">
                      PKR {property.price?.toLocaleString()}
                    </span>
                    <span className="text-xs text-gray-600">
                      📍 {property.location}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No properties created by this dealer.</p>
        )}
      </Card>

      <Card className="mb-6">
        <h3 className="text-xl font-semibold mb-4">Reviews</h3>
        {dealer.reviews?.length ? (
          <List
            itemLayout="horizontal"
            dataSource={dealer.reviews}
            renderItem={(review) => (
              <List.Item key={review.id}>
                <List.Item.Meta
                  avatar={
                    <Avatar>
                      {review.reviewerName?.charAt(0).toUpperCase()}
                    </Avatar>
                  }
                  title={
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{review.reviewerName}</span>
                      <Rate disabled allowHalf defaultValue={review.rating} />
                    </div>
                  }
                  description={
                    <>
                      <p className="text-gray-700 dark:text-gray-300">
                        {review.comment}
                      </p>
                      <span className="text-xs  text-gray-500">
                        <span className="text-xs text-gray-500">
                          {new Date(review.createdAt).toLocaleString([], {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </span>
                    </>
                  }
                />
              </List.Item>
            )}
          />
        ) : (
          <p className="text-gray-500">No reviews yet.</p>
        )}
      </Card>

      {isAuthenticated ? (
        <Card>
          <h3 className="text-xl font-semibold mb-4">Post a Review</h3>
          <Rate value={reviewRating} allowHalf onChange={setReviewRating} />
          <TextArea
            rows={3}
            className="mt-2"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Write your review..."
          />
          <Button
            type="primary"
            className="mt-2"
            loading={postingReview}
            onClick={handlePostReview}
          >
            Submit Review
          </Button>
        </Card>
      ) : (
        <Card>
          <p className="text-gray-600">
            <strong>Login to post a review</strong> — your feedback is very
            valuable!
          </p>
        </Card>
      )}
    </div>
  );
};

export default DealerProfile;
