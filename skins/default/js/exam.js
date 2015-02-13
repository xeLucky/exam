jQuery(function($) {
    // 카테고리 박스에서 하위분류가 없을대 처리
    if($('.exam_top_category').length) {
        var $category = $('.exam_top_category');
        if(!$category.find('> ul > li.on > ul').length) {
            $category.removeClass('sub_type');
        }
    }
    // 객관식 문제에서 답 클릭시 입력과함께 표시
    $('.qanswer_list a.ans_check').click(function(event) {
        event.preventDefault();
        var chk_val = $(this).attr('data-value').split(',');

        var $answer = $('#answer'+chk_val[0]);
        if($answer.length < 1) return;

        $answer.val(chk_val[1]);
        $answer.parent().find('.marking').remove();
        $answer.parent().find('li').eq(chk_val[1]-1).append('<div class="marking"></div>');
    });
});


