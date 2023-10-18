const header = document.querySelector("header")

window.addEventListener ("scroll", function(){
    header.classList.toggle("sticky", window.scrollY > 80)
});
// 메뉴바 스크롤 애니메이션

let selectedFiles = []; // 사용자가 새로 추가한 파일 목록
let removedFiles = []; // 사용자가 삭제한 파일 목록

// 기존 첨부파일 삭제 처리
document.querySelectorAll('.remove-file').forEach(button => {
    button.addEventListener('click', function(e) {
        // 해당 버튼의 데이터 속성에서 파일명 가져옴
        const filename = e.target.getAttribute('data-filename');
        removedFiles.push(filename);
        // 파일 아이템 삭제
        e.target.closest('.file-item').remove();
    });
});

// 새로운 첨부파일 목록 갱신
document.getElementById('file').addEventListener('change', function() {
    // 사용자가 선택한 파일들을 selectedFiles 배열에 추가
    for (let i = 0; i < this.files.length; i++) {
        selectedFiles.push(this.files[i]);
    }
    updateFileDisplay(); // 파일 표시 업데이트
});

// 선택된 파일을 화면에 표시하는 함수
function updateFileDisplay() {
    const fileNamesDiv = document.getElementById('file-names');
    fileNamesDiv.innerHTML = '';

    for (let i = 0; i < selectedFiles.length; i++) {
        const fileDiv = document.createElement('div');
        fileDiv.innerHTML = `<span>${selectedFiles[i].name}</span> <button type="button" onclick="removeNewFile(${i})">x</button>`;
        fileNamesDiv.appendChild(fileDiv);
    }
}

// 사용자가 선택한 새 파일을 목록에서 삭제하는 함수
function removeNewFile(index) {
    selectedFiles.splice(index, 1);
    updateFileDisplay();
}

// 폼 제출 시 실행될 이벤트 리스너
document.querySelector('form').addEventListener('submit', function(e) {
    const fileInput = document.getElementById('file');
    const newFileList = new DataTransfer();

    // selectedFiles에 있는 파일들을 newFileList에 추가
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
