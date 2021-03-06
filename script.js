const $ = (el) => document.querySelector(el);

$('button.btn').addEventListener('click', async (e) => {
  try {
    const input = $('input[type="file"]');
    const data = await readFile(input);
    $('pre.data').innerText = data.result;
    getFileInfo(data);
  } catch (err) {
    $('div.info').innerText = err;
  }
});

const readFile = (fileInput) => {
  return new Promise((resolve, reject) => {
    const fr = new FileReader();  
    fr.onload = () => resolve({
      result: fr.result,
      fileInput
    });
    fr.onerror = reject;
    const file = fileInput.files.item(0);
    fr.readAsText(file);
  });
}

const getFileInfo = (data) => {
  const { 
    lastModified, 
    lastModifiedDate, 
    name, 
    size, 
    type,
    webkitRelativePath
  } = data.fileInput.files.item(0);
  const kb = (size / 1000).toFixed(2)
  $('div.info').innerHTML = `
    <ul>
      <li><u>Name</u>: ${name}</li>
      <li><u>Type</u>: ${type}</li>
      <li><u>Size:</u> ${kb}kb</li>
      <li><u>Modified</u>: ${lastModifiedDate}</li>
    </ul>
  `;
}