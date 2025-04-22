// Replace with your own Google Sheet ID and sheet name
const sheetID = '1KakiNCfkBcTnpa9KXhu3JT1Ja0NfyKFaTAr9n87vlvU';
const sheetName = 'Sheet1';
const url = `https://opensheet.elk.sh/${sheetID}/${sheetName}`;

fetch(url)
  .then(res => res.json())
  .then(data => {
    const tbody = document.querySelector('#services-table tbody');
    data.forEach(row => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${row['Service Name']}</td>
        <td>${row['Role']}</td>
        <td style="color: green; font-weight: bold;">${row['Status']}</td>
        <td>₹${row['Price']}</td>
      `;

      tbody.appendChild(tr);
    });
  })
  .catch(err => console.error(err));

  // Show/hide the “Other” text input in the booking form
function toggleOther(value) {
  const otherLabel = document.getElementById('otherLabel');
  if (value === 'Other') {
    otherLabel.style.display = 'block';
    document.getElementById('otherService').setAttribute('required', 'required');
  } else {
    otherLabel.style.display = 'none';
    document.getElementById('otherService').removeAttribute('required');
  }
}

// Updated booking handler (replaces your old handleBooking)
function handleBooking(event) {
  event.preventDefault();

  const name    = document.getElementById('userName').value.trim();
  const contact = document.getElementById('userContact').value.trim();
  let service   = document.getElementById('serviceRequired').value;

  // If “Other”, grab the custom text
  if (service === 'Other') {
    service = document.getElementById('otherService').value.trim();
    if (!service) {
      alert('Please specify your requirement.');
      return;
    }
  }

  // Validate Indian 10‑digit mobile
  const phoneRegex = /^[6-9]\d{9}$/;
  if (!phoneRegex.test(contact)) {
    alert('Enter a valid 10‑digit mobile number.');
    return;
  }

  // Send via WhatsApp
  const adminNumber = '7318090728'; // your number (without +)
  const waUrl = `https://wa.me/${adminNumber}?text=` +
    encodeURIComponent(
      `Hi Admin, please book: ${service}. Name: ${name}, Contact: ${contact}.`
    );
  window.open(waUrl, '_blank');
}
// Toggle Sidebar
function toggleMenu() {
  const sidebar = document.getElementById("sidebar");
  if (sidebar.style.width === "250px") {
    sidebar.style.width = "0";
  } else {
    sidebar.style.width = "250px";
  }
}
function sendWhatsApp(serviceName) {
  const adminNumber = "7318090728"; // ← Change this to your actual WhatsApp number
  const message = `Hello, I am looking for a ${serviceName} service. Please assist.`;
  const encodedMessage = encodeURIComponent(message);
  const whatsappLink = `https://wa.me/${adminNumber}?text=${encodedMessage}`;
  window.open(whatsappLink, "_blank");
}
const sidebar = document.querySelector('.sidebar');
const menuToggle = document.querySelector('.menu-toggle');

menuToggle.addEventListener('click', () => {
  sidebar.classList.toggle('active');
});

// Sidebar link pe click hone par sidebar band ho jaye
document.querySelectorAll('.sidebar a').forEach(link => {
  link.addEventListener('click', () => {
    sidebar.classList.remove('active');
  });
});

// Sidebar ke bahar click hone par sidebar band ho jaye
document.addEventListener('click', (e) => {
  if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
    sidebar.classList.remove('active');
  }
});

