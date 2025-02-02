document.addEventListener("DOMContentLoaded", function () {
    let fileSelect = document.getElementById("file-select");
    let downloadBtn = document.getElementById("download-btn");

    fileSelect.addEventListener("change", function () {
        if (fileSelect.value) {
            downloadBtn.removeAttribute("disabled");
            fileSelect.style.boxShadow = "0px 0px 5px white"; 
        } else {
            downloadBtn.setAttribute("disabled", true);
            fileSelect.style.boxShadow = "none";
        }
    });

    downloadBtn.addEventListener("click", function () {
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
});
