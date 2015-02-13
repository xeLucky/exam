// form data 정리
function serializeFormData(form) {
    var data = jQuery(form).serializeArray();
    var serialized = {};
    for (var key in data) {
        serialized[data[key].name] = data[key].value;
    }
    return serialized;
}
// 룰셋 처리 후 Ajax 요청
function procRuleset(form, callback) {
    var ruleset_name = form.ruleset.value;
    var args = [];
    args[0] = ruleset_name;
    args[1] = function(f) {     
        var params = serializeFormData(form);
        exec_json(form.module.value + '.' +  form.act.value, params, callback);
    };
    var v = xe.getApp('Validator')[0];
    v.cast('ADD_CALLBACK', args);
    v.cast('VALIDATE', [form, ruleset_name]);
    return false;
}
function completeInsertQuestion(ret_obj) {
    alert(ret_obj['message']);
    location.reload();
}

jQuery(function($) {
    $('a.question_insert').click(function(event) {
        event.preventDefault();
        var document_srl = $(this).attr('data-value');
        if(!document_srl) return;

        var params = new Array();
        params['mid'] = current_mid ;
        params['document_srl'] = document_srl;
        exec_xml('exam','getQuestionInsertForm',params, function(ret_obj) {
            $('.exam_form').remove();
            $(ret_obj['html']).appendTo('body').modal({'zIndex' : 100});
        }, ['error','message','html']);
    });
    $('a.question_edit').click(function(event) {
        event.preventDefault();
        var val = $(this).attr('data-value').split('|');
        var document_srl = val[0];
        var question_srl = val[1];
        if(!document_srl || !question_srl) return;

        var params = new Array();
        params['mid'] = current_mid ;
        params['document_srl'] = document_srl;
        params['question_srl'] = question_srl;
        exec_xml('exam','getQuestionInsertForm',params, function(ret_obj) {
            $('.exam_form').remove();
            $(ret_obj['html']).appendTo('body').modal({'zIndex' : 100});
        }, ['error','message','html']);
    });
    $('a.question_delete').click(function(event) {
        event.preventDefault();
        var val = $(this).attr('data-value').split('|');
        var document_srl = val[0];
        var question_srl = val[1];
        if(!document_srl || !question_srl) return;
        if(!confirm('이 문제를 삭제하시겠습니까?')) return;

        var params = new Array();
        params['mid'] = current_mid ;
        params['document_srl'] = document_srl;
        params['question_srl'] = question_srl;
        exec_xml('exam','procExamQuestionDelete',params, function(ret_obj) {
            alert(ret_obj['message']);
            location.reload();
        });
    });
    $(document).on('change', 'input[name=q_type]', function(e){
        var i =0;
        for(i=0;i<2;i++) {
            if(i==$(this).val()) $('#answer_type'+$(this).val()).show();
            else $('#answer_type'+i).hide();
        }
   });
	$(document).on('click', '#use_description', function(e){
        if($(this).is(":checked")) {
            $('#description_box').show();
        } else {
            $('#description_box').hide();
        }
   });
	$(document).on('click', 'a.answer_marking', function(e){
        $('a.answer_marking').removeClass('on');
        $(this).addClass('on');
        $('#q_answer').val($(this).attr('data-value'));
   });
});
