// document.addEventListener("DOMContentLoaded", async function () {
//     try {
//         const res = await fetch("https://mentors-backend.echobitsone.com/api/v1/community ", {
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
//             }
//         });
//         const  result  = await res.json();

//     } catch (error) {
//         console.error("Error fetching courses:", error);
//     }


// });



document.addEventListener("DOMContentLoaded", async () => {
    const container = document.getElementById("communityContainer");

    try {
        const res = await fetch("https://mentors-backend.echobitsone.com/api/v1/community", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}` // adjust if needed
            }
        });

        const result = await res.json();

        if (result.status === 200 && Array.isArray(result.data)) {
            container.innerHTML = ""; // Clear previous content

            result.data.forEach(comm => {
                const communityHTML = `
                    <div class="community-card">
                        <div class="community-header">
                            <div style="flex: 1;">
                                <h5 class="community-title">
                                    ${comm.name}
                                    <span class="badge-status badge-active ${comm.status === "active" ? "badge-active" : "badge-inactive"}">
                                        ${comm.status === "active" ? "Active" : "Inactive"}
                                    </span>
                                </h5>
                                <p class="community-description mb-2">${comm.description || "No description available"}</p>
                                <div class="community-meta">
                                    <span><strong>Creator:</strong> ${comm.creator?.firstName || "N/A"} ${comm.creator?.lastName || ""}</span>
                                    <span><strong>Created:</strong> ${new Date(comm.createdAt).toLocaleDateString()}</span>
                                </div>
                                <div class="community-stats">
                                    <span class="stat-item">👥 ${comm.memberCount + comm.mentorCount} members</span>
                                    <span class="stat-item">🧑‍🏫 ${comm.mentorCount} mentors</span>
                                </div>
                            </div>
                            <div class="action-buttons d-flex justify-content-end gap-2"
                                style="position: absolute; bottom: 20px; right: 20px;">
                                <a href="comments.html" class="btn btn-primary"
                                    style="background-color: #45739B; border: none;">
                                    Enter
                                </a>
                                <button class="btn btn-danger" style="border: none;">
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                `;
                container.insertAdjacentHTML("beforeend", communityHTML);
            });
        } else {
            container.innerHTML = `<p>No communities found.</p>`;
        }

    } catch (error) {
        console.error("Error fetching communities:", error);
        container.innerHTML = `<p style="color:red;">Failed to load communities.</p>`;
    }
});

