const header = document.querySelector("header")

window.addEventListener ("scroll", function(){
    header.classList.toggle("sticky", window.scrollY > 80)
});
// 메뉴바 스크롤 애니메이션

// 댓글이 수정중인지 상태를 저장하는 변수
let isEditing = false;

function showEditComment(commentId) {
    if (isEditing) {
        alert("수정 중인 댓글이 있습니다. 수정 혹은 취소를 해주세요."); // 다른 댓글이 수정중 이라면 경고 메시지 표시
        return;
    }

    // 현재 댓글 수정 상태를 true로 변경
    isEditing = true;

    // 선택한 댓글 내용 숨김
    const commentContentElem = document.getElementById(`commentContent${commentId}`);
    commentContentElem.style.display = 'none';

    // 선택한 댓글 수정 폼 표시
    const editForm = document.getElementById(`editCommentForm${commentId}`);
    editForm.style.display = 'block';

    // 수정, 삭제 버튼 숨김
    document.getElementById(`editBtn${commentId}`).style.display = 'none';
    document.getElementById(`deleteCommentForm${commentId}`).style.display = 'none';
}

function hideEditComment(commentId) {
    // 댓글 수정 상태를 false로 변경
    isEditing = false;

    // 선택한 댓글 내용 표시
    const commentContentElem = document.getElementById(`commentContent${commentId}`);
    commentContentElem.style.display = 'block';

    // 선택한 댓글 수정 폼 숨김
    const editForm = document.getElementById(`editCommentForm${commentId}`);
    editForm.style.display = 'none';

    // 수정, 삭제 버튼 표시
    document.getElementById(`editBtn${commentId}`).style.display = 'block';
    document.getElementById(`deleteCommentForm${commentId}`).style.display = 'block';
}

    // 파일 목록 토글 버튼의 DOM 요소 가져옴
    const toggleFileTrigger = document.getElementById("toggle-file-trigger");

    // 해당 버튼이 존재한다면 클릭 이벤트 리스너 추가
    if (toggleFileTrigger) {
        toggleFileTrigger.addEventListener("click", function() {
            const fileList = document.querySelector(".file-list");
            if (fileList.style.display === "none" || fileList.style.display === "") {
                fileList.style.display = "block";
            } else {
                fileList.style.display = "none";
            }
        });
    }