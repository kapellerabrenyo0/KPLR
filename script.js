(function () {
  var reveals = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window)) {
    reveals.forEach(function (el) {
      el.classList.add("is-visible");
    });
  } else {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    reveals.forEach(function (el) {
      observer.observe(el);
    });
  }

  var form = document.getElementById("notifyForm");
  var input = document.getElementById("notifyEmail");
  var message = document.getElementById("notifyMessage");

  if (form && input && message) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      var email = input.value.trim();

      if (!email) {
        message.textContent = "Please enter your email first.";
        message.classList.add("is-error");
        input.focus();
        return;
      }

      message.classList.remove("is-error");
      message.textContent = "Opening your email client…";

      var subject = encodeURIComponent("Notify me about the KPLR demo");
      var body = encodeURIComponent(
        "Please notify me at this address when the KPLR demo is ready:\n\n" + email
      );

      window.location.href =
        "mailto:kapeller@kplrstudio.com?subject=" + subject + "&body=" + body;
    });
  }
})();
