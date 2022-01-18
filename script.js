$.datepicker.regional['ru'] = {
    closeText: 'Закрыть',
    prevText: 'Предыдущий',
    nextText: 'Следующий',
    currentText: 'Сегодня',
    monthNames: ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
    monthNamesShort: ['Янв','Фев','Мар','Апр','Май','Июн','Июл','Авг','Сен','Окт','Ноя','Дек'],
    dayNames: ['воскресенье','понедельник','вторник','среда','четверг','пятница','суббота'],
    dayNamesShort: ['вск','пнд','втр','срд','чтв','птн','сбт'],
    dayNamesMin: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
    weekHeader: 'Не',
    dateFormat: 'dd.mm.yy',
    firstDay: 1,
    isRTL: false,
    showMonthAfterYear: false,
    yearSuffix: ''
};

$.datepicker.setDefaults($.datepicker.regional['ru']);

$(function(){
    $("#date").datepicker();
});

function sumAddVisibility() {
    if (monthlyDepositReplenishment.checked == true) {
        sumDepositReplenishment.style.visibility = 'visible';
    }
    else {
        sumDepositReplenishment.value = 0;
        sumDepositReplenishment.style.visibility = 'hidden';
    }
}

jQuery.validator.addMethod(
    "dateFormat",
    function(value, element) {
        var check = false;
        var re = /^\d{1,2}\.\d{1,2}\.\d{4}$/;
        if( re.test(value)){
            var adata = value.split('.');
            var dd = parseInt(adata[0],10);
            var mm = parseInt(adata[1],10);
            var yyyy = parseInt(adata[2],10);
            var xdata = new Date(yyyy,mm-1,dd);
            if ( ( xdata.getFullYear() === yyyy ) && ( xdata.getMonth () === mm - 1 ) && ( xdata.getDate() === dd ) ) {
                check = true;
            }
            else {
                check = false;
            }
        } else {
            check = false;
        }
        return this.optional(element) || check;
    }
);

let dateIsValid;
let sumDepositIsValid;
let termIsValid;
let percentIsValid;
let sumDepositReplenishmentIsValid;
function startValidate() {
    $('#inputContainer').validate({
        rules: {
            date: {
                required: true,
                dateFormat: true
            },
            sumDeposit: {
                required: true,
                number: true,
                min: 999,
                max: 3000001
            },
            sumDepositReplenishment: {
                required: true,
                number: true,
                min: 0,
                max: 3000001
            },
            percent: {
                required: true,
                number: true,
                min: 3,
                max: 100
            },
            term: {
                required: true,
                number: true,
                min: 1,
                max: function() {
                    let isChangeYear = monthOrYear.options[monthOrYear.selectedIndex].value == "Год";
                    if (isChangeYear) {
                        return 5;
                    }
                    else
                    {
                        return 60;
                    }
                }
            }
        },
        messages: {
            date: {
                required: function() {dateError.style.visibility = 'visible'; dateError.innerHTML = 'это поле обязательно для заполнения'; date.style.borderColor = 'red';},
                dateFormat: function() {dateError.style.visibility = 'visible'; dateError.innerHTML = 'введите дату в формате dd.mm.yyyy'; date.style.borderColor = 'red';}
            },
            sumDeposit: {
                required: function() {sumDepositError.style.visibility = 'visible'; sumDepositError.innerHTML = 'это поле обязательно для заполнения'; sumDeposit.style.borderColor = 'red';},
                number: function() {sumDepositError.style.visibility = 'visible'; sumDepositError.innerHTML = 'Пожалуйста, введите число'; sumDeposit.style.borderColor = 'red';},
                min: function() {sumDepositError.style.visibility = 'visible'; sumDepositError.innerHTML = 'Минимум 1000 р.'; sumDeposit.style.borderColor = 'red';},
                max: function() {sumDepositError.style.visibility = 'visible'; sumDepositError.innerHTML = 'Максимум 3000000 р.'; sumDeposit.style.borderColor = 'red';}
            },
            sumDepositReplenishment: {
                required: function() {sumDepositReplenishmentError.style.visibility = 'visible'; sumDepositReplenishmentError.innerHTML = 'это поле обязательно для заполнения'; sumDepositReplenishment.style.borderColor = 'red';},
                number: function() {sumDepositReplenishmentError.style.visibility = 'visible'; sumDepositReplenishmentError.innerHTML = 'Пожалуйста, введите число'; sumDepositReplenishment.style.borderColor = 'red';},
                min: function() {sumDepositReplenishmentError.style.visibility = 'visible'; sumDepositReplenishmentError.innerHTML = 'Вклад не может идти в убыток'; sumDepositReplenishment.style.borderColor = 'red';},
                max: function() {sumDepositReplenishmentError.style.visibility = 'visible'; sumDepositReplenishmentError.innerHTML = 'Максимум 3000000 р.'; sumDepositReplenishment.style.borderColor = 'red';}
            },
            percent: {
                required: function() {percentError.style.visibility = 'visible'; percentError.innerHTML = 'это поле обязательно для заполнения'; percent.style.borderColor = 'red';},
                number: function() {percentError.style.visibility = 'visible'; percentError.innerHTML = 'Пожалуйста, введите число'; percent.style.borderColor = 'red';},
                min: function() {percentError.style.visibility = 'visible'; percentError.innerHTML = 'Не менее 3%'; percent.style.borderColor = 'red';},
                max: function() {percentError.style.visibility = 'visible'; percentError.innerHTML = 'Максимум 100%'; percent.style.borderColor = 'red';}
            },
            term: {
                required: function() {termError.style.visibility = 'visible'; termError.innerHTML = 'это поле обязательно для заполнения'; term.style.borderColor = 'red';
                monthOrYear.style.borderColor = 'red';},
                number: function() {termError.style.visibility = 'visible'; termError.innerHTML = 'Пожалуйста, введите число'; term.style.borderColor = 'red';
                monthOrYear.style.borderColor = 'red';},
                min: function() {
                    termError.style.visibility = 'visible';
                    let isChangeYear = monthOrYear.options[monthOrYear.selectedIndex].value == "Год";
                    if (isChangeYear) {
                        termError.innerHTML = 'Не менее 1 года'; term.style.borderColor = 'red';
                        monthOrYear.style.borderColor = 'red';
                    }
                    else
                    {
                        termError.innerHTML = 'Не менее 1 месяца'; term.style.borderColor = 'red';
                        monthOrYear.style.borderColor = 'red';
                    }
                },
                max: function() {
                    termError.style.visibility = 'visible';
                    let isChangeYear = monthOrYear.options[monthOrYear.selectedIndex].value == "Год";
                    if (isChangeYear) {
                        termError.innerHTML = 'Не более 5 лет'; term.style.borderColor = 'red';
                        monthOrYear.style.borderColor = 'red';
                    }
                    else
                    {
                        termError.innerHTML = 'Не более 60 месяцев'; term.style.borderColor = 'red';
                        monthOrYear.style.borderColor = 'red';
                    }
                }
            }
        }
    });
}

function correctInputStyle() {
    if ($('#inputContainer').valid())
    {
        dateError.style.visibility = 'hidden'; date.style.borderColor = 'black'; 
        sumDepositError.style.visibility = 'hidden'; sumDeposit.style.borderColor = 'black'; 
        sumDepositReplenishmentError.style.visibility = 'hidden'; sumDepositReplenishment.style.borderColor = 'black'; 
        percentError.style.visibility = 'hidden'; percent.style.borderColor = 'black'; 
        termError.style.visibility = 'hidden'; term.style.borderColor = 'black'; monthOrYear.style.borderColor = 'black';
    }  
}

$(document).ready(function() {

    let firstClick = false;
    $('input').on('input', function() {
        if(!firstClick)
        {
            startValidate();
            firstClick = true;
        }
        correctInputStyle();
    });

    $('input').on('change', function() {
        if(!firstClick)
        {
            startValidate();
            firstClick = true;
        }
        correctInputStyle();
    });


    $('#inputContainer').submit(function(){  
        
        if ($('#inputContainer').valid())
        {
            let sumAddValue;
            let termValue;
            let isChangeYear = monthOrYear.options[monthOrYear.selectedIndex].value == "Год";
            if (monthlyDepositReplenishment.checked == true)
            {
                sumAddValue = sumDepositReplenishment.value;
            }
            else
            {
                sumAddValue = 0;
            }
            if (isChangeYear) {
                termValue = term.value*12;
            }
            else
            {
                termValue = term.value;
            }
            let sendData = {
                startDate: date.value,
                sum: sumDeposit.value,
                term: termValue,
                percent: percent.value,
                sumAdd: sumAddValue
            }
          $.ajax({
              datatype: "json",
              type: "POST",
              url: 'calc.php',
              data: sendData,
              success: function ( data ) {
                  resultJSON = {
                      sum: data
                  }
                  $('#inputContainer').css('border-bottom', 'medium solid gray');
                  $('#bottomText').text('Сумма к выплате');
                  $('#resultText').text(String(data))
              }
          });
          return false;
        }
    });    
});
