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
$content = '';
if(isset($_POST['name'])) {
    $file = '../templates/saved/'.$_POST['name'].'.html';
    $templateFile = '../templates/default/template.json';

    if (file_exists($file) && file_exists($templateFile)) {
        //File html with name passed in params POST
        $content = file_get_contents($file);
        //Templates modules file
        $jsondata = file_get_contents($templateFile);

        // converts json data into array
        $arr_data = json_decode($jsondata , true);
        // Get Modules object
        $arr_data_modules = $arr_data['modules'];

        $formdata = array(
            'uid'=> $_POST['name'],
            'thumb'=> 'thumbnails/email.jpg',
            'title'=> $_POST['name'].'_content',
            'html'=>  $content,
        );

	   // Push user data to array
       array_push($arr_data_modules, $formdata);
       
       //Convert updated array to JSON
	   $jsondata = json_encode($arr_data_modules, JSON_PRETTY_PRINT);
	   $data = '{
        "template": "Default",
        "template_uri": "",
        "author": "",
        "author_uri": "",
        "version": "1.0.0",
        "default": "",
        "fonts": [
          "https://fonts.googleapis.com/css?family=Open+Sans:400,600",
          "https://fonts.googleapis.com/css?family=Lato:400,700,900"
        ],
        "header": "<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\">\n<html xmlns=\"http://www.w3.org/1999/xhtml\">\n<head>\n\n\t<meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\" />\n\t<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\" />\n\t<meta name=\"viewport\" content=\"width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1\" />\n\t<title>Email Template</title>\n\t<style type=\"text/css\">\n\n\t@import url(https://fonts.googleapis.com/css?family=Open+Sans:400,600);\n\t@import url(https://fonts.googleapis.com/css?family=Lato:400,700,900);\n\n\t.ReadMsgBody { width: 100%; background-color: #ffffff; }\n    .ExternalClass { width: 100%; background-color: #ffffff; }\n    .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div { line-height: 100%; }\n\thtml { width: 100%; }\n\tbody { -webkit-text-size-adjust: none; -ms-text-size-adjust: none; margin: 0; padding: 0; }\n\ttable { border-spacing: 0; border-collapse: collapse; }\n\ttable td { border-collapse: collapse; }\n\t.yshortcuts a { border-bottom: none !important; }\n\timg { display: block !important; }\n\ta { text-decoration: none; color: #a0cf50; }\n\n\t/* Media Queries */\n\n\t@media only screen and (max-width: 640px) {\n\t\tbody { width: auto !important; }\n\t\ttable[class=\"table600\"] { width: 450px !important; }\n\t\ttable[class=\"table-container\"] { width: 90% !important; }\n\t\ttable[class=\"container2-2\"] { width: 47% !important; text-align: left !important; }\n\t\ttable[class=\"full-width\"] { width: 100% !important; text-align: center !important; }\n\t\timg[class=\"img-full\"] { width: 100% !important; height: auto !important; }\n}\n\n\t@media only screen and (max-width: 479px) {\n\t\tbody { width: auto !important; }\n\t\ttable[class=\"table600\"] { width: 290px !important; }\n\t\ttable[class=\"table-container\"] { width: 82% !important; }\n\t\ttable[class=\"container2-2\"] { width: 100% !important; text-align: left !important; }\n\t\ttable[class=\"full-width\"] { width: 100% !important; text-align: center !important; }\n\t\timg[class=\"img-full\"] { width: 100% !important; }\n}\n\n\t</style>\n\n</head>\n\n<body marginwidth=\"0\" marginheight=\"0\" style=\"margin-top: 0; margin-bottom: 0; padding-top: 0; padding-bottom: 0; width: 100%; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;\" offset=\"0\" topmargin=\"0\" leftmargin=\"0\">\n",
        "footer": "</body>\n</html>",'.'"modules":'.$jsondata.'}';

	   //write json data into data.json file
	   if(file_put_contents($templateFile, $data)) {
            echo json_encode($content);
        }

        $renewJsondata = json_encode($arr_data, JSON_PRETTY_PRINT);
        file_put_contents($templateFile, $renewJsondata);
    }
}



