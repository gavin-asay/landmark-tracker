const addLandmark = document.querySelector("#add");
const deleteLandmark = document.querySelector("#delete");

async function logout() {
  const response = await fetch("/api/users/logout", {
    method: "post",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/");
  } else {
    alert(response.statusText);
  }
}

document.querySelector("#sign-out").addEventListener("click", logout);

addLandmark.addEventListener("click", () => {
  document.location.replace("/addLandmark");
});

deleteLandmark.addEventListener("click", () => {
  document.location.replace("/deleteLandmark");
});
