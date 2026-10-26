// Contact form: validates, sends through Web3Forms (https://web3forms.com) and shows the result in place.
// Without JavaScript the form still posts straight to Web3Forms.
(function () {
  var form = document.getElementById("contact-form");
  if (!form) return;

  var status = document.getElementById("cform-status");
  var button = form.querySelector('button[type="submit"]');
  var label = button.textContent;
  var ENDPOINT = form.getAttribute("action");

  function say(message, isError) {
    status.textContent = message;
    status.classList.toggle("is-error", !!isError);
  }

  function invalid(field, on) {
    if (on) field.setAttribute("aria-invalid", "true");
    else field.removeAttribute("aria-invalid");
  }

  function check() {
    var name = form.elements.name, email = form.elements.email, message = form.elements.message;
    var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
    invalid(name, !name.value.trim());
    invalid(email, !emailOk);
    invalid(message, !message.value.trim());
    var first = [name, email, message].filter(function (f) { return f.getAttribute("aria-invalid"); })[0];
    return first || null;
  }

  ["name", "email", "message"].forEach(function (n) {
    form.elements[n].addEventListener("input", function () { invalid(form.elements[n], false); });
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Honeypot: real people never tick this
    if (form.elements.botcheck && form.elements.botcheck.checked) return;

    var bad = check();
    if (bad) {
      say("Please fill in your name, a valid email and a message.", true);
      bad.focus();
      return;
    }

    if (/^YOUR_/.test(form.elements.access_key.value)) {
      say("The form isn’t connected yet. Add the Web3Forms access key in contact.html.", true);
      return;
    }

    button.disabled = true;
    button.textContent = "Sending…";
    say("");

    var data = new FormData(form);
    var payload = {};
    data.forEach(function (v, k) { if (k !== "botcheck") payload[k] = v; });

    fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload)
    })
      .then(function (res) { return res.json().then(function (j) { return { ok: res.ok && j.success, j: j }; }); })
      .then(function (r) {
        if (!r.ok) throw new Error((r.j && r.j.message) || "Send failed");
        form.reset();
        button.textContent = "Sent!";
        say("Thanks. We got it, and we’ll get back to you when we’re not busy making pizza.");
        setTimeout(function () { button.disabled = false; button.textContent = label; }, 4000);
      })
      .catch(function () {
        button.disabled = false;
        button.textContent = label;
        say("That didn’t go through. Try again, or call (804) 929-5545.", true);
      });
  });
})();
