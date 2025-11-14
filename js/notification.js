
  async function loadNotifications() {
    const notificationList = document.getElementById("notificationList");
    const noNotifications = document.getElementById("noNotifications");

    try {
      const res = await fetch("https://mentors-backend.echobitsone.com/api/v1/notifications", {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
        }
      });

      const result = await res.json();
      console.log(result);

      if (result.data.length === 0) {
        noNotifications.style.display = "block";
        return;
      }

      // Clear old items
      notificationList.innerHTML = `
        <li class="dropdown-header fw-bold">Notifications</li>
        <li><hr class="dropdown-divider"></li>
      `;

      // Add new notifications
      result.data.forEach((note) => {
        const createdDate = new Date(note.createdAt).toLocaleString();

        notificationList.innerHTML += `
          <li class="px-3 py-2 border-bottom">
            <div class="small fw-bold">${note.title || "Notification"}</div>
            <div class="small text-muted">${note.message || "No details"}</div>
            <div class="small text-secondary">${createdDate}</div>
          </li>
        `;
      });
    } catch (error) {
      console.error("Error fetching notifications:", error);
      noNotifications.innerText = "Failed to load notifications";
    }
  }

  // Load notifications when page loads
  document.addEventListener("DOMContentLoaded", loadNotifications);
  loadNotifications();
