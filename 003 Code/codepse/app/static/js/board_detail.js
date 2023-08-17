let isEditing = false;

function showEditComment(commentId) {
    if (isEditing) {
        alert("수정 중인 댓글이 있습니다. 수정 혹은 취소를 해주세요.");
        return;
    }

    isEditing = true;

    const commentContentElem = document.getElementById(`commentContent${commentId}`);
    commentContentElem.style.display = 'none';

    const editForm = document.getElementById(`editCommentForm${commentId}`);
    editForm.style.display = 'block';

    document.getElementById(`editBtn${commentId}`).style.display = 'none';
    document.getElementById(`deleteCommentForm${commentId}`).style.display = 'none';
}

function hideEditComment(commentId) {
    isEditing = false;

    const commentContentElem = document.getElementById(`commentContent${commentId}`);
    commentContentElem.style.display = 'block';

    const editForm = document.getElementById(`editCommentForm${commentId}`);
    editForm.style.display = 'none';

    document.getElementById(`editBtn${commentId}`).style.display = 'block';
    document.getElementById(`deleteCommentForm${commentId}`).style.display = 'block';
}


    const toggleFileTrigger = document.getElementById("toggle-file-trigger");

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
