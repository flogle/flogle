<?php


    $query = urlencode($_GET["query"]);
    $resutls = urlencode($_GET["resutls"]);

    $url = "https://geocoding-api.open-meteo.com/v1/search?name=$query&language=en&count=$resutls&format=json";


    $ch = curl_init();

    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    $data = curl_exec($ch);

    curl_close($ch);

    echo $data;


?>