document.getElementById('popupSelect').addEventListener('change', function() {
    let selectedValue = this.value;
    console.log('popupSelect' + selectedValue);
    
    chrome.runtime.sendMessage({action: "updateSelect", value: selectedValue});
  });