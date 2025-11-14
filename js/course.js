// document.addEventListener("DOMContentLoaded", async function () {
//     try {
//         const res = await fetch("https://mentors-backend.echobitsone.com/api/v1/course/get-all-courses", {
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







document.addEventListener("DOMContentLoaded", async function () {
    const container = document.getElementById("course-container");

    try {
        const res = await fetch("https://mentors-backend.echobitsone.com/api/v1/course/get-all-courses", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            }
        });

        const result = await res.json();
        const courses = result.data;

        // Clear container before adding new cards
        container.innerHTML = "";

        courses.forEach(course => {
            // Format date
            const createdDate = new Date(course.createdAt).toLocaleDateString();

            // Pick first image (if exists)
            const image = course.images && course.images.length > 0 ? course.images[0] : "default-course.jpg";

            // Generate HTML
            const courseCard = `
                    <div class="course-card">
                        <div class="dropdown text-end">
                            <button class="btn btn-light border-0 p-0" type="button" id="dropdownMenuButton${course.id}"
                                data-bs-toggle="dropdown" aria-expanded="false">
                                <span style="font-size: 20px; line-height: 1;">⋮</span>
                            </button>
                            <ul class="dropdown-menu dropdown-menu-end shadow-sm" aria-labelledby="dropdownMenuButton${course.id}"
                                style="font-size: 14px;">
                                <li><a class="dropdown-item" href="video.html?id=${course.id}">View Course</a></li>
                                <li><a class="dropdown-item" href="#">Edit</a></li>
                                <li><a class="dropdown-item text-danger" href="#">Delete</a></li>
                            </ul>
                        </div>

                        <img src="${image}" alt="${course.title}" class="img-fluid rounded mb-2" style="height: 100px; object-fit: cover; width: 50%;">

                        <div class="d-flex justify-content-between align-items-start">
                            <div>
                                <div class="d-flex align-items-center">
                                    <h6 class="course-title mb-0">${course.title}</h6>
                                    <span class="badge bg-secondary ms-2">${course.status}</span>
                                </div>
                                <p class="course-description mb-2">${course.description}</p>
                                <div class="course-meta small text-muted">
                                    <span><strong>Instructor:</strong> ${course.creator.firstName} ${course.creator.lastName}</span>
                                    <span class="ms-4"><strong>Category:</strong>${course.category || "N/A"}</span>
                                </div>
                            </div>
                        </div>
                        <div class="stats mt-2 small text-muted">
                            <span><strong>Created:</strong> ${createdDate}</span>
                        </div>
                    </div>
            `;
            container.insertAdjacentHTML("beforeend", courseCard);
        });

    } catch (error) {
        console.error("Error fetching courses:", error);
        container.innerHTML = `<p class="text-danger">Failed to load courses.</p>`;
    }
});



