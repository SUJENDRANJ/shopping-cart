const Rating = ({ productDispatch, productState }) => {
  function handleRating(index) {
    productDispatch({
      type: "FILTER_BY_RATING",
      payload: index + 1,
    });
  }

  return (
    <div className="my-2">
      <div>
        Rating :{" "}
        {[...Array(5)].map((star, i) => (
          <span onClick={() => handleRating(i)} key={i}>
            {productState.byRating > i ? "⭐" : "⚪"}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Rating;
