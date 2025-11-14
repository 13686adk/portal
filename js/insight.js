// Dashboard Stats//
  async function loadDashboardStats() {
    try {
      const res = await fetch("https://mentors-backend.echobitsone.com/api/v1/admins/insights", {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
        }
      });

      const result = await res.json();
      console.log(result);

      const data = result?.data || {};

      // ✅ Update UI with API data
      document.getElementById("totalUsers").textContent = data.totalUsers ?? 0;
      document.getElementById("activeSessions").textContent = data.activeSessions ?? 0;
      document.getElementById("courseCompletion").textContent = data.courseCompletionRate ? `${data.courseCompletionRate}%` : "0%";
      document.getElementById("platformGrowth").textContent = data.platformGrowth ? `${data.platformGrowth}%` : "0%";

    } catch (error) {
      console.error("Error loading dashboard stats:", error);
    }
  }

  loadDashboardStats();




// User Growth Trend Chart
       async function loadChart(){
        const res = await fetch("https://mentors-backend.echobitsone.com/api/v1/admins/insights/user-growth-trend",{
             headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
            }
        });
        const { data } = await res.json();

        // console.log(data)
         const userGrowthCtx = document.getElementById('userGrowthChart').getContext('2d');
        new Chart(userGrowthCtx, {
            type: 'bar',
            data: {
                labels: data.labels,
                datasets: [
                    {
                        label: 'Mentor',
                        data: data.mentor,
                        backgroundColor: '#7fb3d5',
                        borderRadius: 4,
                    },
                    {
                        label: 'Mentee',
                        data: data.mentee,
                        backgroundColor: '#2c5f8d',
                        borderRadius: 4,
                    },
                    {
                        label: 'Users',
                        data: data.users,
                        backgroundColor: '#1a3a52',
                        borderRadius: 4,
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: '#f0f0f0'
                        }
                    }
                }
            }
        });
       }

       // loadChart()

        // Session Performance Chart
       async function loadChartSeasion(){
        const res = await fetch("https://mentors-backend.echobitsone.com/api/v1/admins/insights/session-performance",{
             headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
             }
       });
       const {data} = await res.json();
    //    console.log(data)
         const sessionCtx = document.getElementById('sessionPerformanceChart').getContext('2d');
        new Chart(sessionCtx, {
            type: 'bar',
            data: {
                labels: data.labels,
                datasets: [
                    {
                        label: 'Completed',
                        data: data.completed,
                        backgroundColor: '#7fb3d5',
                        borderRadius: 4,
                    },
                    {
                        label: 'On Hold',
                        data: data.onHold,
                        backgroundColor: '#2c5f8d',
                        borderRadius: 4,
                    },
                    {
                        label: 'Flagged',
                        data: data.flagged,
                        backgroundColor: '#1a3a52',
                        borderRadius: 4,
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        beginAtZero: true,
                        max: 60,
                        grid: {
                            color: '#f0f0f0'
                        }
                    }
                }
            }
        });
       }
    //    loadChartSeasion()

        // User Engagement Pie Chart
       async function loadChartEngagement(){
        const res = await fetch("https://mentors-backend.echobitsone.com/api/v1/admins/insights/user-engagement?days=30",{
             headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
             }
       });
         const {data} = await res.json();
            // console.log(data);
         const engagementCtx = document.getElementById('engagementChart').getContext('2d');

         let newlist = [];

         const newArray = data.users.forEach((item) => {
            newlist.push(parseInt(item.totalActivity));
         });

        //  console.log(newlist)

        new Chart(engagementCtx, {
            type: 'doughnut',
            data: {
                labels: data.engagementLevels,
                datasets: [{
                    data: newlist,
                    backgroundColor: ['#5dade2', '#2874a6', '#1a5276', '#154360'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
       }
    //    loadChartEngagement();

 async function loadTopCoursesChart(){
    const res = await fetch("https://mentors-backend.echobitsone.com/api/v1/admins/insights/top-courses", {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
  }
});

const response = await res.json();
const courses = response.data;

// ✅ Extract chart data properly
const labels = courses.map(item => item.title);
const completed = courses.map(item => parseInt(item.completedSessions));
const enrolled = courses.map(item => parseInt(item.totalEnrollments));

// Debug to confirm
console.log("Labels:", labels);
console.log("Completed:", completed);
console.log("Enrollments:", enrolled);

const ctx = document.getElementById('topCoursesChart').getContext('2d');
new Chart(ctx, {
  type: 'bar',
  data: {
    labels,
    datasets: [
      {
        label: 'Completions',
        data: completed,
        backgroundColor: '#b0b0b0',
        borderRadius: 4,
      },
      {
        label: 'Enrollments',
        data: enrolled,
        backgroundColor: '#1a5276',
        borderRadius: 4,
      }
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: { display: false }
    },
    scales: {
      x: { grid: { display: false } },
      y: {
        beginAtZero: true,
        grid: { color: '#f0f0f0' }
      }
    }
  }
});
 }
//  loadTopCoursesChart();

document.addEventListener("DOMContentLoaded", () => {
    loadChart();
    loadChartSeasion();
    loadChartEngagement();
    loadTopCoursesChart();
});