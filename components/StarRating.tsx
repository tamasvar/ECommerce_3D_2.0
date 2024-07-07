interface StarRatingProps {
  rating: number;
  starDimension?: string;
  starSpacing?: string;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, starDimension = "20px", starSpacing = "2px" }) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    stars.push(
      <svg
        key={i}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill={i <= rating ? "orange" : "lightgray"}
        width={starDimension}
        height={starDimension}
        style={{ marginRight: starSpacing }}
      >
        <path d="M12 .587l3.668 7.431L24 9.587l-6 5.853 1.416 8.243L12 18.412 4.584 23.683 6 15.44 0 9.587l8.332-1.569L12 .587z" />
      </svg>
    );
  }

  return <div style={{ display: "flex" }}>{stars}</div>;
};

export default StarRating;
