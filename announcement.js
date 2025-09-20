// === Announcement Setup ===
const announcementMessage = "⚡ Official Update: Victor Dada’s new album is out now!"; // Update here

document.addEventListener('DOMContentLoaded', () => {
  const announcement = document.getElementById('announcement');
  const dismissed = localStorage.getItem('announcementDismissed');

  if (!dismissed) {
    // Inject announcement message with close button
    announcement.innerHTML = `${announcementMessage} <span class="close" onclick="closeAnnouncement()">&times;</span>`;
    announcement.style.display = 'block';
    document.body.classList.add('announcement-shown');
  }

  // Apply dark mode if already active
  if (document.body.classList.contains('dark-mode')) {
    announcement.style.backgroundColor = "#333";
    announcement.style.color = "#fffae6";
  }
});

// Close announcement
function closeAnnouncement() {
  const announcement = document.getElementById('announcement');
  announcement.style.display = 'none';
  document.body.classList.remove('announcement-shown');
  localStorage.setItem('announcementDismissed', 'true'); // remembers dismissal across pages
}
