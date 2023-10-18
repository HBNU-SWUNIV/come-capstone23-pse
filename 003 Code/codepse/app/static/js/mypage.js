document.addEventListener('DOMContentLoaded', function() {

    // 테이블에 페이징 설정 함수 (더보기, 접기)
    function setupPagination(sectionSelector, buttonSelector) {
        let rows = document.querySelectorAll(sectionSelector + " tbody tr"); // 테이블 모든 행 선택
        let btnToggle = document.querySelector(buttonSelector); // 더보기 버튼 선택
        
        // 테이블 행 수가 5개 이하면 더보기 버튼 숨김
        if (rows.length <= 5) {
            btnToggle.style.display = "none"; 
            return; 
        }
        
        // 접기 버튼 생성
        let btnCollapse = document.createElement('button');
        btnCollapse.textContent = "접기";
        btnCollapse.style.display = "none"; 
        btnToggle.parentNode.insertBefore(btnCollapse, btnToggle.nextSibling); // 더보기 버튼 옆에 추가
    
        let maxVisibleRows = 5; // 한번에 표시될 최대 행 수
        let currentlyVisible = maxVisibleRows; // 현재 표시된 행 수

        // 초기 상태에서 행 숨기기 설정
        for (let i = 0; i < rows.length; i++) {
            if (i >= maxVisibleRows) {
                rows[i].style.display = "none";
            }
        }

        // 더보기 버튼 클릭 이벤트
        btnToggle.addEventListener("click", function() {
            let targetVisible = currentlyVisible + maxVisibleRows;

            // 숨겨진 행들을 최대 표시 가능한 수만큼 표시
            for (let i = currentlyVisible; i < targetVisible && i < rows.length; i++) {
                rows[i].style.display = "";
                currentlyVisible++;
            }
            
            // 모든 행이 표시되면 더보기 버튼 숨김
            if (currentlyVisible === rows.length) {
                btnToggle.style.display = "none";
            }
            
            btnCollapse.style.display = "";
        });

        // 접기 버튼 클릭 이벤트
        btnCollapse.addEventListener("click", function() {
            for (let i = currentlyVisible - 1; i >= maxVisibleRows; i--) {
                rows[i].style.display = "none";
            }
            currentlyVisible = maxVisibleRows;

            btnToggle.style.display = "";
            btnCollapse.style.display = "none";
        });
    }

    // 각 섹션에 페이징 기능 적용
    setupPagination(".user-comments", "#toggleComments");
    setupPagination(".user-posts", "#togglePosts");
    setupPagination(".user-codes", "#toggleCodes");
});
