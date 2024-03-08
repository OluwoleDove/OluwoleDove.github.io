window.onload = function() {
    document.querySelector(".banner h1").style.right = "0";
    new GitHubCalendar(".calendar", "OluwoleDove");
};


document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll(".slide-up");

    // Function to check if an element is in the viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Function to handle scroll event
    function handleScroll() {
        sections.forEach((section) => {
            if (isInViewport(section) && !section.classList.contains("visible")) {
                section.classList.add("visible");
            }
        });
    }

    // Attach the handleScroll function to the scroll event
    window.addEventListener("scroll", handleScroll);

    // Trigger the handleScroll function on page load
    handleScroll();
});