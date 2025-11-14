document.addEventListener("DOMContentLoaded", async () => {
    try {
       const response = await fetch(`${baseurl}/api/v1/admins/dashboard`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
            },
        });
        const result = await response.json();
        const data = result.data;

        console.log(data);


        document.getElementById('total-mentors').textContent = data.totalMentors;
        document.getElementById('total-mentees').textContent = data.totalMentees;
        document.getElementById('total-courses').textContent = data.totalCourses;
        document.getElementById('ongoing-Sessions').textContent = data.ongoingSessions;
        document.getElementById('total-communities').textContent = data.totalCommunities;
        // document.getElementById('pending-report').textContent = data.pendingCourseApproval;
        document.getElementById('total-reports').textContent = data.totalReports;
        document.getElementById('new-Request-Mentors').textContent = data.newRequestMentors;
        document.getElementById('pending-Course-Approval').textContent = data.pendingCourseApproval;
        document.getElementById('flagged-Sessions').textContent = data.flaggedSessions;
    } catch (error) {
        console.error('Error fetching mentor stats:', error);
    }
});


//  "data": {
//         "totalMentors": 9,1
//         "newRequestMentors": 5,
//         "totalApprovedMentors": 4,
//         "totalMentees": 10,2
//         "totalCommunities": 11,5
//         "totalActiveCommunities": 2,
//         "totalCourses": 7,3
//         "ongoingSessions": 0,4
//         "pendingCourseApproval": 7,
//         "flaggedSessions": 0
//     }

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

// document.addEventListener("DOMContentLoaded", async function () {
//     try {
//         const res = await fetch("https://mentors-backend.echobitsone.com/api/v1/youngsters", {
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
//             }
//         });
//         const result = await res.json();
//         const youngsters = result.data;
//         const container = document.getElementById("youngstersContainer");
//     } catch (error) {
//         console.error("Error fetching youngsters:", error);
//     }
// });