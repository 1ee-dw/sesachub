/* 게시글 관련 */
// 게시글 수정 페이지로 이동
function editBoard(b_id) {
    axios({
        method: "GET",
        url: "/board/update",
        params: { b_id: b_id },
    }).then((res) => {
        location.href = `/board/update?b_id=${b_id}`;
    });
}
// 글 삭제
function deleteBoard(b_id) {
    if (confirm("글을 삭제하시겠습니까?")) {
        axios({
            method: "DELETE",
            url: "/board",
            params: { b_id: b_id },
        }).then(function (res) {
            location.href = "/board";
        });
    }
}
// 게시글 좋아요
async function like(b_id, u_id) {
    const response = await axios({
        method: "POST",
        url: "/board/like",
        data: { b_id: b_id, u_id: u_id },
    });
    document.getElementById("like_count").innerText = response.data.like_count;
}
// 게시글 북마크
async function bookmark(b_id, u_id) {
    const bookmark = document.getElementById("bookmark");
    const response = await axios({
        method: "POST",
        url: "/board/bookmark",
        data: {
            b_id: b_id,
            u_id: u_id,
        },
    });
    if (!response.data.result) {
        bookmark.innerHTML = "&#9733;";
    } else {
        bookmark.innerHTML = "&#9734;";
    }
}
/* 댓글 관련 */
// 댓글 작성
async function comment_insert() {
    const form = document.forms["comment"];
    await axios({
        method: "POST",
        url: "/board/comment",
        data: {
            b_id: form.b_id.value,
            u_id: form.u_id.value,
            nk_name: form.nk_name.value,
            content: form.comment_content.value,
        },
    });
    location.reload();
}
// 댓글, 답글 수정
// async function comment_update() {

// }
// 댓글, 답글 삭제
async function comment_delete(c_id) {
    if (confirm("댓글을 삭제하시겠습니까?")) {
        await axios({
            method: "DELETE",
            url: "/board/comment",
            params: {
                c_id: c_id,
            },
        });
    }
    location.reload();
}
// 답글 폼 호출
function call_reply_form(c_id) {
    const form = document.forms[`reply_form${c_id}`];
    form.style.display = "block";
    const btn = document.getElementById(`reply_btn${c_id}`);
    btn.setAttribute("type", "hidden");
}
// 답글 작성
async function reply_insert(c_id) {
    const form = document.forms[`reply_form${c_id}`];
    await axios({
        method: "POST",
        url: "/board/comment",
        data: {
            c_id: c_id,
            b_id: form.b_id.value,
            parent_id: form.parent_id.value,
            u_id: form.u_id.value,
            nk_name: form.nk_name.value,
            content: form.reply_content.value,
        },
    });
    location.reload();
}