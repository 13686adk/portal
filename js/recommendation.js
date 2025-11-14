{/* <div id="youngstersContainer"></div> */}


document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("youngstersContainer");

  try {
    const res = await fetch("https://mentors-backend.echobitsone.com/api/v1/youngsters", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
      }
    });

    const result = await res.json();
    const youngsters = result.data;

    // Clear container
    container.innerHTML = "";

    // If no data
    if (youngsters.length === 0) {
      container.innerHTML = `<p class="text-muted text-center">No youngsters found.</p>`;
      return;
    }

    // Loop through each youngster
    youngsters.forEach(item => {
      const user = item.user;
      const interests = item.userInterests.map(i => `<span class="badge text-bg-light border">${i.name}</span>`).join(" ");

      const card = `
        <div class="card mb-3 border-1 shadow-sm" style="background-color: #E8F4FF;">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-start mb-2">
              <div>
                <h6 class="fw-semibold mb-0">${user.firstName} ${user.lastName}</h6>
                <small class="text-muted">${user.email}</small>
              </div>
              <button class="btn btn-primary btn-sm">Recommend</button>
            </div>

            <div class="mb-2">
              <small class="fw-semibold d-block">Skills</small>
              ${interests}
            </div>

            <hr>

            <div>
              <small class="fw-semibold d-block mb-1">Recommended Mentor:</small>
              <div class="ps-2">
                <h6 class="fw-semibold mb-2">Sarah Johnson</h6>
                <small class="text-muted">5 years • 150 students</small>
                <div class="mt-2">
                  <span class="badge text-bg-light border">Web Development</span>
                  <span class="badge text-bg-light border">React</span>
                  <span class="badge text-bg-light border">Node.js</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
      container.insertAdjacentHTML("beforeend", card);
    });
  } catch (error) {
    console.error("Error fetching youngsters:", error);
    container.innerHTML = `<p class="text-danger">Failed to load youngsters.</p>`;
  }
});

