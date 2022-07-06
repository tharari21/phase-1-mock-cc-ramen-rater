const ramenMenu = document.querySelector("#ramen-menu");
const ramenDetail = document.querySelector("#ramen-detail");
const ramenName = ramenDetail.querySelector(".name");
const ramenRestaurant = ramenDetail.querySelector(".restaurant");
const ramenRating = document.querySelector("#rating-display");
const ramenComment = document.querySelector("#comment-display");
const ramenForm = document.querySelector("#new-ramen");
const ramenImg = ramenDetail.querySelector(".detail-image");
// write your code here
const fetchRamen = async () => {
  const req = await fetch("http://localhost:3000/ramens");
  const res = await req.json();
  return res;
};
const createRamen = async (body) => {
  const req = await fetch("http://localhost:3000/ramens", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const res = await req.json();
  return res;
};

const setRamenImage = (imageUrl) => {
  ramenImg.src = imageUrl;
};

const setRamenName = (name) => {
  ramenName.textContent = name;
};
const setRamenRestaurant = (restaurant) => {
  ramenRestaurant.textContent = restaurant;
};
const setRamenRating = (rating) => {
  ramenRating.textContent = rating;
};
const setRamenComment = (comment) => {
  ramenComment.textContent = comment;
};
const setRamenDetails = (ramenObj) => {
  setRamenImage(ramenObj.image);
  setRamenName(ramenObj.name);
  setRamenRestaurant(ramenObj.restaurant);
  setRamenRating(ramenObj.rating);
  setRamenComment(ramenObj.comment);
};

const displayRamenImages = async () => {
  const ramen = await fetchRamen();
  ramen.forEach((ramenObj) => {
    const img = document.createElement("img");
    img.src = ramenObj.image;

    img.addEventListener("click", () => {
      setRamenDetails(ramenObj);
    });
    ramenMenu.append(img);
  });
};

ramenForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log(e.target.name.value);
  const newRamen = {
    name: e.target.name.value,
    restaurant: e.target.restaurant.value,
    image: e.target.image.value,
    rating: e.target.rating.value,
    comment: e.target["new-comment"].value,
  };
  const res = await createRamen(newRamen);
  console.log(res);
});

// Advanced Deliverables

// displayRamenImages();
// const firstRender = () => {
//   setRamenDetails();
// };
