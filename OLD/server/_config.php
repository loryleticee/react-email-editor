<?php
/**
 * Email Builder
 * Config
 *
 * Product Homepage: http://getemailbuilder.com
 * Author: DigitalWheat
 * Author URI: http://digitalwheat.com
 *
 */


$protocol = 'https';

$host= $protocol . '://' . $_SERVER['SERVER_NAME'];

$CONFIG['uploads_folder'] = 'server/uploads';

$CONFIG['host'] = $host;
$CONFIG['smtp']['host'] = 'ssl0.ovh.net';
$CONFIG['smtp']['username'] = 'bat@newsagencesurf.com';
$CONFIG['smtp']['password'] = 'Surf2018!';
$CONFIG['smtp']['secure'] = '';
$CONFIG['smtp']['port'] = 587;
$CONFIG['smtp']['auth'] = true;

$CONFIG['mail']['subject'] = 'BAT';
$CONFIG['mail']['from_email'] = 'bat@newsagencesurf.com';
$CONFIG['mail']['from_name'] = 'BAT Surf';
$CONFIG['mail']['alt_body'] = 'The plain text for non-HTML mail clients';