const ramenMenu = document.querySelector("#ramen-menu");
const ramenDetail = document.querySelector("#ramen-detail");
const ramenName = ramenDetail.querySelector(".name");
const ramenRestaurant = ramenDetail.querySelector(".restaurant");
const ramenRating = document.querySelector("#rating-display");
const ramenComment = document.querySelector("#comment-display");
const createRamenForm = document.querySelector("#new-ramen");
const editRamenForm = document.querySelector("#edit-ramen");
const ramenImg = ramenDetail.querySelector(".detail-image");
let curRamen;

// write your code here
const fetchRamen = async () => {
  // GET ramen
  const req = await fetch("http://localhost:3000/ramens");
  const res = await req.json();
  return res;
};
const createRamen = async (body) => {
  // POST ramen
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
const updateRamen = async (ramenId, ramenUpdateObj) => {
  // PATCH ramen
  const req = await fetch(`http://localhost:3000/ramens/${ramenId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(ramenUpdateObj),
  });
  const res = await req.json();
  return res;
};

const setRamenImage = (imageUrl) => {
  // Set ramen display image
  ramenImg.src = imageUrl;
};

const setRamenName = (name) => {
  // Set ramen display name
  ramenName.textContent = name;
};
const setRamenRestaurant = (restaurant) => {
  // Set ramen display restaurant
  ramenRestaurant.textContent = restaurant;
};
const setRamenRating = (rating) => {
  // Set ramen display rating
  ramenRating.textContent = rating;
};
const setRamenComment = (comment) => {
  // Set ramen display comment
  ramenComment.textContent = comment;
};
const setRamenDetails = (ramenObj) => {
  // Set all ramen display items
  curRamen = ramenObj.id;
  setRamenImage(ramenObj.image);
  setRamenName(ramenObj.name);
  setRamenRestaurant(ramenObj.restaurant);
  setRamenRating(ramenObj.rating);
  setRamenComment(ramenObj.comment);
};

const displayRamenImages = async () => {
  // Remove current images
  while (ramenMenu.firstChild) {
    ramenMenu.firstChild.remove();
  }
  // Get all ramen from server
  const ramen = await fetchRamen();
  // Create image for each ramen
  ramen.forEach((ramenObj) => {
    const img = document.createElement("img");
    img.src = ramenObj.image;
    // Add image click functionality
    img.addEventListener("click", () => {
      setRamenDetails(ramenObj);
    });
    ramenMenu.append(img);
  });
};

// Create ramen event listener
createRamenForm.addEventListener("submit", async (e) => {
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
  displayRamenImages();
});
// Update ramen event listener
editRamenForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const updatedRamenObj = {
    rating: e.target.rating.value,
    comment: e.target["new-comment"].value,
  };

  const res = await updateRamen(curRamen, updatedRamenObj);
  console.log(res);
  setRamenDetails(res);
});

// Advanced Deliverables

const renderFirstRamen = async () => {
  const ramenList = await fetchRamen();
  const firstRamenObj = ramenList[0];
  setRamenDetails(firstRamenObj);
};

renderFirstRamen();
displayRamenImages();
