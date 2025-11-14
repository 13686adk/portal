const baseurl = "https://mentors-backend.echobitsone.com";
document.addEventListener("DOMContentLoaded", () => {
  const sidebarContainer = document.getElementById("sidebar-container");

  if (sidebarContainer) {
    sidebarContainer.innerHTML = `
      <div class="sidebar">
        <div class="sidebar-header">
          <h4>Admin Portal</h4>
        </div>
        <ul class="sidebar-menu">
          <li>
            <a href="dashboard.html" class="active">
              <i class="fas fa-th-large"></i>
              <span>Dashboard</span>
            </a>
          </li>
          <li>
            <a href="mentors.html">
              <i class="fas fa-user-friends"></i>
              <span>Mentors</span>
              <span class="badge-notification">3</span>
            </a>
          </li>
          <li>
            <a href="mentees.html">
              <i class="fas fa-users"></i>
              <span>Mentees</span>
            </a>
          </li>
          <li>
            <a href="course.html">
              <i class="fas fa-book"></i>
              <span>Courses</span>
              <span class="badge-notification">2</span>
            </a>
          </li>
          <li>
            <a href="sessions.html">
              <i class="fas fa-chalkboard-teacher"></i>
              <span>Sessions</span>
              <span class="badge-notification">5</span>
            </a>
          </li>
          <li>
            <a href="communities.html">
              <i class="fas fa-users-cog"></i>
              <span>Communities</span>
              <span class="badge-notification">1</span>
            </a>
          </li>
          <li>
            <a href="reports.html">
              <i class="fas fa-chart-bar"></i>
              <span>Reports</span>
              <span class="badge-notification">7</span>
            </a>
          </li>
          <li>
            <a href="insights.html">
              <i class="fas fa-lightbulb"></i>
              <span>Insights</span>
            </a>
          </li>
        </ul>
      </div>
    `;

    const currentPage = window.location.pathname.split("/").pop();
    const links = sidebarContainer.querySelectorAll(".sidebar-menu a");

    links.forEach(link => {
      if (link.getAttribute("href") === currentPage) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }
});
