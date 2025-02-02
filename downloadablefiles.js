document.getElementById("download-btn").addEventListener("click", function () {
    let fileSelect = document.getElementById("file-select");
    let selectedFile = fileSelect.value;

    if (selectedFile) {
        let a = document.createElement("a");
        a.href = selectedFile;
        a.download = selectedFile.split("/").pop(); // Extract filename
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    } else {
        alert("Please select a file to download.");
    }
});

document.getElementById("file-select").addEventListener("change", function() {
    this.style.boxShadow = "0px 0px 5px white"; 
});
