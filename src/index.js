document.getElementById("subscribe").addEventListener("click", function () {
    const emailInput = document.querySelector(".email-input").value;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput)) {
        alert("Please enter a valid email address.");
        return;
    }

    fetch("users.json")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Error loading the JSON file.");
            }
            return response.json();
        })
        .then((data) => {
            // email exists or not in json
            const userExists = data.users.some(user => user.email === emailInput);

            if (userExists) {
                // Redirect to :
                window.location.href = "home.html";
            } else {
                alert("Email not found in the database.");
            }
        })
        .catch((error) => {
            console.error("Error:", error);
            alert("Unable to verify the email at this time.");
        });
});

