import * as clipboard from "clipboard-polyfill/dist/clipboard-polyfill.promise";

export function fallbackCopyTextToClipboard(text, callback) {
  var textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed"; //avoid scrolling to bottom
  textArea.contentEditable = true;
  textArea.readOnly = false;
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    var successful = document.execCommand("copy");
    callback(successful, { message: "unable to execute copy command" });
  } catch (err) {
    callback(false, err);
  }

  document.body.removeChild(textArea);
}

export default function copyTextToClipboard(text, callback = () => {}) {
  if (!navigator.clipboard) {
    clipboard.writeText(text).then(
      function() {
        callback(true);
      },
      function(err) {
        callback(false, err);
      }
    );
    return;
  }
  navigator.clipboard.writeText(text).then(
    function() {
      callback(true);
    },
    function(err) {
      callback(false, err);
    }
  );
}
