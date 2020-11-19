/******/ (function (modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if (installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
      /******/
};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
    /******/
}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function (value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function (exports, name, getter) {
/******/ 		if (!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
  /******/
});
      /******/
}
    /******/
};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function (module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
    /******/
};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function (object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 40);
  /******/
})
/************************************************************************/
/******/({

/***/ 12:
/***/ (function (module, exports, __webpack_require__) {

      "use strict";


      var emitter = window.top.jsEmailBuilderEmitter;

      const myHeaders = new Headers();

      const hiddenThumb = 'email.jpg';

      const myInit = {
        method: 'GET',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default'
      };

      // var IsActiveSelectTemplate = false;

      function dialogSendTestEmail() {
        $('#email-template').remove()
        swal({
          title: "Envoyer l\'email",
          text: "Entrez une adresse de destination:",
          type: "input",
          showCancelButton: true,
          closeOnConfirm: false,
          animation: "slide-from-top",
          inputPlaceholder: "john@example.com",
          showLoaderOnConfirm: true
        }, function (inputValue) {
          if (inputValue === false) return false;

          if (inputValue === "") {
            swal.showInputError("S\'il vous plait, Entrez une adresse de destination.");
            return false;
          }

          var templateHTML = $('#templateHTML').val();

          var data = {};
          data.action = 'send-test-emails';
          data.emails = inputValue;
          data.templateHTML = templateHTML; // Base64 Encode

          $.ajax({
            url: config.send_script,
            type: 'POST',
            dataType: 'json',
            data: data,
            success: function success(data) {
              if (data['type'] == 'success') {
                // show error message
                swal("Super!", "l\'Email a été envoyé à : " + inputValue, "success");
              } else {
                swal("Oops!", "Une erreur est survenue", "error");
              }
            },
            error: function error(xhr, err) {
              // Log errors if AJAX call is failed
              console.log(xhr);
              console.log(err);
            }
          });
          return false;
        });
      };

      function dialogLoadTestEmail() {
        $('#email-template').remove()

        $.ajax({
          url: config.templates,
          type: 'GET',
          dataType: 'json',
          success: function success(templates) {
            if (templates === false) return false;

            if (templates.lenght < 1) {
              swal.showInputError("Une erreur est survenu lors du téléchargement de cet email.");
              return false;
            }

            var select = document.createElement('select');
            select.setAttribute('id', 'email-template');

            templates.map((value, key) => {
              var option = document.createElement('option');
              option.text = value[1];
              option.setAttribute('value', value[0]);

              select.appendChild(option);
            });


            swal({
              title: "Selectionnez un Email",
              showCancelButton: true,
              confirmButtonText: `Import`,
            }, function () {
              let templateName = $('#email-template').val();

              if (templateName === false) return false;

              if (templateName === "") {
                swal.showInputError("S\'il vous plait, entrez un titre pour cet Email");
                return false;
              }
              var data = {};
              data.name = templateName;

              $.ajax({
                url: config.upload_script,
                type: 'POST',
                dataType: 'json',
                data: data,
                success: function success(data) {
                  if (data === false || data === "" || data === undefined) return false;
                  $('.editor.ui-sortable').html(data);
                },
                error: function error(xhr, err) {
                  // Log errors if AJAX call is failed
                  console.log(xhr);
                  console.log(err);
                }
              });
              return false;
            });

            $('.sweet-alert fieldset').append(select);

          },
          error: function error(xhr, err) {
            // Log errors if AJAX call is failed
            console.log(xhr);
            console.log(err);
          }

        });
      };

      function dialogExportHTML() {
        $('#email-template').remove();
        if (getMemoriseEmailName() !== false) {
          swal({
            title: "Exporter en fichier HTML",
            text: "Exporter cet Email en un fichier HTML",
            type: "input",
            showCancelButton: true,
            showLoaderOnConfirm: true,
            inputPlaceholder: "agencesurf-campagne",
            inputValue: getMemoriseEmailName(),
            animation: "slide-from-top",
            closeOnConfirm: false,
          }, function (inputValue) {
            if (inputValue === false) return false;
            if (inputValue === "") {
              swal.showInputError('S\'il vous plait, nommez cet Email.');
              return false;
            } else {
              setTimeout(function () {
                setMemoriseEmailName(inputValue);

                swal("L\'Email est sur le point d\'être exporté...");
                $('#export-form [name="type"]').val('html');
                $('#export-form').append('<input type="hidden" name="emailName" value="' + inputValue + '" />');
                $('#export-form').submit();
              }, 1000)
            };
          });
        } else {
          swal({
            title: "Exporter en fichier HTML",
            text: "Exporter cet Email en un fichier HTML",
            type: "input",
            showCancelButton: true,
            showLoaderOnConfirm: true,
            inputPlaceholder: "agencesurf-campagne",
            animation: "slide-from-top",
            closeOnConfirm: false,
          }, function (inputValue) {
            if (inputValue === false) return false;
            if (inputValue === "") {
              swal.showInputError('S\'il vous plait, nommez cet Email.');
              return false;
            } else {
              setTimeout(function () {
                setMemoriseEmailName(inputValue);

                swal("L\'Email est sur le point d\'être exporté...");
                $('#export-form [name="type"]').val('html');
                $('#export-form').append('<input type="hidden" name="emailName" value="' + inputValue + '" />');
                $('#export-form').submit();
              }, 1000)
            };
          });
        }
      };

      function dialogExportZip() {
        $('#email-template').remove();
        if (getMemoriseEmailName() !== false) {
          swal({
            title: "Exporter en fichier ZIP",
            text: "Exporter cet Email en dossier d'archive zip",
            type: "input",
            closeOnConfirm: false,
            animation: "slide-from-top",
            inputPlaceholder: "agencesurf-campagne",
            inputValue: getMemoriseEmailName(),
            showCancelButton: true,
            showLoaderOnConfirm: true
          }, function (inputValue) {
            if (inputValue === false) return false;

            if (inputValue === "") {
              swal.showInputError('S\'il vous plait, nommez cet Email.');
              return false;
            } else {
              setMemoriseEmailName(inputValue);

              setTimeout(function () {
                swal("L\'email est sur le point dêtre exporté...");
                $('#export-form [name="type"]').val('zip');
                $('#export-form').append('<input type="hidden" name="emailName" value="' + inputValue + '" />');
                $('#export-form').submit();
              }, 1000)

            };
          });
        } else {
          swal({
            title: "Exporter en fichier ZIP",
            text: "Exporter cet Email en dossier d'archive zip",
            type: "input",
            closeOnConfirm: false,
            animation: "slide-from-top",
            inputPlaceholder: "agencesurf-campagne",
            showCancelButton: true,
            showLoaderOnConfirm: true
          }, function (inputValue) {
            if (inputValue === false) return false;

            if (inputValue === "") {
              swal.showInputError('S\'il vous plait, nommez cet Email.');
              return false;
            } else {
              setMemoriseEmailName(inputValue);

              setTimeout(function () {
                swal("L\'email est sur le point dêtre exporté...");
                $('#export-form [name="type"]').val('zip');
                $('#export-form').append('<input type="hidden" name="emailName" value="' + inputValue + '" />');
                $('#export-form').submit();
              }, 1000)

            };
          });

        }
      };

      function dialogExportSave() {
        $('#email-template').remove();

        //PLace les commentaire qui permettrons de délimiter la zone HTML à couper 
        _comment()
        if (getMemoriseEmailName() !== false) {
          swal({
            title: "Sauvegarder",
            text: "Entrez un titre pour l\'Email",
            type: "input",
            showCancelButton: true,
            closeOnConfirm: false,
            animation: "slide-from-top",
            inputValue: getMemoriseEmailName(),
            inputPlaceholder: "agencdesurf-campagne",
            showLoaderOnConfirm: true
          }, function (inputValue) {
            if (inputValue === false) return false;

            if (inputValue === "") {
              swal.showInputError('S\'il vous plait, nommez cet Email.');
              return false;
            } else {
              setMemoriseEmailName(inputValue);

              swal("Super!, l\'Email " + inputValue + " a bien été sauvegardé", "success");
              setTimeout(function () {
                swal("L'email est sur le point d'être sauvegardé");
                $('#export-form [name="type"]').val('save');
                $('#export-form').append('<input type="hidden" name="emailName" value="' + inputValue + '" />');
                $('#export-form').submit();
              }, 1300)
            }
          });
        } else {
          swal({
            title: "Sauvegarder",
            text: "Entrez un titre pour l\'Email",
            type: "input",
            showCancelButton: true,
            closeOnConfirm: false,
            animation: "slide-from-top",
            inputPlaceholder: "agencdesurf-campagne",
            showLoaderOnConfirm: true
          }, function (inputValue) {
            if (inputValue === false) return false;

            if (inputValue === "") {
              swal.showInputError('S\'il vous plait, nommez cet Email.');
              return false;
            } else {
              setMemoriseEmailName(inputValue);

              swal("Super!, l\'Email " + inputValue + " a bien été sauvegardé", "success");
              setTimeout(function () {
                swal("L'email est sur le point d'être sauvegardé");
                $('#export-form [name="type"]').val('save');
                $('#export-form').append('<input type="hidden" name="emailName" value="' + inputValue + '" />');
                $('#export-form').submit();
              }, 1300)
            }
          });
        }

      };

      function _comment() {
        $('.module-container').before('<!-- START -->');
        $('.module-container').after('<!-- END -->');
      }

      function _screenShot() {
        
        if ($('[data-type="editor"]').html().length > 18) {
          swal('Cette fonctionnalité sera disponible bientôt');
          html2canvas((document.querySelector("#toSreenShot")).then(function(canvas) {
             //document.body.appendChild(canvas) 
              var image = canvas.toDataURL("image/jpg");
              window.open(image);
            }));
        } else {
          swal('Il n\'y a aucun contenu à exporter');
        }

      }

      function setMemoriseEmailName(name) {
        window.localStorage.setItem('lastEmailLoad', name)
      }

      function getMemoriseEmailName() {
        return window.localStorage.getItem('lastEmailLoad') !== null ? window.localStorage.getItem('lastEmailLoad') : false;
      }


      function _emailToBig() {
        var isValid = false;
        var sizeTemplateHTML = $('#templateHTML').val().length
        if (sizeTemplateHTML < 2200000) {
          isValid = true;
        } else {
          setTimeout(function () { swal("L'email est trop volumineux pour être exploité"); }, 1300)
        }
        return isValid;
      }

      emitter.on('init', function () {
        $('[data-action="send-test-email"]').on('click', function (event) {
          _emailToBig() ? dialogSendTestEmail() : null;
        });
        $('[data-action="load-test-email"]').on('click', function (event) {
          _emailToBig() ? dialogLoadTestEmail() : null;
        });
        $('[data-action="export-html"]').on('click', function (event) {
          _emailToBig() ? dialogExportHTML() : null;
        });
        $('[data-action="export-zip"]').on('click', function (event) {
          _emailToBig() ? dialogExportZip() : null;
        });
        $('[data-action="export-save"]').on('click', function (event) {
          dialogExportSave();
        });

        $('[data-action="export-preview"]').on('click', function (event) {
          _screenShot();
        });


        $('[data-action="sport2000"]').on('click', function (event) {
          window.localStorage.setItem("targetItem", "sport2000")
          emailBuilder.switchTheme("default")
          emailBuilder.init();
        });
        $('[data-action="degrifsport"]').on('click', function (event) {
          window.localStorage.setItem("targetItem", "degrifsport")
          emailBuilder.switchTheme("degrifsport")
          emailBuilder.init();
          removeClassActive()
        });
        $('[data-action="mondovelo"]').on('click', function (event) {
          window.localStorage.setItem("targetItem", "mondovelo")
          emailBuilder.switchTheme('mondovelo')
          emailBuilder.init();
          removeClassActive()
        });
        $('[data-action="espacemontagne"]').on('click', function (event) {
          window.localStorage.setItem("targetItem", "espacemontagne")
          emailBuilder.switchTheme('espacemontagne')
          emailBuilder.init();
          removeClassActive()
        });
        $('[data-action="weareselect"]').on('click', function (event) {
          window.localStorage.setItem("targetItem", "weareselect")
          emailBuilder.switchTheme('weareselect')
          emailBuilder.init();
          removeClassActive()
        });
        $('[data-action="sneakersspecialist"]').on('click', function (event) {
          window.localStorage.setItem("targetItem", "sneakersspecialist")
          emailBuilder.switchTheme('sneakersspecialist')
          emailBuilder.init();
          removeClassActive()
        });

        var removeClassActive = () => {
          $('[data-type="nav"] [data-target="modules"]').removeClass('active');
        }
      });

      /***/
}),

/***/ 40:
/***/ (function (module, exports, __webpack_require__) {

      module.exports = __webpack_require__(12);


      /***/
})

  /******/
});