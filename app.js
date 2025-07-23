const inputName = document.querySelector("[data-TakeInputWR]");
const searchbutton = document.querySelector("[data-searchbtn]");
const userImg = document.querySelector("[data-profile-image]");
const names = document.querySelector("[data-user-name]");
const joiningDate = document.querySelector("[data-user-joining]");

const userId = document.querySelector("[data-username]");
const description = document.querySelector("[data-user-Desc]");
const repository = document.querySelector("[data-user-repo]");

const followers = document.querySelector("[data-user-followers]");
const follwings = document.querySelector("[data-user-follwing]");
const city = document.querySelector("[data-user-city]");

const links = document.querySelector("[data-user-link]");
const twitter = document.querySelector("[data-user-twitter]");
const address = document.querySelector("[data-user-addres]");
const searchForm = document.querySelector("[data-search-form]");


if (searchForm) {
  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = inputName.value.trim();
    if (username) fetchInfo(username);
  });
}

// if (inputName && searchbutton) {
//   searchbutton.addEventListener("click", () => {
//     const username = inputName.value.trim();
//     if (username) fetchInfo(username);
//   });
// }

async function fetchInfo(username) {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    const data = await response.json();

    if (data && !data.message) {
      renderInfo(data);
    } else {
      alert("User not found");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

function renderInfo(userdata) {
  userImg.src = userdata.avatar_url || "";
  names.textContent = userdata.name || "Not available";
  joiningDate.textContent = new Date(userdata.created_at).toDateString();

  userId.textContent = userdata.login || "Unknown";
  description.textContent = userdata.bio || "No bio";
  repository.textContent = userdata.public_repos;

  followers.textContent = userdata.followers;
  follwings.textContent = userdata.following;
  city.textContent = userdata.location || "Not specified";

  links.href = userdata.html_url;
  links.textContent = userdata.html_url;

  twitter.textContent = userdata.twitter_username
    ? `@${userdata.twitter_username}`
    : "Not available";

  address.textContent = userdata.company || "Not available";
}


const toggleBtn = document.getElementById("dark-mode-toggle");
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});
