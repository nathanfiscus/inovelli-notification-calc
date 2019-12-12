//ref: https://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript

export function fallbackCopyTextToClipboard(text, callback) {
  var textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed"; //avoid scrolling to bottom
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    var successful = document.execCommand("copy");
    callback(successful);
  } catch (err) {
    callback(false);
  }

  document.body.removeChild(textArea);
}

export default function copyTextToClipboard(text, callback = () => {}) {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text, callback);
    return;
  }
  navigator.clipboard.writeText(text).then(
    function() {
      callback(true);
    },
    function(err) {
      callback(false);
    }
  );
}
