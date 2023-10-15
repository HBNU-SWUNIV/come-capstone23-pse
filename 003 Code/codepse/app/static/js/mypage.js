document.addEventListener('DOMContentLoaded', function() {

    function setupPagination(sectionSelector, buttonSelector) {
        let rows = document.querySelectorAll(sectionSelector + " tbody tr");
        let btnToggle = document.querySelector(buttonSelector);
        
        // 5개 이하라면 뜨지 않도록
        if (rows.length <= 5) {
            btnToggle.style.display = "none"; 
            return; 
        }
        
        let btnCollapse = document.createElement('button');
        btnCollapse.textContent = "접기";
        btnCollapse.style.display = "none"; 
        btnToggle.parentNode.insertBefore(btnCollapse, btnToggle.nextSibling);
    
        let maxVisibleRows = 5;
        let currentlyVisible = maxVisibleRows;

        // 초기 상태 설정
        for (let i = 0; i < rows.length; i++) {
            if (i >= maxVisibleRows) {
                rows[i].style.display = "none";
            }
        }

        // 더보기 버튼 클릭 이벤트
        btnToggle.addEventListener("click", function() {
            let targetVisible = currentlyVisible + maxVisibleRows;

            for (let i = currentlyVisible; i < targetVisible && i < rows.length; i++) {
                rows[i].style.display = "";
                currentlyVisible++;
            }
            
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

    setupPagination(".user-comments", "#toggleComments");
    setupPagination(".user-posts", "#togglePosts");
    setupPagination(".user-codes", "#toggleCodes");
});
