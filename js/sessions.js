// document.addEventListener("DOMContentLoaded", async function () {
//     try {
//         const res = await fetch("https://mentors-backend.echobitsone.com/api/v1/admins/mentorship-sessions ", {
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


document.addEventListener("DOMContentLoaded", loadSessions);

async function loadSessions() {
    const token = localStorage.getItem("accessToken"); // Make sure this exists

    const res = await fetch("https://mentors-backend.echobitsone.com/api/v1/admins/mentorship-sessions", {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });

    const result = await res.json();

    if (!res.ok) {
        console.log("Error:", result);
        return;
    }

    const sessions = result.data;
    const container = document.getElementById("sessionsContainer");

    container.innerHTML = ""; // Clear previous content

    sessions.forEach(session => {
        const mentorName = `${session.mentor.firstName} ${session.mentor.lastName}`;
        const menteeName = `${session.youngster.firstName} ${session.youngster.lastName}`;
        const courseTitle = session.course.title;

        container.innerHTML += `
            <div class="session-card">
                <div class="menu-dots">⋮</div>
                <div class="session-header">
                    <div>
                        <h5 class="session-title">${courseTitle}
                            <span class="badge-status badge-live">LIVE</span>
                        </h5>
                        <p class="session-topic mb-0">Topic: ${session.course.description}</p>
                    </div>
                </div>

                <div class="mentor-info">
                    <div class="mentor-item">
                        <span class="mentor-label">Mentor</span>
                        <span class="mentor-name">${mentorName}</span>
                    </div>
                    <div class="mentor-item">
                        <span class="mentor-label">Mentee</span>
                        <span class="mentor-name">${menteeName}</span>
                    </div>
                </div>

                <div class="d-flex justify-content-between align-items-center">
                    <div class="session-meta">
                        Created: ${new Date(session.createdAt).toLocaleString()}
                    </div>
                    <button class="btn-enter" onclick="window.location.href='reviewsessions.html'">
                        Enter
                    </button>
                </div>
            </div>
        `;
    });
}
