let selectedFiles = [];
let removedFiles = [];

// 기존 첨부파일 삭제 처리
document.querySelectorAll('.remove-file').forEach(button => {
    button.addEventListener('click', function(e) {
        const filename = e.target.getAttribute('data-filename');
        removedFiles.push(filename);
        e.target.closest('.file-item').remove();
    });
});

// 새로운 첨부파일 목록 갱신
document.getElementById('file').addEventListener('change', function() {
    for (let i = 0; i < this.files.length; i++) {
        selectedFiles.push(this.files[i]);
    }
    updateFileDisplay();
});

function updateFileDisplay() {
    const fileNamesDiv = document.getElementById('file-names');
    fileNamesDiv.innerHTML = '';

    for (let i = 0; i < selectedFiles.length; i++) {
        const fileDiv = document.createElement('div');
        fileDiv.innerHTML = `<span>${selectedFiles[i].name}</span> <button type="button" onclick="removeNewFile(${i})">x</button>`;
        fileNamesDiv.appendChild(fileDiv);
    }
}

function removeNewFile(index) {
    selectedFiles.splice(index, 1);
    updateFileDisplay();
}

document.querySelector('form').addEventListener('submit', function(e) {
    const fileInput = document.getElementById('file');
    const newFileList = new DataTransfer();

    for (let file of selectedFiles) {
        newFileList.items.add(file);
    }

    fileInput.files = newFileList.files;

    // 제거된 파일 목록을 input 태그로 추가
    removedFiles.forEach(filename => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = 'remove_files';
        input.value = filename;
        e.target.appendChild(input);
    });
});
