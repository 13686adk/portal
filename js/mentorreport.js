// document.addEventListener("DOMContentLoaded", async function () {
//     try {
//         const res = await fetch("https://mentors-backend.echobitsone.com/api/v1/mentors/report", {
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
  const reportContainer = document.getElementById("reportContainer"); // make sure your HTML has this ID

  try {
    const res = await fetch("https://mentors-backend.echobitsone.com/api/v1/mentors/report", {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
      }
    });

    const result = await res.json();
    console.log(result); // 🔍 check full API response

    const reports = result.data;

    // Clear existing placeholder reports
    reportContainer.innerHTML = "";

    if (reports.length === 0) {
      reportContainer.innerHTML = `<p class="text-muted">No reports available.</p>`;
      return;
    }

    reports.forEach((item) => {
      const card = `
        <div class="report-card flagged">
          <div class="report-header">
            <div>
              <h5 class="report-title">
                Mentor Performance Report
                <span class="badge text-capitalize px-3 py-2"
                    style="background-color: #0b4f86; color: #fff; border-radius: 6px; font-size: 12px;">
                    Active
                </span>
              </h5>
              <p class="report-meta mb-0">Mentor: ${item.mentorName}</p>
            </div>
            <button class="btn-resolved">View</button>
          </div>

          <p class="report-description">
            Total Sessions: ${item.totalSessions}<br>
            Completed Sessions: ${item.completedSessions}<br>
            Average Rating: ${item.averageRating}<br>
            Positive Feedback: ${item.positiveFeedbackPercentage}%
          </p>
          <p class="report-time mb-0">Mentor ID: ${item.mentorId}</p>
        </div>
      `;
      reportContainer.insertAdjacentHTML("beforeend", card);
    });

  } catch (error) {
    console.error("Error fetching mentor reports:", error);
  }
});
