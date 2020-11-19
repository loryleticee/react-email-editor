<?php
/**
 * JS Email Builder
 * Export Template
 *
 * Product Homepage: http://getemailbuilder.com
 * Author: DigitalWheat
 * Author URI: http://digitalwheat.com
 * Version: 1.0.0
 *
 */
 
 
// Include config
require_once '_config.php';
$dir = '../templates/saved';
$files = scandir($dir);
$datas = [];
foreach ($files as $key =>$file) {
    if($key === 0 || $key === 1){continue;}

    $name = explode('.', $file);
    if(isset($name[1]) && $name[1] === 'html') {
        array_push($datas, [$name[0], $name[0]]);
    }
}
echo json_encode($datas);