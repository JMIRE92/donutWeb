// contact.js
(function () {
    const form = document.getElementById("enquiryForm");
    const errorBox = document.getElementById("errorBox");
    const successBox = document.getElementById("successBox");

    if (!form) return;

    function isBlank(str) {
        return !str || str.trim().length === 0;
    }

    function isValidEmail(email) {
        const e = email.trim();
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
    }

    function showError(msg) {
        successBox.style.display = "none";
        successBox.textContent = "";
        errorBox.textContent = msg;
        errorBox.style.display = "block";
    }

    function showSuccess(msg) {
        errorBox.style.display = "none";
        errorBox.textContent = "";
        successBox.textContent = msg;
        successBox.style.display = "block";
    }

    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        errorBox.style.display = "none";
        successBox.style.display = "none";
        errorBox.textContent = "";
        successBox.textContent = "";

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const eventType = document.getElementById("eventType").value;
        const eventDate = document.getElementById("eventDate").value;
        const message = document.getElementById("message").value;

        const errors = [];

        if (isBlank(name)) errors.push("Please enter your name.");
        if (isBlank(email)) errors.push("Please enter your email.");
        if (!isBlank(email) && !isValidEmail(email)) errors.push("Please enter a valid email address.");
        if (isBlank(eventType)) errors.push("Please select an event type.");
        if (isBlank(eventDate)) errors.push("Please choose an event date.");
        if (isBlank(message) || message.trim().length < 10) {
            errors.push("Please add a message of at least 10 characters.");
        }

        if (errors.length > 0) {
            showError(errors.join(" "));
            return;
        }

        const btn = form.querySelector('button[type="submit"]');
        const oldBtnText = btn ? btn.textContent : "";
        if (btn) {
            btn.disabled = true;
            btn.textContent = "Sending...";
        }

        try {
            const res = await fetch(form.action, {
                method: "POST",
                body: new FormData(form),
                headers: { "Accept": "application/json" }
            });

            const data = await res.json().catch(() => null);

            if (!res.ok) {
                const msg = data && data.errors && data.errors.length
                    ? data.errors.map(er => er.message).join(" ")
                    : "Sending failed. Please try again.";
                showError(msg);
                return;
            }

            showSuccess("Thanks. Your enquiry has been sent.");
            form.reset();
        } catch (err) {
            showError("Network error. Please try again.");
        } finally {
            if (btn) {
                btn.disabled = false;
                btn.textContent = oldBtnText;
            }
        }
    });
})();