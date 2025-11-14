// document.addEventListener("DOMContentLoaded", () => {
//   const header = document.getElementById("header");

//   header.innerHTML = `
//     <div class="top-header bg-white d-flex justify-content-between align-items-center px-4 py-2 border-bottom fixed-top"
//          style="z-index: 1030; left: 250px; width: calc(100% - 250px);">
//         <div class="search-box position-relative d-flex align-items-center" style="width: 250px;">
//             <i class="fas fa-search text-muted position-absolute ms-2"></i>
//             <input type="text" class="form-control border-start-0" placeholder="Search...">
//         </div>
//         <div class="header-icons d-flex align-items-center gap-3">
//             <!-- Notification Bell -->
// <div class="dropdown">
//   <i class="fas fa-bell fs-5 text-dark" id="notificationBell" data-bs-toggle="dropdown" aria-expanded="false" style="cursor: pointer;"></i>
  
//   <ul class="dropdown-menu dropdown-menu-end shadow-sm" aria-labelledby="notificationBell" id="notificationList" style="width: 300px; max-height: 400px; overflow-y: auto;">
//     <li class="dropdown-header fw-bold">Notifications</li>
//     <li><hr class="dropdown-divider"></li>
//     <li class="text-center text-muted small" id="noNotifications">No notifications yet</li>
//   </ul>
// </div>

//             <i class="fas fa-cog fs-5 text-dark"></i>
//         </div>
//     </div>

//     <!-- Spacer to prevent overlap -->
//     <div style="height: 60px;"></div>
//   `;
// });


// document.addEventListener("DOMContentLoaded", async function () {
//   const notificationList = document.getElementById("notificationList");
//   const noNotifications = document.getElementById("noNotifications");

//   try {
//     const res = await fetch("https://mentors-backend.echobitsone.com/api/v1/notifications", {
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
//       }
//     });

//     const result = await res.json();
//     const notifications = result.data;

//     // Clear previous notification items except the header and divider
//     notificationList.innerHTML = `
//       <li class="dropdown-header fw-bold">Notifications</li>
//       <li><hr class="dropdown-divider"></li>
//     `;

//     if (notifications.length === 0) {
//       notificationList.innerHTML += `
//         <li class="text-center text-muted small" id="noNotifications">No notifications yet</li>
//       `;
//       return;
//     }

//     notifications.forEach((notif) => {
//       const time = new Date(notif.createdAt).toLocaleString(); // format date
//       const item = `
//         <li class="px-3 py-2 border-bottom">
//           <div class="fw-semibold text-dark">${notif.title || "New Notification"}</div>
//           <div class="text-muted small">${notif.message || ""}</div>
//           <div class="text-end text-muted small">${time}</div>
//         </li>
//       `;
//       notificationList.insertAdjacentHTML("beforeend", item);
//     });

//   } catch (error) {
//     console.error("Error fetching notifications:", error);
//     notificationList.innerHTML += `
//       <li class="text-center text-danger small">Failed to load notifications</li>
//     `;
//   }
// });


document.addEventListener("DOMContentLoaded", async () => {
  const header = document.getElementById("header");

  // Inject Header HTML
  header.innerHTML = `
    <div class="top-header bg-white d-flex justify-content-between align-items-center px-4 py-2 border-bottom fixed-top"
         style="z-index: 1030; left: 250px; width: calc(100% - 250px);">
        <div class="search-box position-relative d-flex align-items-center" style="width: 250px;">
            <i class="fas fa-search text-muted position-absolute ms-2"></i>
            <input type="text" class="form-control border-start-0" placeholder="Search...">
        </div>
        <div class="header-icons d-flex align-items-center gap-3">
            <!-- Notification Bell -->
            <div class="dropdown">
              <i class="fas fa-bell fs-5 text-dark" id="notificationBell" data-bs-toggle="dropdown" aria-expanded="false" style="cursor: pointer;"></i>
              <ul class="dropdown-menu dropdown-menu-end shadow-sm" aria-labelledby="notificationBell" id="notificationList" style="width: 300px; max-height: 400px; overflow-y: auto;">
                <li class="dropdown-header fw-bold">Notifications</li>
                <li><hr class="dropdown-divider"></li>
                <li class="text-center text-muted small" id="noNotifications">No notifications yet</li>
              </ul>
            </div>
            <i class="fas fa-cog fs-5 text-dark"></i>
        </div>
    </div>
    <!-- Spacer -->
    <div style="height: 60px;"></div>
  `;

  // ✅ Now safely get notification elements
  const notificationList = document.getElementById("notificationList");
  const noNotifications = document.getElementById("noNotifications");

  try {
    const res = await fetch("https://mentors-backend.echobitsone.com/api/v1/notifications", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
      }
    });

    const result = await res.json();
    const notifications = result.data || [];

    // Clear previous notification items except header and divider
    notificationList.innerHTML = `
      <li class="dropdown-header fw-bold">Notifications</li>
      <li><hr class="dropdown-divider"></li>
    `;

    if (notifications.length === 0) {
      notificationList.innerHTML += `
        <li class="text-center text-muted small" id="noNotifications">No notifications yet</li>
      `;
      return;
    }

    // Loop through and render each notification
    notifications.forEach((notif) => {
      const time = new Date(notif.createdAt).toLocaleString();
      const item = `
        <li class="px-3 py-2 border-bottom">
          <div class="fw-semibold text-dark">${notif.title || "New Notification"}</div>
          <div class="text-muted small">${notif.message || ""}</div>
          <div class="text-end text-muted small">${time}</div>
        </li>
      `;
      notificationList.insertAdjacentHTML("beforeend", item);
    });

  } catch (error) {
    console.error("Error fetching notifications:", error);
    notificationList.innerHTML += `
      <li class="text-center text-danger small">Failed to load notifications</li>
    `;
  }
});
