const commentForm = document.querySelector('.comment-form');
const commentListWrapper = document.querySelector('.comment-list-wrapper');

    commentForm.addEventListener('submit', function (event) {
        event.preventDefault(); // 페이지 이동 막음

        // 댓글 내용 가져오기
        const commentText = commentForm.querySelector('textarea').value;

        // 현재 날짜 생성
        const currentDate = new Date();
        const formattedDate = `${currentDate.getFullYear()}.${currentDate.getMonth() + 1}.${currentDate.getDate()}`;

        // 댓글 생성
        const newComment = document.createElement('div');
        newComment.classList.add('comment');
        newComment.innerHTML = `
            <div class="comment-info-wrapper">
                <p class="comment-info">작성자: 사용자 | 날짜: ${formattedDate}</p>
            </div>
            <div class="comment-content-wrapper">
                <p class="comment-content">${commentText}</p>
                <div class="buttons-wrapper">
                    <button class="edit-btn">수정</button>
                    <button class="delete-btn">삭제</button>
                </div>
            </div>
        `;

        // 댓글 목록에 댓글 추가
        commentListWrapper.appendChild(newComment);

        // 댓글작성폼 내용 지움
        commentForm.querySelector('textarea').value = '';
    });

    // 댓글 수정 기능
    commentListWrapper.addEventListener('click', function (event) {
        const target = event.target;
        if (target.classList.contains('edit-btn')) {
            const comment = target.closest('.comment');
            const commentContent = comment.querySelector('.comment-content');
            const originalContent = commentContent.textContent; // 사용자가 수정을 취소할 때 원래 댓글의 내용을 복구하기 위해 사용
            const commentText = commentContent.textContent; // 수정 폼의 텍스트 영역에 원래 내용을 초기화하기 위해 사용

            // 작성자와 날짜 가져오기
            const commentInfo = comment.querySelector('.comment-info').textContent;
            const datePattern = /날짜: (\d{4}\.\d{1,2}\.\d{1,2})/; // 날짜 정보를 추출하는 정규표현식

            // 현재 날짜 추출
            let currentDateString = datePattern.exec(commentInfo)[1];

            // 수정 입력 폼 생성
            const editForm = document.createElement('form');
            editForm.classList.add('edit-form');
            editForm.innerHTML = `
                <p class="comment-info">${commentInfo}</p>
                <textarea name="edit-comment">${commentText}</textarea>
                <button type="submit">완료</button>
                <button type="button" class="cancel-btn">취소</button>
            `;

            // 기존 내용 감추기 및 버튼 숨기기
            commentContent.style.display = 'none';
            comment.querySelector('.buttons-wrapper').style.display = 'none';

            // 수정 폼 삽입
            comment.insertBefore(editForm, comment.querySelector('.comment-info-wrapper'));

            // 작성자와 날짜가 위에 나타나도록 수정
            comment.querySelector('.comment-info-wrapper').style.display = 'none';

            // 수정 완료 버튼 클릭 시
            editForm.addEventListener('submit', function (event) {
                event.preventDefault();

                // 새로운 내용으로 댓글 수정
                const newContent = editForm.querySelector('textarea').value;
                commentContent.textContent = newContent;

                // 수정 입력 폼 제거 및 기존 내용/버튼 보이게
                commentContent.style.display = 'block';
                comment.querySelector('.buttons-wrapper').style.display = 'block';
                comment.querySelector('.comment-info-wrapper').style.display = 'flex';

                comment.removeChild(editForm);
            });

            // 취소 버튼 클릭 시
            const cancelBtn = editForm.querySelector('.cancel-btn');
            cancelBtn.addEventListener('click', function () {
                // 수정 취소하고 원래 내용으로 복구
                commentContent.textContent = originalContent;

                // 수정 입력 폼 제거 및 기존 내용/버튼 보이게
                commentContent.style.display = 'block';
                comment.querySelector('.buttons-wrapper').style.display = 'block';
                comment.querySelector('.comment-info-wrapper').style.display = 'flex';

                comment.removeChild(editForm);
            });
        }
        
    });
    
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

    document.addEventListener('DOMContentLoaded', () => {
        // Edit comment functionality
        const editButtons = document.querySelectorAll('.edit-btn');
        editButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
    
                const commentId = e.target.getAttribute('data-id');
                const commentDiv = e.target.closest('.comment');
                const contentDiv = commentDiv.querySelector('.comment-content-wrapper');
                const contentText = contentDiv.querySelector('.comment-content').textContent;
                
                // Replace the content div with a form
                contentDiv.innerHTML = `
                    <form action="/edit_comment/${commentId}" method="POST" class="edit-comment-form">
                        <textarea name="new_content">${contentText}</textarea>
                        <input type="submit" value="수정">
                        <button class="cancel-edit-btn">취소</button>
                    </form>
                `;
    
                // Cancel button functionality
                const cancelBtn = contentDiv.querySelector('.cancel-edit-btn');
                cancelBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    contentDiv.innerHTML = `
                        <p class="comment-content">${contentText}</p>
                        <div class="buttons-wrapper">
                            <button data-id="${commentId}" class="edit-btn">수정</button>
                            <button data-id="${commentId}" class="delete-btn">삭제</button>
                        </div>
                    `;
                });
    
                // Handle form submission
                const form = contentDiv.querySelector('.edit-comment-form');
                form.addEventListener('submit', async (e) => {
                    e.preventDefault();
    
                    const newContent = form.querySelector('textarea').value;
    
                    try {
                        const response = await fetch(form.action, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded',
                            },
                            body: new URLSearchParams({
                                'new_content': newContent,
                            }),
                        });
    
                        if (response.status === 200) {
                            contentDiv.innerHTML = `
                                <p class="comment-content">${newContent}</p>
                                <div class="buttons-wrapper">
                                    <button data-id="${commentId}" class="edit-btn">수정</button>
                                    <button data-id="${commentId}" class="delete-btn">삭제</button>
                                </div>
                            `;
                        } else {
                            console.error('Failed to edit comment.');
                        }
                    } catch (error) {
                        console.error('There was an error editing the comment:', error);
                    }
                });
            });
        });
    
        // Delete comment functionality
        const deleteButtons = document.querySelectorAll('.delete-btn');
        deleteButtons.forEach(button => {
            button.addEventListener('click', async (e) => {
                e.preventDefault();
    
                const commentId = e.target.getAttribute('data-id');
                const commentDiv = e.target.closest('.comment');
    
                try {
                    const response = await fetch(`/delete_comment/${commentId}`, {
                        method: 'POST',
                    });
    
                    if (response.status === 200) {
                        commentDiv.remove();
                    } else {
                        console.error('Failed to delete comment.');
                    }
                } catch (error) {
                    console.error('There was an error deleting the comment:', error);
                }
            });
        });
    });

    