const header = document.querySelector("header")

window.addEventListener ("scroll", function(){
    header.classList.toggle("sticky", window.scrollY > 60)
});
// 메뉴바 스크롤 애니메이션


let selectedFiles = [];  // 선택한 파일들의 목록을 저장하는 배열

// 선택 파일의 이름 나열하기
document.getElementById('file').addEventListener('change', function() {
    const fileNamesDiv = document.getElementById('file-names');
    
    // 새롭게 선택된 파일들을 selectedFiles 배열에 추가
    for (let i = 0; i < this.files.length; i++) {
        selectedFiles.push(this.files[i]);
    }

    updateFileDisplay();  // 화면에 파일 목록 갱신
});

// 파일 목록을 화면에 갱신하는 함수
function updateFileDisplay() {
    const fileNamesDiv = document.getElementById('file-names');
    fileNamesDiv.innerHTML = '';  // 기존의 파일 목록 삭제
    
    // selectedFiles 배열에 있는 모든 파일의 이름을 화면에 표시
    for (let i = 0; i < selectedFiles.length; i++) {
        const fileDiv = document.createElement('div');
        fileDiv.innerHTML = `<span>${selectedFiles[i].name}</span> <button onclick="removeFile(${i})">x</button>`;
        fileNamesDiv.appendChild(fileDiv);
    }
}

// 파일 제거 함수
function removeFile(index) {
    selectedFiles.splice(index, 1);  // 선택된 파일 목록에서 해당 파일 제거
    updateFileDisplay();  // 화면 갱신
}

// form 제출 전에 선택된 파일들을 input 태그에 설정
document.querySelector('form').addEventListener('submit', function(e) {
    const fileInput = document.getElementById('file');
    const newFileList = new DataTransfer();

    // selectedFiles 배열에 있는 모든 파일을 newFileList에 추가
    for (let file of selectedFiles) {
        newFileList.items.add(file);
    }

    fileInput.files = newFileList.files;  // file input 태그에 최종 선택된 파일 목록 설정
});