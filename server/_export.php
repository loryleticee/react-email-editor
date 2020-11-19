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

if( isset($_POST['type']) ){
    $type = $_POST['type'];
    $emailName = $_POST['emailName'] ? $_POST['emailName']: "";
    switch($type){
        case 'html':
         //   header("Content-Disposition: attachment; filename=\"" . basename($File) . "\"");
        //    header("Content-Type: application/force-download");
          //  header("Content-Length: " . filesize($File));
         //   header("Connection: close");

           //header("Content-type: text/plain");
            if ($_POST['templateHTML'] !== "") {
                    header("Content-type: application/force-download");
                    header("Content-Disposition: attachment; filename=".$emailName.".html");
                    //header("Connection: close");
                    print $_POST['templateHTML'];
                    $_POST['templateHTML'] = [
                        "á"=>"&aacute;",
                     "Á"=>"&Aacute;",
                     "â"=>"&acirc;",
                     "Â"=>"&Acirc;",
                     "à"=>"&agrave;",
                     "À"=>"&Agrave;",
                     "å"=>"&aring;",
                     "Å"=>"&Aring;",
                     "ã"=>"&atilde;",
                     "Ã"=>"&Atilde;",
                     "ä"=>"&auml;",
                     "Ä"=>"&Auml;",
                     "æ"=>"&aelig;",
                     "Æ"=>"&AElig;",
                     "ç"=>"&ccedil;",
                     "Ç"=>"&Ccedil;",
                     "é"=>"&eacute;",
                     "É"=>"&Eacute;",
                     "ê"=>"&ecirc;",
                     "Ê"=>"&Ecirc;",
                     "è"=>"&egrave;",
                     "È"=>"&Egrave;",
                     "ë"=>"&euml;",
                     "Ë"=>"&Euml;",
                     "í"=>"&iacute;",
                     "Í"=>"&Iacute;",
                     "î"=>"&icirc;",
                     "Î"=>"&Icirc;",
                     "ì"=>"&igrave;",
                     "Ì"=>"&Igrave;",
                     "ï"=>"&iuml;",
                     "Ï"=>"&Iuml;",
                     "ñ"=>"&ntilde;",
                     "Ñ"=>"&Ntilde;",
                     "ó"=>"&oacute;",
                     "Ó"=>"&Oacute;",
                     "ô"=>"&ocirc;",
                     "Ô"=>"&Ocirc;",
                     "ò"=>"&ograve;",
                     "Ò"=>"&Ograve;",
                     "ø"=>"&oslash;",
                     "Ø"=>"&Oslash;",
                     "õ"=>"&otilde;",
                     "Õ"=>"&Otilde;",
                     "ö"=>"&ouml;",
                     "Ö"=>"&Ouml;",
                     "œ"=>"&oelig;",
                     "Œ"=>"&OElig;",
                     "š"=>"&scaron;",
                     "Š"=>"&Scaron;",
                     "ß"=>"&szlig;",
                     "ð"=>"&eth;",
                     "Ð"=>"&ETH;",
                     "þ"=>"&thorn;",
                     "Þ"=>"&THORN;",
                     "ú"=>"&uacute;",
                     "Ú"=>"&Uacute;",
                     "û"=>"&ucirc;",
                     "Û"=>"&Ucirc;",
                     "ù"=>"&ugrave;",
                     "Ù"=>"&Ugrave;",
                     "ü"=>"&uuml;",
                     "Ü"=>"&Uuml;",
                     "ý"=>"&yacute;",
                     "Ý"=>"&Yacute;",
                     "ÿ"=>"&yuml;",
                     "Ÿ"=>"&Yuml;",
                     ];
                     $_POST['templateHTML'] = str_replace(array_keys($replacements), $replacements, $_POST['templateHTML']);
            }
            else{ header('Location:/');}
            exit();
            break;
        case 'zip':
            // Prepare File
            $file = @tempnam("tmp", "zip");
            $zip = new ZipArchive();
            $zip->open($file, ZipArchive::OVERWRITE);

            // Stuff with content
            $templateHTML = $_POST['templateHTML'];
            $replacements = [
                "á"=>"&aacute;",
             "Á"=>"&Aacute;",
             "â"=>"&acirc;",
             "Â"=>"&Acirc;",
             "à"=>"&agrave;",
             "À"=>"&Agrave;",
             "å"=>"&aring;",
             "Å"=>"&Aring;",
             "ã"=>"&atilde;",
             "Ã"=>"&Atilde;",
             "ä"=>"&auml;",
             "Ä"=>"&Auml;",
             "æ"=>"&aelig;",
             "Æ"=>"&AElig;",
             "ç"=>"&ccedil;",
             "Ç"=>"&Ccedil;",
             "é"=>"&eacute;",
             "É"=>"&Eacute;",
             "ê"=>"&ecirc;",
             "Ê"=>"&Ecirc;",
             "è"=>"&egrave;",
             "È"=>"&Egrave;",
             "ë"=>"&euml;",
             "Ë"=>"&Euml;",
             "í"=>"&iacute;",
             "Í"=>"&Iacute;",
             "î"=>"&icirc;",
             "Î"=>"&Icirc;",
             "ì"=>"&igrave;",
             "Ì"=>"&Igrave;",
             "ï"=>"&iuml;",
             "Ï"=>"&Iuml;",
             "ñ"=>"&ntilde;",
             "Ñ"=>"&Ntilde;",
             "ó"=>"&oacute;",
             "Ó"=>"&Oacute;",
             "ô"=>"&ocirc;",
             "Ô"=>"&Ocirc;",
             "ò"=>"&ograve;",
             "Ò"=>"&Ograve;",
             "ø"=>"&oslash;",
             "Ø"=>"&Oslash;",
             "õ"=>"&otilde;",
             "Õ"=>"&Otilde;",
             "ö"=>"&ouml;",
             "Ö"=>"&Ouml;",
             "œ"=>"&oelig;",
             "Œ"=>"&OElig;",
             "š"=>"&scaron;",
             "Š"=>"&Scaron;",
             "ß"=>"&szlig;",
             "ð"=>"&eth;",
             "Ð"=>"&ETH;",
             "þ"=>"&thorn;",
             "Þ"=>"&THORN;",
             "ú"=>"&uacute;",
             "Ú"=>"&Uacute;",
             "û"=>"&ucirc;",
             "Û"=>"&Ucirc;",
             "ù"=>"&ugrave;",
             "Ù"=>"&Ugrave;",
             "ü"=>"&uuml;",
             "Ü"=>"&Uuml;",
             "ý"=>"&yacute;",
             "Ý"=>"&Yacute;",
             "ÿ"=>"&yuml;",
             "Ÿ"=>"&Yuml;",
             ];
            $templateHTML = str_replace(array_keys($replacements), $replacements, $templateHTML);
            $usedImages = array();
            // Get used images
            preg_match_all('#([^/]+)\.jpg|jpeg|png|gif#i', $templateHTML, $usedImages );
            // Remove repeated images
            $usedImages = array_unique($usedImages[0]);
            // Transform list of used images into string
            $usedImages = implode(',', $usedImages);
            $newImgBase = 'img';
            // Change absolute image paths to relative across all img tags
            $templateHTML = preg_replace('#(<img.*src=")[^"]+(\/(.*)">)#i', "$1{$newImgBase}$2", $templateHTML);
            // Change absolute image paths to relative across all background images
            $templateHTML = preg_replace('#(<.*background=")[^"]+(\/(.*)">)#i', "$1{$newImgBase}$2", $templateHTML);
            $templateHTML = preg_replace('#(<.*style=".*url\("|\'|\&quot;)[^"]+(\/(.*)\).*"|\'|\&quot;>)#i', "$1{$newImgBase}$2", $templateHTML);
          //  echo $templateHTML;die();
            $zip->addFromString('index.html', $templateHTML);
         //   $zip->addFile('file_on_server.ext', 'second_file_name_within_archive.ext');
            $options = array('add_path' => 'img/', 'remove_all_path' => TRUE);
           // $zip->addGlob('uploads/*.{jpg,jpeg,gif,png}', GLOB_BRACE, $options);
            // Add used images only
            $zip->addGlob( '../server/uploads/{' . $usedImages . '}', GLOB_BRACE, $options);

            $options = array('add_path' => 'img/', 'remove_all_path' => TRUE);
            $zip->addGlob('../templates/default/img/{'. $usedImages .'}', GLOB_BRACE, $options);

            // Close and send to users
            $zip->close();
            header('Content-Type: application/zip');
            header('Content-Length: ' . filesize($file));
            header('Content-Disposition: attachment; filename="'.$emailName.'.zip"');
            readfile($file);
            unlink($file);
            exit();
            break;
        case 'save':
            $title = $emailName === "" ? 'undefined'.date('Y-m-d') : strtolower($emailName);
            
            $dir = "../templates/saved";

            $content_to_write = $_POST['templateHTML'];
            
            if( is_dir($dir) === false ) {
                mkdir($dir);
            }

            $file = fopen($dir . '/' . $title.".html","w");
            fwrite($file, $content_to_write);
            fclose($file);
            header('Location:/');
            exit();
            break;
    }
}