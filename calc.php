<?php 
$startDate = $_POST['startDate'];
$sum = $_POST['sum'];
$term = $_POST['term'];
$percent = $_POST['percent'];
$sumAdd = $_POST['sumAdd'];
list($day, $month, $year) = explode('.', $startDate);

$dateIsCorrect = preg_match('/[0-9]{1,2}\.[0-9]{1,2}\.[0-9]{1,4}/', $startDate) && strlen($startDate) == 10;

if ($dateIsCorrect) {
    $dateIsValid = checkdate($month, $day, $year);
}
else
{
    $dateIsValid = false;
}
$sumIsValid = ($sum >= 1000 && $sum <= 3000000);
$termIsValid = ($term >= 1 && $term <= 60);
$sumAddIsValid = ($sumAdd >= 0 && $sumAdd <= 3000000);
$percentIsValid = ($percent >= 3 && $percent <= 100);

if ($dateIsValid && $sumIsValid && $termIsValid && $sumAddIsValid && $percentIsValid)
{
    Main();
}
else {
    echo 'Введены некорректные данные';
}

function Main()
{
    global $startDate;
    global $sum;
    global $term;
    global $percent;
    global $sumAdd;

    $startDateOfMonth = new DateTime($startDate);
    $finishDateOfMonth = clone $startDateOfMonth;
    $finishDateOfMonth->add(new DateInterval('P1M'));
    $sumOfPrevMonth = $sum;
    $countDayForDepositInMonth = 0;
    $countDayInYear = 0;
    
    $finishDateInNextYear = $startDateOfMonth->format('o') < $finishDateOfMonth->format('o');
    for ($i = 1; $i<=$term; $i++)
    {
        if ($finishDateInNextYear) {
            echo $i.'<br>';
            $finishDateOfMonth = new DateTime($startDateOfMonth->format('Ymt'));
            $sumOfPrevMonth = getFinalSum($startDateOfMonth, $finishDateOfMonth, $sumOfPrevMonth, $sumAdd, $percent);
            $finishDateOfMonth = clone $startDateOfMonth;
            $finishDateOfMonth->add(new DateInterval('P1M'));
            $startDateOfMonth = new DateTime($finishDateOfMonth->format('o').'-01-01');
            $sumOfPrevMonth = getFinalSum($startDateOfMonth, $finishDateOfMonth, $sumOfPrevMonth, $sumAdd, $percent);
            $startDateOfMonth = clone $finishDateOfMonth;
            $finishDateOfMonth->add(new DateInterval('P1M'));
        }
        else {
            $sumOfPrevMonth = getFinalSum($startDateOfMonth, $finishDateOfMonth, $sumOfPrevMonth, $sumAdd, $percent);
            $startDateOfMonth->add(new DateInterval('P1M'));
            $finishDateOfMonth->add(new DateInterval('P1M'));    
        }
    }
    $finalSum = $sumOfPrevMonth;
    echo '₽ '.intval($finalSum);
}


function getFinalSum($startDateOfMonth, $finishDateOfMonth, $sumOfPrevMonth, $sumAdd, $percent){
    $countDayForDepositInMonth = $startDateOfMonth->diff($finishDateOfMonth)->format('%a');
    $countDayInYear = date('L', mktime(0, 0, 0, 1, 1, $startDateOfMonth->format('o')))?366:365;
    $sumOfCurrentMonth = $sumOfPrevMonth + ($sumOfPrevMonth + $sumAdd) * $countDayForDepositInMonth * ($percent / $countDayInYear);
    return $sumOfCurrentMonth;
}
?>

