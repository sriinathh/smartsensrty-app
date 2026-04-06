
// ===========================
// SOCIAL SHARING FUNCTIONS
// ===========================

function shareOnWhatsApp() {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent("Download SmartSensrty - Your Safety, Our Priority! 🛡️");
    window.open(`https://wa.me/?text=${text} ${url}`, "_blank");
    showAlert("success", "Opening WhatsApp...");
}

function shareOnTwitter() {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent("Just discovered SmartSensrty - the ultimate safety app! Download now 🛡️");
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, "_blank");
    showAlert("success", "Opening Twitter...");
}

function shareOnFacebook() {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank");
    showAlert("success", "Opening Facebook...");
}

function copyShareLink() {
    const shareLink = window.location.href;
    navigator.clipboard.writeText(shareLink).then(() => {
        showAlert("success", "Share link copied to clipboard!");
    }).catch(() => {
        showAlert("error", "Failed to copy link");
    });
}
