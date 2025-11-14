document.addEventListener("DOMContentLoaded", async function () {
    try {
        const res = await fetch("https://mentors-backend.echobitsone.com/api/v1/questions", {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
            }
        });
        const  result  = await res.json();

    } catch (error) {
        console.error("Error fetching courses:", error);
    }


});
